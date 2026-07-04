import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";
import AlgoVizHome from "./pages/AlgoVizHome";
import ArraysModule from "./pages/ArraysModule";
import StringsModule from "./pages/StringsModule";
import StackModule from "./pages/StackModule";
import QueueModule from "./pages/QueueModule";
import LinkedListModule from "./pages/LinkedListModule";
import DoublyLinkedListModule from "./pages/DoublyLinkedListModule";
import TreesModule from "./pages/TreesModule";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<AlgoVizHome />} />
          <Route path="/algoviz" element={<AlgoVizHome />} />
          <Route path="/algoviz/arrays" element={<ArraysModule />} />
          <Route path="/algoviz/strings" element={<StringsModule />} />
          <Route path="/algoviz/stack" element={<StackModule />} />
          <Route path="/algoviz/queue" element={<QueueModule />} />
          <Route path="/algoviz/linked-list" element={<LinkedListModule />} />
          <Route path="/algoviz/doubly-linked-list" element={<DoublyLinkedListModule />} />
          <Route path="/algoviz/trees" element={<TreesModule />} />
          {/* All custom routes must be defined above the catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  );
}

export default App;
