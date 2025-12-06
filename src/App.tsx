import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";
import AlgoVizHome from "./pages/AlgoVizHome";
import StackModule from "./pages/StackModule";
import QueueModule from "./pages/QueueModule";
import LinkedListModule from "./pages/LinkedListModule";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<AlgoVizHome />} />
          <Route path="/algoviz" element={<AlgoVizHome />} />
          <Route path="/algoviz/stack" element={<StackModule />} />
          <Route path="/algoviz/queue" element={<QueueModule />} />
          <Route path="/algoviz/linked-list" element={<LinkedListModule />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
