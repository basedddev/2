import { Heart, MessageSquare, Clock, User } from "lucide-react";

type ThreadCategory = "general" | "trading" | "technical" | "price" | "memes" | "announcement";

interface ThreadAuthor {
  id: number;
  username: string;
  avatar: string;
}

interface Thread {
  id: number;
  title: string;
  content: string;
  category: ThreadCategory;
  author: ThreadAuthor;
  createdAt: string;
  replyCount: number;
  likeCount: number;
}

interface ForumThreadProps {
  thread: Thread;
}

const getCategoryStyles = (category: ThreadCategory) => {
  switch (category) {
    case "trading":
      return "bg-lego-green text-white";
    case "announcement":
      return "bg-lego-red text-white";
    case "technical":
      return "bg-lego-blue text-white";
    case "price":
      return "bg-lego-yellow text-lego-black";
    case "memes":
      return "bg-lego-purple text-white";
    default:
      return "bg-lego-blue text-white";
  }
};

const ForumThread = ({ thread }: ForumThreadProps) => {
  const timeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  return (
    <div className="forum-card bg-white rounded-xl p-5 transition-all duration-300 hover:cursor-pointer hover:shadow-lg border-2 border-lego-yellow/70 transform hover:scale-[1.01]">
      <div className="flex flex-col sm:flex-row sm:items-start">
        <div className="mb-3 sm:mb-0 sm:mr-4 flex-shrink-0">
          <img
            src={thread.author.avatar}
            alt={`${thread.author.username} avatar`}
            className="w-12 h-12 rounded-xl border-2 border-lego-blue shadow-md"
          />
        </div>
        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
            <h4 className="font-bold text-xl text-lego-blue">
              {thread.title}
            </h4>
            <span className={`text-xs font-bold px-3 py-1.5 rounded-full self-start ${getCategoryStyles(thread.category)}`}>
              {thread.category.charAt(0).toUpperCase() + thread.category.slice(1)}
            </span>
          </div>
          <p className="text-gray-700 mt-2">
            {thread.content.length > 100
              ? `${thread.content.substring(0, 100)}...`
              : thread.content}
          </p>
          <div className="flex flex-wrap items-center mt-4 text-sm text-gray-600 gap-y-2">
            <span className="flex items-center mr-4 bg-gray-100 px-2 py-1 rounded-full">
              <User className="h-4 w-4 mr-1 text-lego-blue" />
              <span className="font-medium">{thread.author.username}</span>
            </span>
            <span className="flex items-center mr-4 bg-gray-100 px-2 py-1 rounded-full">
              <Clock className="h-4 w-4 mr-1 text-lego-green" />
              {timeAgo(thread.createdAt)}
            </span>
            <span className="flex items-center mr-4 bg-gray-100 px-2 py-1 rounded-full">
              <MessageSquare className="h-4 w-4 mr-1 text-lego-blue" />
              {thread.replyCount} replies
            </span>
            <span className="flex items-center bg-gray-100 px-2 py-1 rounded-full">
              <Heart className="h-4 w-4 mr-1 text-lego-red" />
              {thread.likeCount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForumThread;
