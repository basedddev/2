import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(100, "Title must be less than 100 characters"),
  category: z.enum(["general", "trading", "technical", "price", "memes"]),
  content: z.string().min(10, "Content must be at least 10 characters").max(5000, "Content must be less than 5000 characters"),
});

interface ForumFormProps {
  onCancel: () => void;
}

type FormValues = z.infer<typeof formSchema>;

const ForumForm = ({ onCancel }: ForumFormProps) => {
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      category: "general",
      content: "",
    },
  });

  const createThreadMutation = useMutation({
    mutationFn: (data: FormValues) => {
      return apiRequest("POST", "/api/threads", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/threads"] });
      toast({
        title: "Thread created!",
        description: "Your thread has been posted successfully.",
      });
      form.reset();
      onCancel();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to create thread: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FormValues) => {
    createThreadMutation.mutate(data);
  };

  return (
    <div className="bg-white p-6 rounded-xl border-2 border-lego-yellow mb-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lego-blue font-bold text-base">Thread Title</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter a title for your thread" 
                    className="border-2 border-lego-blue/50 rounded-xl focus-visible:ring-lego-yellow"
                    {...field} 
                  />
                </FormControl>
                <FormMessage className="text-lego-red" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lego-blue font-bold text-base">Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="border-2 border-lego-blue/50 rounded-xl focus:ring-lego-yellow">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="border-2 border-lego-yellow rounded-xl">
                    <SelectItem value="general" className="focus:bg-lego-blue/10">General</SelectItem>
                    <SelectItem value="trading" className="focus:bg-lego-blue/10">Trading</SelectItem>
                    <SelectItem value="technical" className="focus:bg-lego-blue/10">Technical</SelectItem>
                    <SelectItem value="price" className="focus:bg-lego-blue/10">Price Discussion</SelectItem>
                    <SelectItem value="memes" className="focus:bg-lego-blue/10">Memes</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="text-lego-red" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lego-blue font-bold text-base">Content</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write your thoughts here..."
                    className="min-h-[150px] border-2 border-lego-blue/50 rounded-xl focus-visible:ring-lego-yellow"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-lego-red" />
              </FormItem>
            )}
          />

          <div className="flex justify-end space-x-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={createThreadMutation.isPending}
              className="border-2 border-lego-blue text-lego-blue hover:bg-lego-blue/10 font-bold rounded-full"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="bg-lego-blue hover:bg-lego-blue/90 text-white font-bold rounded-full shadow-md transform hover:scale-105 transition-transform duration-300"
              disabled={createThreadMutation.isPending}
            >
              {createThreadMutation.isPending ? 
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Posting...
                </span> : 
                "Post Thread"
              }
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ForumForm;
