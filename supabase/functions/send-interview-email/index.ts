import { serve } from "https://deno.land/std@0.190.0/http/server.ts"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

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
    const { to, applicantName, interviewDate, meetingLink }: EmailRequest = await req.json()

    const formattedDate = new Date(interviewDate).toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })

    const emailHtml = `
      <h2>Interview Scheduled - Eventful Bites Connect</h2>
      <p>Dear ${applicantName},</p>
      <p>Your interview has been scheduled for ${formattedDate}.</p>
      <p>Please join the interview using this link: <a href="${meetingLink}">${meetingLink}</a></p>
      <p>Best regards,<br>Eventful Bites Connect Team</p>
    `

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Eventful Bites Connect <onboarding@resend.dev>',
        to: [to],
        subject: 'Interview Scheduled - Eventful Bites Connect',
        html: emailHtml,
      }),
    })

    if (!res.ok) {
      const error = await res.text()
      console.error('Resend API error:', error)
      throw new Error('Failed to send email')
    }

    const data = await res.json()
    console.log('Email sent successfully:', data)

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    console.error('Error in send-interview-email function:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to send interview email' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
}

serve(handler)