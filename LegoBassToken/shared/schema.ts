import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User model
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  avatar: text("avatar").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  avatar: true,
});

// Thread model
export const threads = pgTable("threads", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  category: text("category").notNull(),
  authorId: integer("author_id").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  likeCount: integer("like_count").notNull().default(0),
  replyCount: integer("reply_count").notNull().default(0),
});

export const insertThreadSchema = createInsertSchema(threads).pick({
  title: true,
  content: true,
  category: true,
  authorId: true,
});

// Reply model
export const replies = pgTable("replies", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  threadId: integer("thread_id").notNull(),
  authorId: integer("author_id").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  likeCount: integer("like_count").notNull().default(0),
});

export const insertReplySchema = createInsertSchema(replies).pick({
  content: true,
  threadId: true,
  authorId: true,
});

// Like model
export const likes = pgTable("likes", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  threadId: integer("thread_id"),
  replyId: integer("reply_id"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertLikeSchema = createInsertSchema(likes).pick({
  userId: true,
  threadId: true,
  replyId: true,
});

// Export types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Thread = typeof threads.$inferSelect;
export type InsertThread = z.infer<typeof insertThreadSchema>;

export type Reply = typeof replies.$inferSelect;
export type InsertReply = z.infer<typeof insertReplySchema>;

export type Like = typeof likes.$inferSelect;
export type InsertLike = z.infer<typeof insertLikeSchema>;
