import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import CommunityPage from "@/pages/CommunityPage";
import ThreadPage from "@/pages/ThreadPage";
import { ThemeProvider } from "@/components/ui/theme-provider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/community" component={CommunityPage} />
      <Route path="/thread/:id" component={ThreadPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <div className="lego-bg min-h-screen flex flex-col">
          <Header />
          <main className="content-wrapper flex-grow">
            <Router />
          </main>
          <Footer />
        </div>
      </ThemeProvider>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
