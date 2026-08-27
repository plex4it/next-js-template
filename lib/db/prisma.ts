import { PrismaPg } from '@prisma/adapter-pg';
import { env } from '@/env';
import { PrismaClient } from '@/lib/generated/prisma/client';
import { Pool } from 'pg';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  const pool = new Pool({
    connectionString: `postgresql://${env.PG_USERNAME}:${env.PG_PASSWORD}@${env.PG_HOST}:${env.PG_PORT}/${env.PG_DATABASE}`,
  });
  const adapter = new PrismaPg(pool, {
    schema: 'auth',
  });
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
