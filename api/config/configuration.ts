import { DEV } from 'libs/constants';

export const cfg = {
  mode: process.env.NODE_ENV || DEV,
  host: process.env.API_HOST || '0.0.0.0',
  port: Number(process.env.API_PORT || 3000),
  postgres: {
    host: process.env.POSTGRES_HOST || 'localhost',
    port: Number(process.env.POSTGRES_PORT) || 5432,
    user: process.env.POSTGRES_USER || 'user',
    password: process.env.POSTGRES_PASSWORD || 'password',
    db: process.env.POSTGRES_DB || 'main',
    synchronize: process.env.NODE_ENV === DEV,
    logging: process.env.NODE_ENV === DEV,
  },
};
