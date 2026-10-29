type AuthSession = { user: Record<string, unknown> } | null;
type AuthStateChangeCallback = (event: string, session: AuthSession) => void;

interface SupabasePlaceholderClient {
  auth: {
    getSession: () => Promise<{ data: { session: AuthSession } }>;
    onAuthStateChange: (callback: AuthStateChangeCallback) => {
      data: { subscription: { unsubscribe: () => void } };
    };
    signUp: (credentials: unknown) => Promise<{ data: null; error: Error | null }>;
    signInWithPassword: (credentials: unknown) => Promise<{ data: null; error: Error | null }>;
    signOut: () => Promise<{ error: Error | null }>;
    getUser: () => Promise<{ data: { user: Record<string, unknown> | null }; error: Error | null }>;
  };
  from: (table: string) => {
    select: (columns: string) => {
      eq: (column: string, value: unknown) => {
        single: () => Promise<{ data: null; error: Error | null }>;
      };
    };
  };
}

export function createClient(...args: unknown[]): SupabasePlaceholderClient {
  // eslint-disable-next-line no-console
  console.warn('Placeholder: createClient is not implemented yet.', args);

  return {
    auth: {
      getSession: async () => ({ data: { session: null } }),
      onAuthStateChange: (_callback) => ({
        data: { subscription: { unsubscribe: () => {} } },
      }),
      signUp: async () => ({ data: null, error: null }),
      signInWithPassword: async () => ({ data: null, error: null }),
      signOut: async () => ({ error: null }),
      getUser: async () => ({ data: { user: null }, error: null }),
    },
    from: () => ({
      select: () => ({
        eq: () => ({
          single: async () => ({ data: null, error: null }),
        }),
      }),
    }),
  };
}
