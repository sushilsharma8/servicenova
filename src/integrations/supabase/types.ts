export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      callback_requests: {
        Row: {
          callback_time: string | null
          created_at: string
          id: string
          notes: string | null
          phone_number: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          callback_time?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          phone_number: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          callback_time?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          phone_number?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      event_service_requests: {
        Row: {
          created_at: string
          event_id: string
          hours_needed: number
          id: string
          provider_id: string | null
          rate_agreed: number | null
          service_type: Database["public"]["Enums"]["service_type"]
          status: Database["public"]["Enums"]["event_status"] | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          event_id: string
          hours_needed: number
          id?: string
          provider_id?: string | null
          rate_agreed?: number | null
          service_type: Database["public"]["Enums"]["service_type"]
          status?: Database["public"]["Enums"]["event_status"] | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          event_id?: string
          hours_needed?: number
          id?: string
          provider_id?: string | null
          rate_agreed?: number | null
          service_type?: Database["public"]["Enums"]["service_type"]
          status?: Database["public"]["Enums"]["event_status"] | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_service_requests_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_service_requests_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "service_providers"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          budget_range: string | null
          client_id: string
          created_at: string
          event_date: string
          guest_count: number
          id: string
          location: string
          service_types: Database["public"]["Enums"]["service_type"][] | null
          special_requirements: string | null
          status: Database["public"]["Enums"]["event_status"] | null
          updated_at: string
        }
        Insert: {
          budget_range?: string | null
          client_id: string
          created_at?: string
          event_date: string
          guest_count: number
          id?: string
          location: string
          service_types?: Database["public"]["Enums"]["service_type"][] | null
          special_requirements?: string | null
          status?: Database["public"]["Enums"]["event_status"] | null
          updated_at?: string
        }
        Update: {
          budget_range?: string | null
          client_id?: string
          created_at?: string
          event_date?: string
          guest_count?: number
          id?: string
          location?: string
          service_types?: Database["public"]["Enums"]["service_type"][] | null
          special_requirements?: string | null
          status?: Database["public"]["Enums"]["event_status"] | null
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      provider_applications: {
        Row: {
          address: string
          admin_notes: string | null
          age: number
          certifications: string[] | null
          created_at: string
          email: string | null
          experience_proof_url: string | null
          full_name: string
          id: string
          identity_proof_url: string | null
          interview_link: string | null
          preferred_interview_date: string | null
          service_type: Database["public"]["Enums"]["service_type"]
          status:
            | Database["public"]["Enums"]["provider_application_status"]
            | null
          updated_at: string
          user_id: string
          years_experience: number
        }
        Insert: {
          address: string
          admin_notes?: string | null
          age: number
          certifications?: string[] | null
          created_at?: string
          email?: string | null
          experience_proof_url?: string | null
          full_name: string
          id?: string
          identity_proof_url?: string | null
          interview_link?: string | null
          preferred_interview_date?: string | null
          service_type: Database["public"]["Enums"]["service_type"]
          status?:
            | Database["public"]["Enums"]["provider_application_status"]
            | null
          updated_at?: string
          user_id: string
          years_experience: number
        }
        Update: {
          address?: string
          admin_notes?: string | null
          age?: number
          certifications?: string[] | null
          created_at?: string
          email?: string | null
          experience_proof_url?: string | null
          full_name?: string
          id?: string
          identity_proof_url?: string | null
          interview_link?: string | null
          preferred_interview_date?: string | null
          service_type?: Database["public"]["Enums"]["service_type"]
          status?:
            | Database["public"]["Enums"]["provider_application_status"]
            | null
          updated_at?: string
          user_id?: string
          years_experience?: number
        }
        Relationships: []
      }
      reviews: {
        Row: {
          client_id: string
          comment: string | null
          created_at: string
          event_id: string
          id: string
          provider_id: string
          rating: number
        }
        Insert: {
          client_id: string
          comment?: string | null
          created_at?: string
          event_id: string
          id?: string
          provider_id: string
          rating: number
        }
        Update: {
          client_id?: string
          comment?: string | null
          created_at?: string
          event_id?: string
          id?: string
          provider_id?: string
          rating?: number
        }
        Relationships: [
          {
            foreignKeyName: "reviews_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "service_providers"
            referencedColumns: ["id"]
          },
        ]
      }
      service_providers: {
        Row: {
          business_name: string | null
          certifications: string[] | null
          created_at: string
          description: string | null
          hourly_rate: number | null
          id: string
          rating: number | null
          service_type: Database["public"]["Enums"]["service_type"]
          status: Database["public"]["Enums"]["provider_status"] | null
          updated_at: string
          user_id: string
          years_experience: number | null
        }
        Insert: {
          business_name?: string | null
          certifications?: string[] | null
          created_at?: string
          description?: string | null
          hourly_rate?: number | null
          id?: string
          rating?: number | null
          service_type: Database["public"]["Enums"]["service_type"]
          status?: Database["public"]["Enums"]["provider_status"] | null
          updated_at?: string
          user_id: string
          years_experience?: number | null
        }
        Update: {
          business_name?: string | null
          certifications?: string[] | null
          created_at?: string
          description?: string | null
          hourly_rate?: number | null
          id?: string
          rating?: number | null
          service_type?: Database["public"]["Enums"]["service_type"]
          status?: Database["public"]["Enums"]["provider_status"] | null
          updated_at?: string
          user_id?: string
          years_experience?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      event_status: "pending" | "confirmed" | "completed" | "cancelled"
      provider_application_status:
        | "pending"
        | "interview_scheduled"
        | "approved"
        | "rejected"
      provider_status: "available" | "busy" | "inactive"
      service_type: "bartender" | "chef" | "server"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
