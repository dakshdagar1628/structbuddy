import LearningLayout from "@/components/algoviz/LearningLayout";
import VisualConceptCanvas from "@/components/algoviz/VisualConceptCanvas";
import IntegratedCodeLab, { type CodeStep } from "@/components/algoviz/IntegratedCodeLab";
import QueueCodeVisualizer from "@/components/algoviz/QueueCodeVisualizer";
import QueueVisualizer from "@/components/algoviz/QueueVisualizer";
import AiTutorButton from "@/components/algoviz/AiTutorButton";
import { Printer, Phone } from "lucide-react";

const queueConceptNodes = [
  { id: "1", type: "start" as const, label: "Start" },
  {
    id: "2",
    type: "process" as const,
    label: "Create Queue",
    description: "Initialize empty queue",
  },
  {
    id: "3",
    type: "decision" as const,
    label: "Is Queue Full?",
    description: "Check capacity",
  },
  {
    id: "4",
    type: "process" as const,
    label: "Enqueue",
    description: "Add to rear",
  },
  {
    id: "5",
    type: "decision" as const,
    label: "Is Queue Empty?",
    description: "Check if empty",
  },
  {
    id: "6",
    type: "process" as const,
    label: "Dequeue",
    description: "Remove from front",
  },
  { id: "7", type: "end" as const, label: "Stop" },
];

const queueTheoryContent = {
  theory: "The first person to arrive is the first person to be served.",
  metaphorTitle: "Think of a Line at a Ticket Counter",
  metaphor: "It is fair: the person who waited the longest gets served next. No cutting in line!",
  examples: [
    {
      icon: Printer,
      title: "Printer",
      description: "If you send 3 documents to the printer, it prints them in the exact order they arrived."
    },
    {
      icon: Phone,
      title: "Call Centers",
      description: "\"Your call is important to us...\" You are waiting in a queue for the next available agent."
    }
  ]
};

const pythonCode: CodeStep[] = [
  { 
    code: "class Queue:", 
    explanation: "Define a Queue class to manage our data.", 
    variables: {},
    visualState: { items: [], activeIndices: [], action: 'none' }
  },
  { 
    code: "    def __init__(self, limit=8):", 
    explanation: "Initialize with a limit of 8 items.", 
    variables: { "limit": "8" },
    visualState: { items: [], activeIndices: [], action: 'none' }
  },
  { 
    code: "        self.items = []", 
    explanation: "Create an empty list for the queue.", 
    variables: { "self.items": "[]", "self.limit": "8" },
    visualState: { items: [], activeIndices: [], action: 'none' }
  },
  { 
    code: "        self.limit = limit", 
    explanation: "Store the limit to check for overflow.", 
    variables: { "self.items": "[]", "self.limit": "8" },
    visualState: { items: [], activeIndices: [], action: 'none' }
  },
  { 
    code: "    def enqueue(self, item):", 
    explanation: "Define enqueue to add 'C' to the rear. Queue currently has ['A', 'B'].", 
    variables: { "self.items": "['A', 'B']", "item": "'C'" },
    visualState: { items: ['A', 'B'], activeIndices: [], action: 'none' }
  },
  { 
    code: "        if len(self.items) >= self.limit:", 
    explanation: "Check: Is the queue full? 2 items, limit is 8, so 2 < 8 = False.", 
    variables: { "self.items": "['A', 'B']", "self.limit": "8", "len(self.items)": "2", "item": "'C'" },
    visualState: { items: ['A', 'B'], activeIndices: [], action: 'none' }
  },
  { 
    code: "            print('Queue Overflow')", 
    explanation: "Skipped because queue is not full.", 
    variables: { "condition": "False (2 < 8)" },
    visualState: { items: ['A', 'B'], activeIndices: [], action: 'none' }
  },
  { 
    code: "            return", 
    explanation: "Skipped because overflow check was False.", 
    variables: {},
    visualState: { items: ['A', 'B'], activeIndices: [], action: 'none' }
  },
  { 
    code: "        self.items.append(item)", 
    explanation: "Add 'C' to the end (rear) of the queue. Queue becomes ['A', 'B', 'C'].", 
    variables: { "self.items": "['A', 'B', 'C']", "item": "'C'" },
    visualState: { items: ['A', 'B', 'C'], activeIndices: [2], action: 'add' }
  },
  { 
    code: "    def dequeue(self):", 
    explanation: "Define dequeue to remove from the front. Queue has ['A', 'B', 'C'].", 
    variables: { "self.items": "['A', 'B', 'C']" },
    visualState: { items: ['A', 'B', 'C'], activeIndices: [], action: 'none' }
  },
  { 
    code: "        if not self.items:", 
    explanation: "Check: Is the queue empty? We have 3 items, so this is False.", 
    variables: { "self.items": "['A', 'B', 'C']", "is_empty": "False" },
    visualState: { items: ['A', 'B', 'C'], activeIndices: [], action: 'none' }
  },
  { 
    code: "            print('Queue Underflow')", 
    explanation: "Skipped because queue has items.", 
    variables: { "condition": "False (not empty)" },
    visualState: { items: ['A', 'B', 'C'], activeIndices: [], action: 'none' }
  },
  { 
    code: "            return", 
    explanation: "Skipped because underflow check was False.", 
    variables: {},
    visualState: { items: ['A', 'B', 'C'], activeIndices: [], action: 'none' }
  },
  { 
    code: "        return self.items.pop(0)", 
    explanation: "Remove and return the FIRST item (Index 0). 'A' is removed, queue becomes ['B', 'C'].", 
    variables: { "self.items": "['B', 'C']", "returned": "'A'" },
    visualState: { items: ['A', 'B', 'C'], activeIndices: [0], action: 'remove' }
  },
  { 
    code: "    def peek(self):", 
    explanation: "Define 'peek' to look at the front item without removing it. Queue has ['B', 'C'].", 
    variables: { "self.items": "['B', 'C']" },
    visualState: { items: ['B', 'C'], activeIndices: [], action: 'none' }
  },
  { 
    code: "        if not self.items:", 
    explanation: "Check: Is the queue empty? We have 2 items, so this is False.", 
    variables: { "self.items": "['B', 'C']", "is_empty": "False" },
    visualState: { items: ['B', 'C'], activeIndices: [], action: 'none' }
  },
  { 
    code: "            return None", 
    explanation: "Skipped because queue has items. If empty, there would be nothing to see.", 
    variables: { "condition": "False (not empty)" },
    visualState: { items: ['B', 'C'], activeIndices: [], action: 'none' }
  },
  { 
    code: "        return self.items[0]", 
    explanation: "Return the item at Index 0 (Front) safely without removing it. Returns 'B'.", 
    variables: { "self.items": "['B', 'C']", "returned": "'B'" },
    visualState: { items: ['B', 'C'], activeIndices: [0], action: 'read' }
  },
  { 
    code: "    def is_empty(self):", 
    explanation: "Define a helper function to quickly check if the queue is empty.", 
    variables: { "self.items": "['B', 'C']" },
    visualState: { items: ['B', 'C'], activeIndices: [], action: 'none' }
  },
  { 
    code: "        return len(self.items) == 0", 
    explanation: "Return True if size is 0, otherwise False. Here: len(['B', 'C']) == 0 is False.", 
    variables: { "self.items": "['B', 'C']", "len(self.items)": "2", "returned": "False" },
    visualState: { items: ['B', 'C'], activeIndices: [], action: 'none' }
  },
];

const QueueModule = () => {
  return (
    <>
      <LearningLayout
        title="Queue"
        principle="FIFO - First In, First Out"
        visualTab={
          <VisualConceptCanvas
            conceptNodes={queueConceptNodes}
            dataStructureType="queue"
            theoryContent={queueTheoryContent}
          />
        }
        codeTab={
          <IntegratedCodeLab
            pythonCode={pythonCode}
            visualizer={(visualState) => <QueueCodeVisualizer visualState={visualState} />}
          />
        }
        gameTab={<QueueVisualizer />}
      />
      <AiTutorButton />
    </>
  );
};

export default QueueModule;
