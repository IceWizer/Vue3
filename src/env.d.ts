/// <référence types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_BASE_URL: string
    readonly VITE_API_URL: string
    // plus de variables env...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}