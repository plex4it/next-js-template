import 'dotenv/config';
import { defineConfig } from 'prisma/config';

const databaseUrl = `postgresql://${process.env['PG_USERNAME']}:${process.env['PG_PASSWORD']}@${process.env['PG_HOST']}:${process.env['PG_PORT']}/${process.env['PG_DATABASE']}`;

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: databaseUrl,
  },
});
