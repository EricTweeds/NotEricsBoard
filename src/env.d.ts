interface ImportMetaEnv {
  readonly REACT_APP_PASS: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
