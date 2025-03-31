import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertThreadSchema, insertReplySchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all threads
  app.get("/api/threads", async (req, res) => {
    try {
      const threads = await storage.getAllThreads();
      res.json(threads);
    } catch (error) {
      res.status(500).json({ message: "Error fetching threads" });
    }
  });

  // Get a specific thread by ID
  app.get("/api/threads/:id", async (req, res) => {
    try {
      const threadId = parseInt(req.params.id);
      const thread = await storage.getThreadById(threadId);
      
      if (!thread) {
        return res.status(404).json({ message: "Thread not found" });
      }
      
      res.json(thread);
    } catch (error) {
      res.status(500).json({ message: "Error fetching thread" });
    }
  });

  // Create a new thread
  app.post("/api/threads", async (req, res) => {
    try {
      const parsedData = insertThreadSchema
        .extend({
          category: z.enum(["general", "trading", "technical", "price", "memes", "announcement"]),
          authorId: z.number().optional(),
        })
        .parse({
          ...req.body,
          authorId: 1, // Default user ID for now
        });
      
      // Ensure authorId is defined for storage
      const data = {
        ...parsedData,
        authorId: parsedData.authorId || 1,
      };

      const newThread = await storage.createThread(data);
      res.status(201).json(newThread);
    } catch (error) {
      res.status(400).json({ message: "Invalid thread data" });
    }
  });

  // Get replies for a thread
  app.get("/api/threads/:id/replies", async (req, res) => {
    try {
      const threadId = parseInt(req.params.id);
      const replies = await storage.getRepliesByThreadId(threadId);
      res.json(replies);
    } catch (error) {
      res.status(500).json({ message: "Error fetching replies" });
    }
  });

  // Create a reply for a thread
  app.post("/api/threads/:id/replies", async (req, res) => {
    try {
      const threadId = parseInt(req.params.id);
      const thread = await storage.getThreadById(threadId);
      
      if (!thread) {
        return res.status(404).json({ message: "Thread not found" });
      }
      
      const parsedData = insertReplySchema
        .extend({
          content: z.string().min(1),
          authorId: z.number().optional(),
        })
        .parse({
          ...req.body,
          threadId,
          authorId: 1, // Default user ID for now
        });
      
      // Ensure authorId is defined for storage
      const data = {
        ...parsedData,
        authorId: parsedData.authorId || 1,
      };

      const newReply = await storage.createReply(data);
      
      // Update thread reply count
      await storage.incrementThreadReplies(threadId);
      
      res.status(201).json(newReply);
    } catch (error) {
      res.status(400).json({ message: "Invalid reply data" });
    }
  });

  // Like a thread
  app.post("/api/threads/:id/like", async (req, res) => {
    try {
      const threadId = parseInt(req.params.id);
      const thread = await storage.getThreadById(threadId);
      
      if (!thread) {
        return res.status(404).json({ message: "Thread not found" });
      }
      
      const userId = 1; // Default user ID for now
      
      const like = await storage.likeThread(threadId, userId);
      res.status(201).json(like);
    } catch (error) {
      res.status(500).json({ message: "Error liking thread" });
    }
  });

  // Like a reply
  app.post("/api/replies/:id/like", async (req, res) => {
    try {
      const replyId = parseInt(req.params.id);
      const reply = await storage.getReplyById(replyId);
      
      if (!reply) {
        return res.status(404).json({ message: "Reply not found" });
      }
      
      const userId = 1; // Default user ID for now
      
      const like = await storage.likeReply(replyId, userId);
      res.status(201).json(like);
    } catch (error) {
      res.status(500).json({ message: "Error liking reply" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
