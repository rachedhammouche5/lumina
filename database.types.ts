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
      Content: {
        Row: {
          cntnt_id: string
          cntnt_title: string
          cntnt_type: Database["public"]["Enums"]["cntnt_type"]
          cntnt_value: string | null
          tpc_id: string | null
        }
        Insert: {
          cntnt_id?: string
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
          skill_id: string
          student_id: string
        }
        Insert: {
          progress: number
          skill_id: string
          student_id: string
        }
        Update: {
          progress?: number
          skill_id?: string
          student_id?: string
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
            foreignKeyName: "enroll_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "Student"
            referencedColumns: ["std_id"]
          },
        ]
      }
      q_response: {
        Row: {
          isCorrect: boolean
          quizId: string | null
          response: string
          rspns_id: string
        }
        Insert: {
          isCorrect: boolean
          quizId?: string | null
          response: string
          rspns_id?: string
        }
        Update: {
          isCorrect?: boolean
          quizId?: string | null
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
          tpc_id: string | null
        }
        Insert: {
          difficulty: Database["public"]["Enums"]["difficulty"]
          qst_id?: string
          question: string
          tpc_id?: string | null
        }
        Update: {
          difficulty?: Database["public"]["Enums"]["difficulty"]
          qst_id?: string
          question?: string
          tpc_id?: string | null
        }
        Relationships: [
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
          id: string
          parent_id: string | null
          rating: number
          skill_id: string
          studentId: string
          time: string
        }
        Insert: {
          comment: string
          id?: string
          parent_id?: string | null
          rating: number
          skill_id: string
          studentId: string
          time?: string
        }
        Update: {
          comment?: string
          id?: string
          parent_id?: string | null
          rating?: number
          skill_id?: string
          studentId?: string
          time?: string
        }
        Relationships: [
          {
            foreignKeyName: "review_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "review"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "review_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "Skill"
            referencedColumns: ["skl_id"]
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
      review_likes: {
        Row: {
          created_at: string | null
          id: string
          review_id: string | null
          student_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          review_id?: string | null
          student_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          review_id?: string | null
          student_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "review_likes_review_id_fkey"
            columns: ["review_id"]
            isOneToOne: false
            referencedRelation: "review"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "review_likes_student_id_fkey"
            columns: ["student_id"]
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
          skl_picture: string | null
          skl_title: string
          teacher_id: string | null
        }
        Insert: {
          skl_dscrptn: string
          skl_duration: number
          skl_id?: string
          skl_picture?: string | null
          skl_title: string
          teacher_id?: string | null
        }
        Update: {
          skl_dscrptn?: string
          skl_duration?: number
          skl_id?: string
          skl_picture?: string | null
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
          std_id?: string
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
          tchr_id?: string
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
          tpc_id?: string
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
      get_avg_rating_by_teacher: {
        Args: { teacher_id_param: string }
        Returns: number
      }
      get_count_streak_by_teacher: {
        Args: { teacher_id_param: string }
        Returns: number
      }
      get_student_count_by_teacher: {
        Args: { teacher_id_param: string }
        Returns: number
      }
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
