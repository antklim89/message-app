export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      favorites: {
        Row: {
          authorId: string
          messageId: string
        }
        Insert: {
          authorId: string
          messageId: string
        }
        Update: {
          authorId?: string
          messageId?: string
        }
        Relationships: [
          {
            foreignKeyName: "favorites_authorId_fkey"
            columns: ["authorId"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "favorites_messageId_fkey"
            columns: ["messageId"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "favorites_messageId_fkey"
            columns: ["messageId"]
            isOneToOne: false
            referencedRelation: "messages_view"
            referencedColumns: ["id"]
          },
        ]
      }
      followers: {
        Row: {
          authorId: string
          followerId: string
        }
        Insert: {
          authorId: string
          followerId: string
        }
        Update: {
          authorId?: string
          followerId?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscribe_authorId_fkey"
            columns: ["authorId"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscribe_subscribeId_fkey"
            columns: ["followerId"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      hashtags: {
        Row: {
          date: string
          hashtag: string
          id: number
        }
        Insert: {
          date?: string
          hashtag: string
          id?: number
        }
        Update: {
          date?: string
          hashtag?: string
          id?: number
        }
        Relationships: []
      }
      likes: {
        Row: {
          authorId: string
          messageId: string
        }
        Insert: {
          authorId: string
          messageId: string
        }
        Update: {
          authorId?: string
          messageId?: string
        }
        Relationships: [
          {
            foreignKeyName: "likes_authorId_fkey"
            columns: ["authorId"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "likes_messageId_fkey"
            columns: ["messageId"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "likes_messageId_fkey"
            columns: ["messageId"]
            isOneToOne: false
            referencedRelation: "messages_view"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          answerId: string | null
          authorId: string
          body: Json
          created: string
          embeddedItems: string[] | null
          embeddedType: string | null
          id: string
          updated: string
          message_has_liked: boolean | null
          message_in_favorite: boolean | null
          message_likes_count: number | null
        }
        Insert: {
          answerId?: string | null
          authorId?: string
          body: Json
          created?: string
          embeddedItems?: string[] | null
          embeddedType?: string | null
          id?: string
          updated?: string
        }
        Update: {
          answerId?: string | null
          authorId?: string
          body?: Json
          created?: string
          embeddedItems?: string[] | null
          embeddedType?: string | null
          id?: string
          updated?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_answerId_fkey"
            columns: ["answerId"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_answerId_fkey"
            columns: ["answerId"]
            isOneToOne: false
            referencedRelation: "messages_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Messages_authorId_fkey"
            columns: ["authorId"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar: string | null
          bio: string
          created: string
          displayname: string
          id: string
          username: string
          favorites_count: number | null
          followers_count: number | null
          followings_count: number | null
          is_follower: boolean | null
          is_following: boolean | null
          messages_count: number | null
        }
        Insert: {
          avatar?: string | null
          bio?: string
          created?: string
          displayname?: string
          id: string
          username?: string
        }
        Update: {
          avatar?: string | null
          bio?: string
          created?: string
          displayname?: string
          id?: string
          username?: string
        }
        Relationships: []
      }
      reports: {
        Row: {
          body: string
          created: string
          id: number
          messageId: string | null
        }
        Insert: {
          body?: string
          created?: string
          id?: number
          messageId?: string | null
        }
        Update: {
          body?: string
          created?: string
          id?: number
          messageId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reports_messageId_fkey"
            columns: ["messageId"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reports_messageId_fkey"
            columns: ["messageId"]
            isOneToOne: false
            referencedRelation: "messages_view"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      hashtags_month_top_view: {
        Row: {
          count: number | null
          hashtag: string | null
        }
        Relationships: []
      }
      hashtags_week_top_view: {
        Row: {
          count: number | null
          hashtag: string | null
        }
        Relationships: []
      }
      messages_view: {
        Row: {
          answerId: string | null
          answersCount: number | null
          authorId: string | null
          avatar: string | null
          body: Json | null
          created: string | null
          embeddedItems: string[] | null
          embeddedType: string | null
          hasLiked: boolean | null
          id: string | null
          isFavorite: boolean | null
          likesCount: number | null
          updated: string | null
          username: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_answerId_fkey"
            columns: ["answerId"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_answerId_fkey"
            columns: ["answerId"]
            isOneToOne: false
            referencedRelation: "messages_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Messages_authorId_fkey"
            columns: ["authorId"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      calculate_lexical_text_length: {
        Args: { lexical_node: Json }
        Returns: number
      }
      extract_and_insert_hashtags: {
        Args: { lexical_node: Json }
        Returns: undefined
      }
      favorites_count: {
        Args: { "": Database["public"]["Tables"]["profiles"]["Row"] }
        Returns: {
          error: true
        } & "the function public.favorites_count with parameter or with a single unnamed json/jsonb parameter, but no matches were found in the schema cache"
      }
      followers_count: {
        Args: { "": Database["public"]["Tables"]["profiles"]["Row"] }
        Returns: {
          error: true
        } & "the function public.followers_count with parameter or with a single unnamed json/jsonb parameter, but no matches were found in the schema cache"
      }
      followings_count: {
        Args: { "": Database["public"]["Tables"]["profiles"]["Row"] }
        Returns: {
          error: true
        } & "the function public.followings_count with parameter or with a single unnamed json/jsonb parameter, but no matches were found in the schema cache"
      }
      handle_new_message: { Args: { lexical_node: Json }; Returns: undefined }
      is_follower: {
        Args: { "": Database["public"]["Tables"]["profiles"]["Row"] }
        Returns: {
          error: true
        } & "the function public.is_follower with parameter or with a single unnamed json/jsonb parameter, but no matches were found in the schema cache"
      }
      is_following: {
        Args: { "": Database["public"]["Tables"]["profiles"]["Row"] }
        Returns: {
          error: true
        } & "the function public.is_following with parameter or with a single unnamed json/jsonb parameter, but no matches were found in the schema cache"
      }
      message_has_liked: {
        Args: { "": Database["public"]["Tables"]["messages"]["Row"] }
        Returns: {
          error: true
        } & "the function public.message_has_liked with parameter or with a single unnamed json/jsonb parameter, but no matches were found in the schema cache"
      }
      message_in_favorite: {
        Args: { "": Database["public"]["Tables"]["messages"]["Row"] }
        Returns: {
          error: true
        } & "the function public.message_in_favorite with parameter or with a single unnamed json/jsonb parameter, but no matches were found in the schema cache"
      }
      message_likes_count: {
        Args: { "": Database["public"]["Tables"]["messages"]["Row"] }
        Returns: {
          error: true
        } & "the function public.message_likes_count with parameter or with a single unnamed json/jsonb parameter, but no matches were found in the schema cache"
      }
      messages_count: {
        Args: { "": Database["public"]["Tables"]["profiles"]["Row"] }
        Returns: {
          error: true
        } & "the function public.messages_count with parameter or with a single unnamed json/jsonb parameter, but no matches were found in the schema cache"
      }
      validate_message_body: { Args: { message_body: Json }; Returns: boolean }
    }
    Enums: {
      [_ in never]: never
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
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const

