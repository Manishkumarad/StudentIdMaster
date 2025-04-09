import express, { type Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertStudentCardSchema } from "@shared/schema";
import { z } from "zod";
import multer from "multer";
import path from "path";
import fs from "fs";

// Configure multer for file uploads
const uploadDir = path.join(process.cwd(), "uploads");
// Create uploads directory if it doesn't exist
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage_config = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage_config,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve static uploads
  app.use('/uploads', express.static(uploadDir));

  // Student Card API Routes
  
  // Get all student cards
  app.get('/api/student-cards', async (req: Request, res: Response) => {
    try {
      const cards = await storage.getStudentCards();
      res.json(cards);
    } catch (error) {
      console.error('Error fetching student cards:', error);
      res.status(500).json({ error: 'Failed to fetch student cards' });
    }
  });

  // Get student card by roll number
  app.get('/api/student-cards/:rollNumber', async (req: Request, res: Response) => {
    try {
      const { rollNumber } = req.params;
      const card = await storage.getStudentCardByRollNumber(rollNumber);
      
      if (!card) {
        return res.status(404).json({ error: 'Student card not found' });
      }
      
      res.json(card);
    } catch (error) {
      console.error('Error fetching student card:', error);
      res.status(500).json({ error: 'Failed to fetch student card' });
    }
  });

  // Create or update student card with photo upload
  app.post('/api/student-cards', upload.single('photo'), async (req: Request, res: Response) => {
    try {
      const file = req.file;
      if (!file) {
        return res.status(400).json({ error: 'Photo is required' });
      }

      // Validate other form data
      const cardData = {
        ...req.body,
        allergies: req.body.allergies ? JSON.parse(req.body.allergies) : [],
        photoUrl: `/uploads/${file.filename}`
      };
      
      // Validate with zod
      const validationResult = insertStudentCardSchema.safeParse(cardData);
      
      if (!validationResult.success) {
        return res.status(400).json({ 
          error: 'Invalid card data', 
          details: validationResult.error.format() 
        });
      }
      
      // Create/update the student card
      const savedCard = await storage.createStudentCard(validationResult.data);
      
      res.status(201).json(savedCard);
    } catch (error) {
      console.error('Error creating student card:', error);
      res.status(500).json({ error: 'Failed to create student card' });
    }
  });

  // Delete student card
  app.delete('/api/student-cards/:rollNumber', async (req: Request, res: Response) => {
    try {
      const { rollNumber } = req.params;
      const success = await storage.deleteStudentCard(rollNumber);
      
      if (!success) {
        return res.status(404).json({ error: 'Student card not found' });
      }
      
      res.status(200).json({ message: 'Student card deleted successfully' });
    } catch (error) {
      console.error('Error deleting student card:', error);
      res.status(500).json({ error: 'Failed to delete student card' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
