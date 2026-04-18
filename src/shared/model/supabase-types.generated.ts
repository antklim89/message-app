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
            foreignKeyName: "favorites_authorId_fkey"
            columns: ["authorId"]
            isOneToOne: false
            referencedRelation: "profiles_view"
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
            foreignKeyName: "subscribe_authorId_fkey"
            columns: ["authorId"]
            isOneToOne: false
            referencedRelation: "profiles_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscribe_subscribeId_fkey"
            columns: ["followerId"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscribe_subscribeId_fkey"
            columns: ["followerId"]
            isOneToOne: false
            referencedRelation: "profiles_view"
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
            foreignKeyName: "likes_authorId_fkey"
            columns: ["authorId"]
            isOneToOne: false
            referencedRelation: "profiles_view"
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
          body_tsvector: unknown
          created: string
          embeddedItems: string[] | null
          embeddedType: string | null
          id: string
          updated: string
        }
        Insert: {
          answerId?: string | null
          authorId?: string
          body: Json
          body_tsvector: unknown
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
          body_tsvector?: unknown
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
          {
            foreignKeyName: "Messages_authorId_fkey"
            columns: ["authorId"]
            isOneToOne: false
            referencedRelation: "profiles_view"
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
          category: string
          created: string
          id: number
          messageId: string | null
        }
        Insert: {
          body?: string
          category: string
          created?: string
          id?: number
          messageId?: string | null
        }
        Update: {
          body?: string
          category?: string
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
      followers_view: {
        Row: {
          authorId: string | null
          avatar: string | null
          followerId: string | null
          isFollowing: boolean | null
          username: string | null
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
            foreignKeyName: "subscribe_authorId_fkey"
            columns: ["authorId"]
            isOneToOne: false
            referencedRelation: "profiles_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscribe_subscribeId_fkey"
            columns: ["followerId"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscribe_subscribeId_fkey"
            columns: ["followerId"]
            isOneToOne: false
            referencedRelation: "profiles_view"
            referencedColumns: ["id"]
          },
        ]
      }
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
          body_tsvector: unknown
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
          {
            foreignKeyName: "Messages_authorId_fkey"
            columns: ["authorId"]
            isOneToOne: false
            referencedRelation: "profiles_view"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles_view: {
        Row: {
          avatar: string | null
          bio: string | null
          created: string | null
          displayname: string | null
          favoritesCount: number | null
          followersCount: number | null
          followingsCount: number | null
          id: string | null
          isFollower: boolean | null
          isFollowing: boolean | null
          messagesCount: number | null
          username: string | null
        }
        Insert: {
          avatar?: string | null
          bio?: string | null
          created?: string | null
          displayname?: string | null
          favoritesCount?: never
          followersCount?: never
          followingsCount?: never
          id?: string | null
          isFollower?: never
          isFollowing?: never
          messagesCount?: never
          username?: string | null
        }
        Update: {
          avatar?: string | null
          bio?: string | null
          created?: string | null
          displayname?: string | null
          favoritesCount?: never
          followersCount?: never
          followingsCount?: never
          id?: string | null
          isFollower?: never
          isFollowing?: never
          messagesCount?: never
          username?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
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

