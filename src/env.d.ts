interface ImportMetaEnv {
  readonly VITE_AO20_RANKING_ENDPOINT: string | undefined;
  readonly VITE_SUPABASE_KEY: string | undefined;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
