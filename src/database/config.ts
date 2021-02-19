export const dbConfig = {
  type: 'postgres',
  host: 'localhost',
  port: 5302,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: ['src/*/*/*.entity{.ts,.js}'],
  synchronize: true,
};
