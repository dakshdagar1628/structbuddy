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

const cCode = [
  {
    code: "#define MAX_SIZE 100",
    explanation:
      "Define maximum queue size as a constant.",
  },
  { code: "", explanation: "" },
  {
    code: "typedef struct {",
    explanation: "Create a struct to hold queue data with circular array.",
  },
  {
    code: "    int items[MAX_SIZE];",
    explanation: "Array to store queue elements with fixed capacity.",
  },
  {
    code: "    int front, rear;",
    explanation: "Indices to track front and rear positions of the queue.",
  },
  {
    code: "    int count;",
    explanation: "Counter to track the current number of elements.",
  },
  { code: "} Queue;", explanation: "Complete the Queue struct definition." },
  { code: "", explanation: "" },
  {
    code: "void initialize(Queue *q) {",
    explanation: "Function to initialize a queue to empty state.",
  },
  {
    code: "    q->front = 0;",
    explanation: "Set front index to 0 (first position).",
  },
  {
    code: "    q->rear = -1;",
    explanation: "Set rear to -1 indicating no elements added yet.",
  },
  {
    code: "    q->count = 0;",
    explanation: "Set count to 0 as queue starts empty.",
  },
  { code: "}", explanation: "End of initialize function." },
  { code: "", explanation: "" },
  {
    code: "void enqueue(Queue *q, int item) {",
    explanation: "Enqueue adds an element to the rear of the queue.",
  },
  {
    code: "    if (q->count < MAX_SIZE) {",
    explanation: "Check if there's room to prevent queue overflow.",
  },
  {
    code: "        q->rear = (q->rear + 1) % MAX_SIZE;",
    explanation: "Circular increment: wraps around to 0 after MAX_SIZE-1.",
  },
  {
    code: "        q->items[q->rear] = item;",
    explanation: "Store the new item at the rear position.",
  },
  {
    code: "        q->count++;",
    explanation: "Increment the element count.",
  },
  { code: "    }", explanation: "End of overflow check." },
  { code: "}", explanation: "End of enqueue function." },
  { code: "", explanation: "" },
  {
    code: "int dequeue(Queue *q) {",
    explanation: "Dequeue removes and returns the front element.",
  },
  {
    code: "    if (q->count > 0) {",
    explanation: "Check if queue is not empty to prevent underflow.",
  },
  {
    code: "        int item = q->items[q->front];",
    explanation: "Store front item to return it later.",
  },
  {
    code: "        q->front = (q->front + 1) % MAX_SIZE;",
    explanation: "Move front pointer forward with circular wrap.",
  },
  {
    code: "        q->count--;",
    explanation: "Decrement the element count.",
  },
  {
    code: "        return item;",
    explanation: "Return the removed front item.",
  },
  { code: "    }", explanation: "End of underflow check." },
  {
    code: "    return -1;",
    explanation: "Return -1 as error indicator if queue was empty.",
  },
  { code: "}", explanation: "End of dequeue function." },
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
        codeTab={<CodeLab pythonCode={pythonCode} cCode={cCode} />}
        gameTab={<QueueVisualizer />}
      />
      <AiTutorButton />
    </>
  );
};

export default QueueModule;
