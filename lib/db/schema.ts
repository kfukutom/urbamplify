import type { InferSelectModel } from 'drizzle-orm';

import {
  pgTable,
  varchar,
  timestamp,
  uuid,
  primaryKey,
} from 'drizzle-orm/pg-core';

export const user = pgTable('User', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', {length: 64}).notNull(),
  password: varchar('password', {length: 64}).notNull(),
  lastLogin: timestamp('last_login'), 
  sessionToken: varchar('session_token', {length: 128}),
});

export type User = InferSelectModel<typeof user>;