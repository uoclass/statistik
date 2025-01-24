declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JWT_PRIV_KEY: string;

      DB_USER: string;
      DB_PASSWORD: string;
      DB_NAME: string;
      DB_ADDR: string;
      DB_SERVER_PORT: number;
      API_ENVIRONMENT_MODE: "SBTDWebApi" | "TDWebApi";
      TDX_ADMIN_BEID: string;
      TDX_ADMIN_WEBKEY: string;
      SERVER_PORT: number;
    }
  }
}

export {};
