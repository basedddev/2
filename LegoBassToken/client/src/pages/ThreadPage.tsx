import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Link, useParams, useLocation } from "wouter";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Heart, Share, Flag, Send } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const ThreadPage = () => {
  const { id } = useParams();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [replyContent, setReplyContent] = useState("");
  
  // Fetch thread details
  const { data: thread, isLoading: threadLoading, error: threadError } = useQuery({
    queryKey: [`/api/threads/${id}`],
  });

  // Fetch thread replies
  const { data: replies = [], isLoading: repliesLoading } = useQuery({
    queryKey: [`/api/threads/${id}/replies`],
  });

  // Create reply mutation
  const createReplyMutation = useMutation({
    mutationFn: (content: string) => {
      return apiRequest("POST", `/api/threads/${id}/replies`, { content });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/threads/${id}/replies`] });
      setReplyContent("");
      toast({
        title: "Reply posted",
        description: "Your reply has been added to the thread.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to post reply: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  // Like thread mutation
  const likeThreadMutation = useMutation({
    mutationFn: () => {
      return apiRequest("POST", `/api/threads/${id}/like`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/threads/${id}`] });
      toast({
        title: "Thread liked",
        description: "You've successfully liked this thread.",
      });
    },
  });

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleSubmitReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (replyContent.trim()) {
      createReplyMutation.mutate(replyContent);
    }
  };

  const handleLikeThread = () => {
    likeThreadMutation.mutate();
  };

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (threadLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (threadError || !thread) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-bold mb-4">Thread not found</h2>
            <p className="text-gray-600">The thread you're looking for doesn't exist or has been removed.</p>
            <Button className="mt-4" onClick={() => navigate("/community")}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Community
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button 
        variant="ghost" 
        className="mb-4" 
        onClick={() => navigate("/community")}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Discussions
      </Button>

      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={thread.author.avatar} />
                <AvatarFallback>{thread.author.username.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-semibold">{thread.author.username}</div>
                <div className="text-xs text-gray-500">{formatDate(thread.createdAt)}</div>
              </div>
            </div>
            <div>
              <span className={`text-xs px-2 py-1 rounded ${
                thread.category === "trading" ? "bg-secondary text-white" :
                thread.category === "announcement" ? "bg-accent text-white" :
                "bg-gray-200 text-gray-700"
              }`}>
                {thread.category.charAt(0).toUpperCase() + thread.category.slice(1)}
              </span>
            </div>
          </div>
          <CardTitle className="text-2xl mt-2">{thread.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none mb-6">
            <p>{thread.content}</p>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex items-center gap-1 text-gray-600 hover:text-primary"
                onClick={handleLikeThread}
              >
                <Heart className={`h-5 w-5 ${thread.hasLiked ? 'fill-red-500 text-red-500' : ''}`} />
                <span>{thread.likeCount}</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-600">
                <Share className="h-5 w-5" />
                <span>Share</span>
              </Button>
            </div>
            <Button variant="ghost" size="sm" className="text-gray-600">
              <Flag className="h-5 w-5 mr-1" />
              <span>Report</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      <h3 className="text-xl font-bold mb-4">
        Replies {replies.length > 0 && `(${replies.length})`}
      </h3>

      {repliesLoading ? (
        <div className="flex justify-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : replies.length > 0 ? (
        <div className="space-y-4 mb-6">
          {replies.map((reply: any) => (
            <Card key={reply.id}>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={reply.author.avatar} />
                    <AvatarFallback>{reply.author.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div className="font-semibold">{reply.author.username}</div>
                      <div className="text-xs text-gray-500">{formatDate(reply.createdAt)}</div>
                    </div>
                    <p className="mt-2 text-gray-700">{reply.content}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="h-8 px-2 text-gray-600">
                        <Heart className="h-4 w-4 mr-1" />
                        <span>{reply.likeCount}</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 px-2 text-gray-600">
                        <Flag className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="mb-6">
          <CardContent className="p-6 text-center text-gray-500">
            No replies yet. Be the first to reply!
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4">Post a Reply</h3>
          <form onSubmit={handleSubmitReply}>
            <Textarea
              placeholder="What are your thoughts?"
              className="min-h-[120px] mb-4"
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
            />
            <div className="flex justify-end">
              <Button 
                type="submit" 
                className="bg-primary hover:bg-primary/90"
                disabled={createReplyMutation.isPending || !replyContent.trim()}
              >
                {createReplyMutation.isPending ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                ) : (
                  <Send className="h-4 w-4 mr-2" />
                )}
                Post Reply
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ThreadPage;
