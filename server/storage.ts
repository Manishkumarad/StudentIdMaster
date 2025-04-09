import { users, studentCards, type User, type InsertUser, type StudentCard, type InsertStudentCard } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Student Card methods
  getStudentCards(): Promise<StudentCard[]>;
  getStudentCardByRollNumber(rollNumber: string): Promise<StudentCard | undefined>;
  createStudentCard(card: InsertStudentCard): Promise<StudentCard>;
  updateStudentCard(rollNumber: string, card: Partial<InsertStudentCard>): Promise<StudentCard | undefined>;
  deleteStudentCard(rollNumber: string): Promise<boolean>;
}

export class DbStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  // Student Card methods
  async getStudentCards(): Promise<StudentCard[]> {
    return await db.select().from(studentCards).orderBy(studentCards.timestamp);
  }

  async getStudentCardByRollNumber(rollNumber: string): Promise<StudentCard | undefined> {
    const result = await db.select().from(studentCards).where(eq(studentCards.rollNumber, rollNumber));
    return result[0];
  }

  async createStudentCard(card: InsertStudentCard): Promise<StudentCard> {
    // Check if card with this roll number already exists
    const existing = await this.getStudentCardByRollNumber(card.rollNumber);
    
    if (existing) {
      // Update existing card
      return (await this.updateStudentCard(card.rollNumber, card))!;
    } else {
      // Create new card
      // Use an array of values to fix the TypeScript error
      const result = await db.insert(studentCards).values([{
        name: card.name,
        rollNumber: card.rollNumber,
        classDiv: card.classDiv,
        allergies: card.allergies as any, // Cast to any to avoid TypeScript issues
        photoUrl: card.photoUrl,
        rackNumber: card.rackNumber,
        busRoute: card.busRoute,
        ...(card.timestamp ? { timestamp: card.timestamp } : {})
      }]).returning();
      return result[0];
    }
  }

  async updateStudentCard(rollNumber: string, card: Partial<InsertStudentCard>): Promise<StudentCard | undefined> {
    // Manually specify the fields to update to avoid TypeScript errors
    const updateData: Record<string, any> = {};
    
    if (card.name) updateData.name = card.name;
    if (card.classDiv) updateData.classDiv = card.classDiv;
    if (card.rollNumber) updateData.rollNumber = card.rollNumber;
    if (card.photoUrl) updateData.photoUrl = card.photoUrl;
    if (card.rackNumber) updateData.rackNumber = card.rackNumber;
    if (card.busRoute) updateData.busRoute = card.busRoute;
    if (card.timestamp) updateData.timestamp = card.timestamp;
    
    // Handle allergies separately to avoid TypeScript issues
    if (card.allergies) {
      updateData.allergies = card.allergies;
    }
    
    const result = await db
      .update(studentCards)
      .set(updateData)
      .where(eq(studentCards.rollNumber, rollNumber))
      .returning();
    
    return result[0];
  }

  async deleteStudentCard(rollNumber: string): Promise<boolean> {
    const result = await db
      .delete(studentCards)
      .where(eq(studentCards.rollNumber, rollNumber))
      .returning();
    
    return result.length > 0;
  }
}

export const storage = new DbStorage();
