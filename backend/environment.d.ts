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
      TDX_USERNAME: string;
      TDX_PASSWORD: string;
      SERVER_PORT: number;
      SEED_USERNAME: string;
      SEED_PASSWORD: string;
      SEED_FULLNAME: string;
      SEED_MODE_ON: boolean;
    }
  }
}

export { };
