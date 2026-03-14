export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      AuditLog: {
        Row: {
          action: string | null
          actorId: string | null
          actorRole: string | null
          createdAt: string
          details: Json | null
          id: string
          targetId: string | null
          targetRole: string | null
        }
        Insert: {
          action?: string | null
          actorId?: string | null
          actorRole?: string | null
          createdAt?: string
          details?: Json | null
          id?: string
          targetId?: string | null
          targetRole?: string | null
        }
        Update: {
          action?: string | null
          actorId?: string | null
          actorRole?: string | null
          createdAt?: string
          details?: Json | null
          id?: string
          targetId?: string | null
          targetRole?: string | null
        }
        Relationships: []
      }
      Content: {
        Row: {
          cntnt_id: string
          cntnt_title: string
          cntnt_type: Database["public"]["Enums"]["cntnt_type"]
          cntnt_value: string | null
          tpc_id: string | null
        }
        Insert: {
          cntnt_id: string
          cntnt_title: string
          cntnt_type: Database["public"]["Enums"]["cntnt_type"]
          cntnt_value?: string | null
          tpc_id?: string | null
        }
        Update: {
          cntnt_id?: string
          cntnt_title?: string
          cntnt_type?: Database["public"]["Enums"]["cntnt_type"]
          cntnt_value?: string | null
          tpc_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Content_tpc_id_fkey"
            columns: ["tpc_id"]
            isOneToOne: false
            referencedRelation: "Topic"
            referencedColumns: ["tpc_id"]
          },
        ]
      }
      enroll: {
        Row: {
          progress: number
          skill_id: string | null
          studentId: string
        }
        Insert: {
          progress: number
          skill_id?: string | null
          studentId: string
        }
        Update: {
          progress?: number
          skill_id?: string | null
          studentId?: string
        }
        Relationships: [
          {
            foreignKeyName: "enroll_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "Skill"
            referencedColumns: ["skl_id"]
          },
          {
            foreignKeyName: "enroll_studentId_fkey"
            columns: ["studentId"]
            isOneToOne: false
            referencedRelation: "Student"
            referencedColumns: ["std_id"]
          },
        ]
      }
      q_response: {
        Row: {
          isCorrect: boolean
          quizId: string
          response: string
          rspns_id: string
        }
        Insert: {
          isCorrect: boolean
          quizId: string
          response: string
          rspns_id: string
        }
        Update: {
          isCorrect?: boolean
          quizId?: string
          response?: string
          rspns_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "q_response_quizId_fkey"
            columns: ["quizId"]
            isOneToOne: false
            referencedRelation: "quiz"
            referencedColumns: ["qst_id"]
          },
        ]
      }
      quiz: {
        Row: {
          difficulty: Database["public"]["Enums"]["difficulty"]
          qst_id: string
          question: string
          tpc_id: string
        }
        Insert: {
          difficulty: Database["public"]["Enums"]["difficulty"]
          qst_id: string
          question: string
          tpc_id: string
        }
        Update: {
          difficulty?: Database["public"]["Enums"]["difficulty"]
          qst_id?: string
          question?: string
          tpc_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "quiz_courseId_fkey"
            columns: ["tpc_id"]
            isOneToOne: false
            referencedRelation: "Content"
            referencedColumns: ["cntnt_id"]
          },
          {
            foreignKeyName: "quiz_tpc_id_fkey"
            columns: ["tpc_id"]
            isOneToOne: false
            referencedRelation: "Topic"
            referencedColumns: ["tpc_id"]
          },
        ]
      }
      review: {
        Row: {
          comment: string
          content_id: string
          rating: number
          studentId: string
        }
        Insert: {
          comment: string
          content_id: string
          rating: number
          studentId: string
        }
        Update: {
          comment?: string
          content_id?: string
          rating?: number
          studentId?: string
        }
        Relationships: [
          {
            foreignKeyName: "review_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "Content"
            referencedColumns: ["cntnt_id"]
          },
          {
            foreignKeyName: "review_studentId_fkey"
            columns: ["studentId"]
            isOneToOne: false
            referencedRelation: "Student"
            referencedColumns: ["std_id"]
          },
        ]
      }
      score: {
        Row: {
          score: number
          studentId: string
          time_taken: number
          tpc_id: string
        }
        Insert: {
          score: number
          studentId: string
          time_taken: number
          tpc_id: string
        }
        Update: {
          score?: number
          studentId?: string
          time_taken?: number
          tpc_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "score_studentId_fkey"
            columns: ["studentId"]
            isOneToOne: false
            referencedRelation: "Student"
            referencedColumns: ["std_id"]
          },
          {
            foreignKeyName: "score_tpc_id_fkey"
            columns: ["tpc_id"]
            isOneToOne: false
            referencedRelation: "Topic"
            referencedColumns: ["tpc_id"]
          },
        ]
      }
      Skill: {
        Row: {
          skl_dscrptn: string
          skl_duration: number
          skl_id: string
          skl_title: string
          teacher_id: string | null
        }
        Insert: {
          skl_dscrptn: string
          skl_duration: number
          skl_id?: string
          skl_title: string
          teacher_id?: string | null
        }
        Update: {
          skl_dscrptn?: string
          skl_duration?: number
          skl_id?: string
          skl_title?: string
          teacher_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Skill_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "Teacher"
            referencedColumns: ["tchr_id"]
          },
        ]
      }
      Student: {
        Row: {
          std_email: string
          std_fullname: string
          std_id: string
          std_last_activeDate: string
          std_level: Database["public"]["Enums"]["level"]
          std_pfp: string | null
          std_streak: number
          user_id: string | null
        }
        Insert: {
          std_email: string
          std_fullname: string
          std_id: string
          std_last_activeDate?: string
          std_level?: Database["public"]["Enums"]["level"]
          std_pfp?: string | null
          std_streak?: number
          user_id?: string | null
        }
        Update: {
          std_email?: string
          std_fullname?: string
          std_id?: string
          std_last_activeDate?: string
          std_level?: Database["public"]["Enums"]["level"]
          std_pfp?: string | null
          std_streak?: number
          user_id?: string | null
        }
        Relationships: []
      }
      Teacher: {
        Row: {
          tchr_email: string
          tchr_fullname: string
          tchr_id: string
          tchr_pfp: string | null
          user_id: string | null
        }
        Insert: {
          tchr_email: string
          tchr_fullname: string
          tchr_id: string
          tchr_pfp?: string | null
          user_id?: string | null
        }
        Update: {
          tchr_email?: string
          tchr_fullname?: string
          tchr_id?: string
          tchr_pfp?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      teacher_requests: {
        Row: {
          admin_note: string | null
          created_at: string | null
          cv_url: string | null
          id: string
          motivation: string | null
          status: string
          user_id: string
        }
        Insert: {
          admin_note?: string | null
          created_at?: string | null
          cv_url?: string | null
          id?: string
          motivation?: string | null
          status?: string
          user_id: string
        }
        Update: {
          admin_note?: string | null
          created_at?: string | null
          cv_url?: string | null
          id?: string
          motivation?: string | null
          status?: string
          user_id?: string
        }
        Relationships: []
      }
      Topic: {
        Row: {
          parent_id: string | null
          skill_id: string | null
          tpc_description: string | null
          tpc_id: string
          tpc_title: string
        }
        Insert: {
          parent_id?: string | null
          skill_id?: string | null
          tpc_description?: string | null
          tpc_id: string
          tpc_title: string
        }
        Update: {
          parent_id?: string | null
          skill_id?: string | null
          tpc_description?: string | null
          tpc_id?: string
          tpc_title?: string
        }
        Relationships: [
          {
            foreignKeyName: "Topic_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "Topic"
            referencedColumns: ["tpc_id"]
          },
          {
            foreignKeyName: "Topic_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "Skill"
            referencedColumns: ["skl_id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      cntnt_type: "pdf" | "video" | "mindmap" | "docs" | "audio"
      difficulty: "easy" | "medium" | "hard" | "pro"
      level: "beginner" | "intermediate" | "advanced" | "master"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      cntnt_type: ["pdf", "video", "mindmap", "docs", "audio"],
      difficulty: ["easy", "medium", "hard", "pro"],
      level: ["beginner", "intermediate", "advanced", "master"],
    },
  },
} as const
// add at the bottom of database.types.ts
export type Skill = Tables<"Skill">
export type Topic = Tables<"Topic">
export type Content = Tables<"Content">
export type Student = Tables<"Student">
export type Teacher = Tables<"Teacher">
export type TeacherRequest = Tables<"teacher_requests">
export type Enroll = Tables<"enroll">
export type Quiz = Tables<"quiz">
export type QResponse = Tables<"q_response">
export type Review = Tables<"review">
export type Score = Tables<"score">

// enum types
export type ContentType = Enums<"cntnt_type">
export type Difficulty = Enums<"difficulty">
export type Level = Enums<"level">