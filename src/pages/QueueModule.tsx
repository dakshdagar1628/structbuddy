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
      "We define a constant called MAX_SIZE to set the maximum number of elements our queue can hold. This prevents us from accidentally adding too many items.",
  },
  { code: "", explanation: "" },
  {
    code: "typedef struct {",
    explanation:
      "We create a custom data type called a 'struct' to group together all the information our queue needs to work properly.",
  },
  {
    code: "    int items[MAX_SIZE];",
    explanation:
      "This is an array that will hold all the actual data in our queue. Think of it like a row of boxes where we store our numbers.",
  },
  {
    code: "    int front, rear;",
    explanation:
      "These two variables act like bookmarks. 'front' tells us where the first person in line is, and 'rear' tells us where the last person is.",
  },
  {
    code: "    int count;",
    explanation:
      "This counter keeps track of how many items are currently in the queue. It helps us know if the queue is full or empty.",
  },
  {
    code: "} Queue;",
    explanation:
      "This line finishes our struct definition and gives it the name 'Queue' so we can use it throughout our program.",
  },
  { code: "", explanation: "" },
  {
    code: "void initialize(Queue *q) {",
    explanation:
      "This function sets up a brand new queue before we use it. The '*q' means we're working directly with a queue in memory, not a copy.",
  },
  {
    code: "    q->front = 0;",
    explanation:
      "We set the front pointer to position 0, which is the very first spot in our array. This is where we'll remove items from.",
  },
  {
    code: "    q->rear = -1;",
    explanation:
      "We set rear to -1 because no items have been added yet. When we add the first item, rear will become 0.",
  },
  {
    code: "    q->count = 0;",
    explanation:
      "We start with zero items in the queue. This number will go up when we enqueue and down when we dequeue.",
  },
  {
    code: "}",
    explanation:
      "This closes the initialize function. Our queue is now ready to use!",
  },
  { code: "", explanation: "" },
  {
    code: "void enqueue(Queue *q, int item) {",
    explanation:
      "The enqueue function adds a new item to the back of the queue, just like a new person joining the end of a line.",
  },
  {
    code: "    if (q->count >= MAX_SIZE) {",
    explanation:
      "OVERFLOW CHECK: Before adding, we check if the queue is already full. If count equals or exceeds MAX_SIZE, there's no room for more items.",
  },
  {
    code: '        printf("Queue Overflow!\\n");',
    explanation:
      "If the queue is full, we print an error message to let the user know we cannot add any more items.",
  },
  {
    code: "        return;",
    explanation:
      "We exit the function early because there's no space to add the new item. This prevents data corruption.",
  },
  {
    code: "    }",
    explanation:
      "This closes the overflow check. If we get past here, we know there's room to add our new item.",
  },
  {
    code: "    q->rear = (q->rear + 1) % MAX_SIZE;",
    explanation:
      "We move the rear pointer forward by 1. The '% MAX_SIZE' makes it wrap around to 0 if we reach the end of the array (circular queue).",
  },
  {
    code: "    q->items[q->rear] = item;",
    explanation:
      "We store the new item at the rear position. This is like the new person taking their spot at the back of the line.",
  },
  {
    code: "    q->count++;",
    explanation:
      "We increase the count by 1 because we just added one new item to the queue.",
  },
  {
    code: "}",
    explanation:
      "This closes the enqueue function. The new item is now safely in the queue!",
  },
  { code: "", explanation: "" },
  {
    code: "int dequeue(Queue *q) {",
    explanation:
      "The dequeue function removes and returns the item at the front of the queue, like serving the first person in line.",
  },
  {
    code: "    if (q->count == 0) {",
    explanation:
      "UNDERFLOW CHECK: Before removing, we check if the queue is empty. If count is 0, there's nothing to remove.",
  },
  {
    code: '        printf("Queue Underflow!\\n");',
    explanation:
      "If the queue is empty, we print an error message to let the user know we cannot remove anything.",
  },
  {
    code: "        return -1;",
    explanation:
      "We return -1 as a special error code to indicate the dequeue operation failed because the queue was empty.",
  },
  {
    code: "    }",
    explanation:
      "This closes the underflow check. If we get past here, we know there's at least one item to remove.",
  },
  {
    code: "    int item = q->items[q->front];",
    explanation:
      "We save the front item in a temporary variable so we can return it later. This is the item we're about to remove.",
  },
  {
    code: "    q->front = (q->front + 1) % MAX_SIZE;",
    explanation:
      "We move the front pointer forward by 1. The '% MAX_SIZE' handles the wrap-around for our circular queue.",
  },
  {
    code: "    q->count--;",
    explanation:
      "We decrease the count by 1 because we just removed one item from the queue.",
  },
  {
    code: "    return item;",
    explanation:
      "We return the item we removed so the program can use it. The person has been served and left the line!",
  },
  {
    code: "}",
    explanation:
      "This closes the dequeue function. The front item has been successfully removed and returned.",
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
        codeTab={<CodeLab pythonCode={pythonCode} cCode={cCode} />}
        gameTab={<QueueVisualizer />}
      />
      <AiTutorButton />
    </>
  );
};

export default QueueModule;
