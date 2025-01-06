import { serve } from "https://deno.land/std@0.190.0/http/server.ts"

const RESEND_API_KEY = Deno.env.get('RESEND_API')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface EmailRequest {
  to: string
  applicantName: string
  interviewDate: string
  meetingLink: string
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Check if RESEND_API_KEY is configured
    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured')
      throw new Error('Email service is not configured')
    }

    const { to, applicantName, interviewDate, meetingLink }: EmailRequest = await req.json()
    
    // Validate required fields
    if (!to || !applicantName || !interviewDate || !meetingLink) {
      console.error('Missing required fields:', { to, applicantName, interviewDate, meetingLink })
      throw new Error('Missing required fields for email')
    }

    console.log('Sending email with data:', { to, applicantName, interviewDate, meetingLink })

    const formattedDate = new Date(interviewDate).toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })

    const emailHtml = `
      <h2>Interview Scheduled - ServiceNova</h2>
      <p>Dear ${applicantName},</p>
      <p>Your interview has been scheduled for ${formattedDate}.</p>
      <p>Please join the interview using this link: <a href="${meetingLink}">${meetingLink}</a></p>
      <p>Best regards,<br>ServiceNova Team</p>
    `

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
      from: 'ServiceNova <info@servicenova.in>',
        to: [to],
        subject: 'Interview Scheduled - ServiceNova',
        html: emailHtml,
      }),
    })

    const resData = await res.text()
    console.log('Resend API response:', resData)

    if (!res.ok) {
      console.error('Resend API error:', resData)
      throw new Error(`Failed to send email: ${resData}`)
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error: any) {
    console.error('Error in send-interview-email function:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Failed to send interview email', 
        details: error.message 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
}

serve(handler)
