import LearningLayout from "@/components/algoviz/LearningLayout";
import VisualConceptCanvas from "@/components/algoviz/VisualConceptCanvas";
import CodeLab from "@/components/algoviz/CodeLab";
import QueueVisualizer from "@/components/algoviz/QueueVisualizer";
import AiTutorButton from "@/components/algoviz/AiTutorButton";

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

const pythonCode = [
  {
    code: "class Queue:",
    explanation:
      "We define a Queue class to manage FIFO (First In, First Out) operations.",
  },
  {
    code: "    def __init__(self):",
    explanation:
      "Constructor initializes a new queue instance.",
  },
  {
    code: "        self.items = []",
    explanation:
      "We use a Python list to store queue elements. Empty at start.",
  },
  { code: "", explanation: "" },
  {
    code: "    def enqueue(self, item):",
    explanation:
      "Enqueue adds a new element to the rear (end) of the queue.",
  },
  {
    code: "        self.items.append(item)",
    explanation:
      "Append adds the item to the end of the list - our queue's rear.",
  },
  { code: "", explanation: "" },
  {
    code: "    def dequeue(self):",
    explanation:
      "Dequeue removes and returns the front element from the queue.",
  },
  {
    code: "        if not self.is_empty():",
    explanation: "Check if queue has elements before trying to remove.",
  },
  {
    code: "            return self.items.pop(0)",
    explanation:
      "pop(0) removes and returns the first item - our queue's front.",
  },
  {
    code: "        return None",
    explanation: "Return None if queue is empty.",
  },
  { code: "", explanation: "" },
  {
    code: "    def front(self):",
    explanation:
      "Front returns the first element without removing it.",
  },
  {
    code: "        if not self.is_empty():",
    explanation: "Must check if queue is not empty first.",
  },
  {
    code: "            return self.items[0]",
    explanation: "Index 0 gives us the first element - queue's front.",
  },
  {
    code: "        return None",
    explanation: "Return None if queue is empty.",
  },
  { code: "", explanation: "" },
  {
    code: "    def is_empty(self):",
    explanation: "Helper to check if queue contains no elements.",
  },
  {
    code: "        return len(self.items) == 0",
    explanation: "Returns True if length is 0, False otherwise.",
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
          />
        }
        codeTab={<CodeLab pythonCode={pythonCode} />}
        gameTab={<QueueVisualizer />}
      />
      <AiTutorButton />
    </>
  );
};

export default QueueModule;
