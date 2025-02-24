/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_INSPECTION_SERVICE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
