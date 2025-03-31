import { 
  type User, type InsertUser, 
  type Thread, type InsertThread,
  type Reply, type InsertReply,
  type Like, type InsertLike
} from "@shared/schema";
import { getRandomAvatar, getRandomUsername } from "../client/src/lib/utils";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Thread operations
  getAllThreads(): Promise<any[]>;
  getThreadById(id: number): Promise<any | undefined>;
  createThread(thread: InsertThread): Promise<any>;
  incrementThreadReplies(threadId: number): Promise<void>;
  
  // Reply operations
  getRepliesByThreadId(threadId: number): Promise<any[]>;
  getReplyById(id: number): Promise<any | undefined>;
  createReply(reply: InsertReply): Promise<any>;
  
  // Like operations
  likeThread(threadId: number, userId: number): Promise<any>;
  likeReply(replyId: number, userId: number): Promise<any>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private threads: Map<number, Thread>;
  private replies: Map<number, Reply>;
  private likes: Map<number, Like>;
  private userId: number;
  private threadId: number;
  private replyId: number;
  private likeId: number;

  constructor() {
    this.users = new Map();
    this.threads = new Map();
    this.replies = new Map();
    this.likes = new Map();
    this.userId = 1;
    this.threadId = 1;
    this.replyId = 1;
    this.likeId = 1;

    // Initialize with a default user
    this.createUser({
      username: "billydev",
      password: "password123",
      avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=50&h=50&auto=format&fit=crop"
    });

    // Add some sample threads
    this.seedSampleData();
  }

  private seedSampleData() {
    // Create sample threads
    const sampleThreads = [
      {
        title: "When will Billy Bass hit $0.01?",
        content: "I've been watching the chart and I think we could see $0.01 by end of year based on current momentum...",
        category: "trading",
        authorId: 1
      },
      {
        title: "Official Billy Bass SOL Bridge Announcement",
        content: "We're excited to announce our new SOL bridge launching next week! This will allow cross-chain trading and unlock new possibilities for Billy Bass token.",
        category: "announcement",
        authorId: 1
      },
      {
        title: "Technical Analysis: BASS forming bullish pattern",
        content: "Looking at the 4h chart, we're seeing a clear cup and handle pattern forming which typically signals a strong continuation of the uptrend. The volume is also increasing which confirms the pattern.",
        category: "technical",
        authorId: 1
      }
    ];

    sampleThreads.forEach(thread => {
      this.createThread(thread as InsertThread);
    });

    // Create sample replies
    const sampleReplies = [
      {
        content: "I think $0.01 is possible but we need more marketing efforts and exchange listings.",
        threadId: 1,
        authorId: 1
      },
      {
        content: "This is amazing news! When will the bridge be operational exactly?",
        threadId: 2,
        authorId: 1
      },
      {
        content: "Great technical analysis! I've noticed the same pattern forming. Looking forward to the breakout.",
        threadId: 3,
        authorId: 1
      }
    ];

    sampleReplies.forEach(reply => {
      this.createReply(reply as InsertReply);
    });
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Thread operations
  async getAllThreads(): Promise<any[]> {
    const threads = Array.from(this.threads.values());
    
    return threads.map(thread => {
      const author = this.users.get(thread.authorId);
      const likes = Array.from(this.likes.values()).filter(like => like.threadId === thread.id);
      
      return {
        ...thread,
        author: {
          id: author?.id,
          username: author?.username,
          avatar: author?.avatar
        },
        likes,
        likeCount: likes.length
      };
    }).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async getThreadById(id: number): Promise<any | undefined> {
    const thread = this.threads.get(id);
    if (!thread) return undefined;
    
    const author = this.users.get(thread.authorId);
    const likes = Array.from(this.likes.values()).filter(like => like.threadId === thread.id);
    
    return {
      ...thread,
      author: {
        id: author?.id,
        username: author?.username,
        avatar: author?.avatar
      },
      likes,
      hasLiked: likes.some(like => like.userId === 1), // Assuming user 1 is the current user
      likeCount: likes.length
    };
  }

  async createThread(insertThread: InsertThread): Promise<any> {
    const id = this.threadId++;
    const now = new Date();
    
    let authorId = insertThread.authorId;
    let author: User;
    
    // If authorId is not provided, create a random user
    if (!authorId) {
      author = await this.createUser({
        username: getRandomUsername(),
        password: "password123",
        avatar: getRandomAvatar()
      });
      authorId = author.id;
    } else {
      author = (await this.getUser(authorId))!;
    }

    const thread: Thread = {
      ...insertThread,
      id,
      authorId,
      createdAt: now,
      likeCount: 0,
      replyCount: 0
    };
    
    this.threads.set(id, thread);
    
    return {
      ...thread,
      author: {
        id: author.id,
        username: author.username,
        avatar: author.avatar
      },
      likes: [],
      likeCount: 0
    };
  }

  async incrementThreadReplies(threadId: number): Promise<void> {
    const thread = this.threads.get(threadId);
    if (thread) {
      thread.replyCount += 1;
      this.threads.set(threadId, thread);
    }
  }

  // Reply operations
  async getRepliesByThreadId(threadId: number): Promise<any[]> {
    const replies = Array.from(this.replies.values())
      .filter(reply => reply.threadId === threadId);
    
    return replies.map(reply => {
      const author = this.users.get(reply.authorId);
      const likes = Array.from(this.likes.values()).filter(like => like.replyId === reply.id);
      
      return {
        ...reply,
        author: {
          id: author?.id,
          username: author?.username,
          avatar: author?.avatar
        },
        likes,
        likeCount: likes.length
      };
    }).sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  }

  async getReplyById(id: number): Promise<any | undefined> {
    const reply = this.replies.get(id);
    if (!reply) return undefined;
    
    const author = this.users.get(reply.authorId);
    const likes = Array.from(this.likes.values()).filter(like => like.replyId === reply.id);
    
    return {
      ...reply,
      author: {
        id: author?.id,
        username: author?.username,
        avatar: author?.avatar
      },
      likes,
      likeCount: likes.length
    };
  }

  async createReply(insertReply: InsertReply): Promise<any> {
    const id = this.replyId++;
    const now = new Date();
    
    let authorId = insertReply.authorId;
    let author: User;
    
    // If authorId is not provided, create a random user
    if (!authorId) {
      author = await this.createUser({
        username: getRandomUsername(),
        password: "password123",
        avatar: getRandomAvatar()
      });
      authorId = author.id;
    } else {
      author = (await this.getUser(authorId))!;
    }

    const reply: Reply = {
      ...insertReply,
      id,
      authorId,
      createdAt: now,
      likeCount: 0
    };
    
    this.replies.set(id, reply);
    
    return {
      ...reply,
      author: {
        id: author.id,
        username: author.username,
        avatar: author.avatar
      },
      likes: [],
      likeCount: 0
    };
  }

  // Like operations
  async likeThread(threadId: number, userId: number): Promise<any> {
    // Check if user already liked the thread
    const existingLike = Array.from(this.likes.values()).find(
      like => like.threadId === threadId && like.userId === userId
    );

    if (existingLike) {
      // If already liked, remove the like (unlike)
      this.likes.delete(existingLike.id);
      
      // Update thread like count
      const thread = this.threads.get(threadId);
      if (thread) {
        thread.likeCount = Math.max(0, thread.likeCount - 1);
        this.threads.set(threadId, thread);
      }
      
      return { message: "Like removed" };
    } else {
      // Create a new like
      const id = this.likeId++;
      const now = new Date();
      
      const like: Like = {
        id,
        userId,
        threadId,
        replyId: null,
        createdAt: now
      };
      
      this.likes.set(id, like);
      
      // Update thread like count
      const thread = this.threads.get(threadId);
      if (thread) {
        thread.likeCount += 1;
        this.threads.set(threadId, thread);
      }
      
      return like;
    }
  }

  async likeReply(replyId: number, userId: number): Promise<any> {
    // Check if user already liked the reply
    const existingLike = Array.from(this.likes.values()).find(
      like => like.replyId === replyId && like.userId === userId
    );

    if (existingLike) {
      // If already liked, remove the like (unlike)
      this.likes.delete(existingLike.id);
      
      // Update reply like count
      const reply = this.replies.get(replyId);
      if (reply) {
        reply.likeCount = Math.max(0, reply.likeCount - 1);
        this.replies.set(replyId, reply);
      }
      
      return { message: "Like removed" };
    } else {
      // Create a new like
      const id = this.likeId++;
      const now = new Date();
      
      const like: Like = {
        id,
        userId,
        threadId: null,
        replyId,
        createdAt: now
      };
      
      this.likes.set(id, like);
      
      // Update reply like count
      const reply = this.replies.get(replyId);
      if (reply) {
        reply.likeCount += 1;
        this.replies.set(replyId, reply);
      }
      
      return like;
    }
  }
}

export const storage = new MemStorage();
