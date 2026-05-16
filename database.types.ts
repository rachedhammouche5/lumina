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
      achievement: {
        Row: {
          criteria_type: string | null
          criteria_value: Json | null
          description: string
          global_count: number | null
          icon: string | null
          id: string
          is_hidden: boolean | null
          name: string
          rarity: string | null
        }
        Insert: {
          criteria_type?: string | null
          criteria_value?: Json | null
          description: string
          global_count?: number | null
          icon?: string | null
          id?: string
          is_hidden?: boolean | null
          name: string
          rarity?: string | null
        }
        Update: {
          criteria_type?: string | null
          criteria_value?: Json | null
          description?: string
          global_count?: number | null
          icon?: string | null
          id?: string
          is_hidden?: boolean | null
          name?: string
          rarity?: string | null
        }
        Relationships: []
      }
      Content: {
        Row: {
          cntnt_id: string
          cntnt_text: string | null
          cntnt_title: string
          cntnt_type: Database["public"]["Enums"]["cntnt_type"]
          cntnt_value: string | null
          processing_status: string | null
          tpc_id: string | null
        }
        Insert: {
          cntnt_id?: string
          cntnt_text?: string | null
          cntnt_title: string
          cntnt_type: Database["public"]["Enums"]["cntnt_type"]
          cntnt_value?: string | null
          processing_status?: string | null
          tpc_id?: string | null
        }
        Update: {
          cntnt_id?: string
          cntnt_text?: string | null
          cntnt_title?: string
          cntnt_type?: Database["public"]["Enums"]["cntnt_type"]
          cntnt_value?: string | null
          processing_status?: string | null
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
      content_chunks: {
        Row: {
          chunk_index: number
          chunk_text: string
          content_id: string
          embedding: string | null
          id: string
          level: string | null
          metadata: Json | null
          token_count: number | null
        }
        Insert: {
          chunk_index: number
          chunk_text: string
          content_id: string
          embedding?: string | null
          id?: string
          level?: string | null
          metadata?: Json | null
          token_count?: number | null
        }
        Update: {
          chunk_index?: number
          chunk_text?: string
          content_id?: string
          embedding?: string | null
          id?: string
          level?: string | null
          metadata?: Json | null
          token_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "content_chunks_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "Content"
            referencedColumns: ["cntnt_id"]
          },
        ]
      }
      enroll: {
        Row: {
          last_content_type: string | null
          last_topic_id: string | null
          last_visited_at: string | null
          progress: number
          skill_id: string
          student_id: string
        }
        Insert: {
          last_content_type?: string | null
          last_topic_id?: string | null
          last_visited_at?: string | null
          progress: number
          skill_id: string
          student_id: string
        }
        Update: {
          last_content_type?: string | null
          last_topic_id?: string | null
          last_visited_at?: string | null
          progress?: number
          skill_id?: string
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "enroll_last_topic_id_fkey"
            columns: ["last_topic_id"]
            isOneToOne: false
            referencedRelation: "Topic"
            referencedColumns: ["tpc_id"]
          },
          {
            foreignKeyName: "enroll_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "Skill"
            referencedColumns: ["skl_id"]
          },
          {
            foreignKeyName: "enroll_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skill_with_avg_rating"
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
            foreignKeyName: "review_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skill_with_avg_rating"
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
          rating: number
          skl_dscrptn: string
          skl_duration: number
          skl_id: string
          skl_picture: string | null
          skl_title: string
          teacher_id: string | null
        }
        Insert: {
          rating?: number
          skl_dscrptn: string
          skl_duration: number
          skl_id?: string
          skl_picture?: string | null
          skl_title: string
          teacher_id?: string | null
        }
        Update: {
          rating?: number
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
          email_notifications_enabled: boolean | null
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
          email_notifications_enabled?: boolean | null
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
          email_notifications_enabled?: boolean | null
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
      student_achievement: {
        Row: {
          achievement_id: string
          earned_at: string | null
          student_id: string
        }
        Insert: {
          achievement_id: string
          earned_at?: string | null
          student_id: string
        }
        Update: {
          achievement_id?: string
          earned_at?: string | null
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "student_achievement_achievement_id_fkey"
            columns: ["achievement_id"]
            isOneToOne: false
            referencedRelation: "achievement"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_achievement_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "Student"
            referencedColumns: ["std_id"]
          },
        ]
      }
      Teacher: {
        Row: {
          email_notifications_enabled: boolean | null
          tchr_email: string
          tchr_fullname: string
          tchr_id: string
          tchr_pfp: string | null
          user_id: string | null
        }
        Insert: {
          email_notifications_enabled?: boolean | null
          tchr_email: string
          tchr_fullname: string
          tchr_id?: string
          tchr_pfp?: string | null
          user_id?: string | null
        }
        Update: {
          email_notifications_enabled?: boolean | null
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
          certification_url: string | null
          created_at: string | null
          cv_url: string | null
          email: string | null
          full_name: string | null
          gov_id_url: string | null
          id: string
          motivation: string | null
          photo_url: string | null
          status: string
          user_id: string
        }
        Insert: {
          admin_note?: string | null
          certification_url?: string | null
          created_at?: string | null
          cv_url?: string | null
          email?: string | null
          full_name?: string | null
          gov_id_url?: string | null
          id?: string
          motivation?: string | null
          photo_url?: string | null
          status?: string
          user_id: string
        }
        Update: {
          admin_note?: string | null
          certification_url?: string | null
          created_at?: string | null
          cv_url?: string | null
          email?: string | null
          full_name?: string | null
          gov_id_url?: string | null
          id?: string
          motivation?: string | null
          photo_url?: string | null
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
          {
            foreignKeyName: "Topic_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skill_with_avg_rating"
            referencedColumns: ["skl_id"]
          },
        ]
      }
    }
    Views: {
      skill_with_avg_rating: {
        Row: {
          avg_rating: number | null
          rating: number | null
          skl_dscrptn: string | null
          skl_duration: number | null
          skl_id: string | null
          skl_picture: string | null
          skl_title: string | null
          teacher_id: string | null
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
    }
    Functions: {
      delete_teacher: { Args: { p_tchr_id: string }; Returns: undefined }
      finalize_teacher_request: {
        Args: { p_admin_note?: string; p_decision: string; p_user_id: string }
        Returns: undefined
      }
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
      handle_teacher_sync: {
        Args: {
          p_email: string
          p_fullname: string
          p_pfp?: string
          p_user_id: string
        }
        Returns: undefined
      }
      match_chunks: {
        Args: {
          filter_level?: string
          match_count?: number
          query_embedding: string
        }
        Returns: {
          chunk_index: number
          chunk_text: string
          content_id: string
          id: string
          level: string
          metadata: Json
          similarity: number
          token_count: number
        }[]
      }
      sync_teacher_data: {
        Args: {
          target_email: string
          target_fullname: string
          target_pfp: string
          target_user_id: string
        }
        Returns: undefined
      }
      sync_teacher_request_to_teacher: {
        Args: {
          email: string
          full_name: string
          photo_url: string
          teacher_user_id: string
        }
        Returns: undefined
      }
      upsert_teacher: {
        Args: {
          p_email: string
          p_fullname: string
          p_photo_url?: string
          p_tchr_id: string
          p_user_id: string
        }
        Returns: undefined
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
