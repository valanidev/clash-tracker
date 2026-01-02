import { pgEnum, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const userRoles = ['admin', 'user'] as const
export type UserRole = (typeof userRoles)[number]
export const userRoleEnum = pgEnum('user_roles', userRoles)

export const UserTable = pgTable('users', {
  id: uuid().primaryKey().defaultRandom(),
  username: text().notNull(),
  email: text().notNull().unique(),
  password: text().notNull(),
  salt: text(),
  role: userRoleEnum().notNull().default('user'),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp({ withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
})

export const SessionTable = pgTable('sessions', {
  id: text().primaryKey(),
  userId: uuid()
    .notNull()
    .references(() => UserTable.id, { onDelete: 'cascade' }),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  expiresAt: timestamp({ withTimezone: true }).notNull(),
})

export const VillageTable = pgTable('villages', {
  id: uuid().primaryKey().defaultRandom(),
  userId: uuid()
    .notNull()
    .references(() => UserTable.id, { onDelete: 'cascade' }),
  tag: text().notNull(),
})
