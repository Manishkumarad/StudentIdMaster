import { pgTable, text, serial, integer, boolean, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Student ID Card table
export const studentCards = pgTable("student_cards", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  rollNumber: text("roll_number").notNull().unique(),
  classDiv: text("class_div").notNull(),
  allergies: jsonb("allergies").$type<string[]>().default([]),
  photoUrl: text("photo_url").notNull(),
  rackNumber: text("rack_number").notNull(),
  busRoute: text("bus_route").notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

export const insertStudentCardSchema = createInsertSchema(studentCards).omit({
  id: true,
});

export type InsertStudentCard = z.infer<typeof insertStudentCardSchema>;
export type StudentCard = typeof studentCards.$inferSelect;
