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
      "We're creating a blueprint called 'Queue' that will help us manage a line of items. Think of it like designing a ticket counter system where people wait in line — first person to arrive gets served first!",
  },
  {
    code: "    def __init__(self):",
    explanation:
      "This is a special setup function that runs automatically whenever we create a new queue. It's like opening a new checkout lane at a store — we need to set everything up before customers can start lining up.",
  },
  {
    code: "        self.items = []",
    explanation:
      "We create an empty list called 'items' to store everything in our queue. Picture this as an empty rope line at an amusement park — no one is waiting yet, but the space is ready for people to join!",
  },
  {
    code: "",
    explanation: "",
  },
  {
    code: "    def enqueue(self, item):",
    explanation:
      "This function adds a new person to the END of the line (the Rear). The name 'enqueue' literally means 'to join the queue'. Just like when you arrive at a coffee shop — you go to the back of the line, not the front!",
  },
  {
    code: "        self.items.append(item)",
    explanation:
      "The 'append' command adds our new item to the very end of the list. Imagine a person walking up and standing behind the last person in line. They're now the new 'Rear' of the queue!",
  },
  {
    code: "",
    explanation: "",
  },
  {
    code: "    def dequeue(self):",
    explanation:
      "This function removes and returns the FIRST person from the line (the Front). The prefix 'de-' means 'remove from'. It's like when the cashier calls 'Next!' and the first person in line steps forward to be served.",
  },
  {
    code: "        if not self.is_empty():",
    explanation:
      "Before we try to remove someone, we check if there's actually anyone in the queue! It would be silly (and cause an error) to try serving a customer when the line is completely empty.",
  },
  {
    code: "            return self.items.pop(0)",
    explanation:
      "The 'pop(0)' command removes the item at position 0 (the very first one) and gives it back to us. This is the person who has been waiting the longest — they finally get their turn! Fair and square.",
  },
  {
    code: "        return None",
    explanation:
      "If the queue was empty, we return 'None' which is Python's way of saying 'nothing here'. It's like the cashier looking around an empty store and shrugging — no one to serve!",
  },
  {
    code: "",
    explanation: "",
  },
  {
    code: "    def peek(self):",
    explanation:
      "This function lets us SEE who's at the front without removing them. It's like glancing at the first person in line to see if your friend is about to be served, but you're not cutting in line or changing anything.",
  },
  {
    code: "        if not self.is_empty():",
    explanation:
      "Again, we first make sure the queue isn't empty. Can't peek at someone who doesn't exist! This safety check prevents errors.",
  },
  {
    code: "            return self.items[0]",
    explanation:
      "We look at (but don't remove!) the item at index 0. Using square brackets [0] just 'reads' the value. The person stays in line — we're just checking who they are.",
  },
  {
    code: "        return None",
    explanation:
      "If nobody is in the queue, we return None. There's simply no one at the front to look at!",
  },
  {
    code: "",
    explanation: "",
  },
  {
    code: "    def is_empty(self):",
    explanation:
      "A helpful function that tells us whether the queue has any items or not. It's like asking 'Is anyone waiting in line right now?' Very useful before trying to serve someone!",
  },
  {
    code: "        return len(self.items) == 0",
    explanation:
      "We check if the length (number of items) equals zero. If yes, return True (queue is empty). If there are items, return False (queue has people waiting). Simple yes-or-no answer!",
  },
  {
    code: "",
    explanation: "",
  },
  {
    code: "    def size(self):",
    explanation:
      "This function tells us exactly how many items are currently waiting in the queue. Useful for knowing if the line is long or short!",
  },
  {
    code: "        return len(self.items)",
    explanation:
      "We use Python's built-in 'len()' function to count all the items in our list. It's like counting heads in a line — '1, 2, 3... there are 3 people waiting!'",
  },
];

const cCode = [
  {
    code: "#include <stdio.h>",
    explanation:
      "This line includes the Standard Input/Output library, which gives us access to functions like 'printf' for displaying messages on the screen. Think of it like plugging in a microphone so your program can talk to users!",
  },
  {
    code: "#include <stdbool.h>",
    explanation:
      "This includes support for 'true' and 'false' values (boolean type). Without this, C wouldn't understand what 'true' or 'false' means — it's like teaching the computer the concept of yes and no!",
  },
  {
    code: "",
    explanation: "",
  },
  {
    code: "#define MAX_SIZE 100",
    explanation:
      "We're setting a constant called MAX_SIZE to 100. This is the maximum number of people our queue can hold. Unlike Python's flexible lists, C needs to know the size upfront — like building a waiting room with exactly 100 chairs.",
  },
  {
    code: "",
    explanation: "",
  },
  {
    code: "typedef struct {",
    explanation:
      "We're creating a custom data type called a 'struct' (structure). Think of it as designing a container that holds multiple related pieces of information together — like a filing cabinet with specific folders inside.",
  },
  {
    code: "    int items[MAX_SIZE];",
    explanation:
      "This is an array (list) that can hold up to 100 integers. It's the actual storage space for our queue items — like having 100 numbered slots where people can stand in line.",
  },
  {
    code: "    int front;",
    explanation:
      "This integer keeps track of WHERE the front of the line is in our array. As we remove people, this number changes to point to the new first person. It's like a 'Now Serving: #' sign!",
  },
  {
    code: "    int rear;",
    explanation:
      "This tracks WHERE the back of the line is. When someone new joins, we update this to point to their position. It's like knowing where the end of the line is so newcomers know where to stand.",
  },
  {
    code: "    int count;",
    explanation:
      "This keeps count of how many items are currently in the queue. It's like having a counter that goes up when someone joins and down when someone leaves — always knowing exactly how busy we are!",
  },
  {
    code: "} Queue;",
    explanation:
      "This closes our structure definition and names it 'Queue'. Now we can create queue variables easily! It's like finishing the blueprint for our custom container and giving it an official name.",
  },
  {
    code: "",
    explanation: "",
  },
  {
    code: "void initQueue(Queue *q) {",
    explanation:
      "This function sets up a fresh, empty queue. The 'Queue *q' means we're receiving a pointer (memory address) to a Queue. Using a pointer lets us modify the original queue, not just a copy of it!",
  },
  {
    code: "    q->front = 0;",
    explanation:
      "We set the front pointer to position 0, meaning the front of our queue starts at the first slot of the array. The '->' arrow is how we access parts of a struct through a pointer. It's like setting the 'Now Serving' sign to #0.",
  },
  {
    code: "    q->rear = -1;",
    explanation:
      "We set rear to -1, which is a clever trick! It means 'no one has joined yet'. When the first person enqueues, we'll add 1 to get position 0. Think of it as the line being so empty that the 'end of line' sign isn't even placed yet!",
  },
  {
    code: "    q->count = 0;",
    explanation:
      "We set the count to 0 because there are no items in our fresh queue yet. Zero people waiting, zero items stored. A clean slate, ready for action!",
  },
  {
    code: "}",
    explanation:
      "This closing brace ends our initQueue function. The queue is now properly initialized and ready to accept items!",
  },
  {
    code: "",
    explanation: "",
  },
  {
    code: "bool isEmpty(Queue *q) {",
    explanation:
      "This function checks if the queue is empty and returns true or false. It's a quick helper that answers the question: 'Is anyone waiting in line right now?'",
  },
  {
    code: "    return q->count == 0;",
    explanation:
      "We simply check if count equals zero. If yes, return true (empty). If count is anything else, return false (not empty). Super simple — just count the heads!",
  },
  {
    code: "}",
    explanation:
      "End of our isEmpty function. Short and sweet!",
  },
  {
    code: "",
    explanation: "",
  },
  {
    code: "bool isFull(Queue *q) {",
    explanation:
      "This function checks if the queue has reached maximum capacity. Unlike Python lists that grow automatically, our C array has a fixed size, so we MUST check before adding more!",
  },
  {
    code: "    return q->count == MAX_SIZE;",
    explanation:
      "If count equals MAX_SIZE (100), the queue is completely full — no more room! It's like when all 100 chairs in the waiting room are taken. Return true to signal 'FULL!'",
  },
  {
    code: "}",
    explanation:
      "End of isFull function. This check prevents us from accidentally overfilling our queue and corrupting memory!",
  },
  {
    code: "",
    explanation: "",
  },
  {
    code: "void enqueue(Queue *q, int item) {",
    explanation:
      "This function adds a new item to the REAR of the queue. We pass in which queue to modify and what item (integer) to add. It's the 'join the line' function!",
  },
  {
    code: "    if (isFull(q)) {",
    explanation:
      "First, we check if the queue is full. If it is, we can't add more items! It's like a bouncer at a club checking if there's room before letting someone in.",
  },
  {
    code: "        printf(\"Queue Overflow!\\n\");",
    explanation:
      "If the queue is full, we print an error message. 'Overflow' means we're trying to put more in than it can hold — like trying to stuff a 101st person into a 100-person room!",
  },
  {
    code: "        return;",
    explanation:
      "We exit the function early without doing anything. The item doesn't get added because there's simply no room. Safety first!",
  },
  {
    code: "    }",
    explanation:
      "End of our overflow check. If we get past this point, we know there's room!",
  },
  {
    code: "    q->rear = (q->rear + 1) % MAX_SIZE;",
    explanation:
      "Here's the magic! We move the rear pointer forward by 1. The '% MAX_SIZE' makes it wrap around to 0 if we go past the end — this creates a 'circular' queue that reuses empty slots at the beginning!",
  },
  {
    code: "    q->items[q->rear] = item;",
    explanation:
      "We place the new item at the rear position in our array. It's like the new person finding their spot at the end of the line and standing there!",
  },
  {
    code: "    q->count++;",
    explanation:
      "We increase the count by 1 because we just added someone. Our queue now has one more person waiting than before!",
  },
  {
    code: "}",
    explanation:
      "End of enqueue function. The new item is safely added to the rear of our queue!",
  },
  {
    code: "",
    explanation: "",
  },
  {
    code: "int dequeue(Queue *q) {",
    explanation:
      "This function removes and returns the item at the FRONT of the queue. It's the 'serve the next customer' function — whoever arrived first gets served first (FIFO)!",
  },
  {
    code: "    if (isEmpty(q)) {",
    explanation:
      "We check if anyone is actually waiting. Can't serve a customer if there are no customers! This prevents errors from trying to access empty data.",
  },
  {
    code: "        printf(\"Queue Underflow!\\n\");",
    explanation:
      "If empty, we print an error. 'Underflow' means we're trying to take from something that has nothing — like reaching into an empty cookie jar!",
  },
  {
    code: "        return -1;",
    explanation:
      "We return -1 as an error indicator. Since we're dealing with queue data, -1 tells the caller 'something went wrong, there was nothing to remove!'",
  },
  {
    code: "    }",
    explanation:
      "End of underflow check. If we continue past here, we know there's at least one item to remove!",
  },
  {
    code: "    int item = q->items[q->front];",
    explanation:
      "We grab the item at the front position and save it in a variable. This is the person who's been waiting the longest — they're about to be served!",
  },
  {
    code: "    q->front = (q->front + 1) % MAX_SIZE;",
    explanation:
      "We move the front pointer forward by 1 (with wraparound). We don't actually delete the old data — we just move the 'Now Serving' sign to point to the next person!",
  },
  {
    code: "    q->count--;",
    explanation:
      "We decrease the count by 1 because someone just left the queue. One less person waiting!",
  },
  {
    code: "    return item;",
    explanation:
      "We return the item we removed. The caller now has the value that was at the front of the queue. Customer served successfully!",
  },
  {
    code: "}",
    explanation:
      "End of dequeue function. The front item has been removed and returned!",
  },
  {
    code: "",
    explanation: "",
  },
  {
    code: "int peek(Queue *q) {",
    explanation:
      "This function lets us see the front item WITHOUT removing it. It's like glancing at who's next in line without actually calling them up yet.",
  },
  {
    code: "    if (isEmpty(q)) {",
    explanation:
      "We check if the queue is empty first. Can't peek at nothing!",
  },
  {
    code: "        printf(\"Queue is empty!\\n\");",
    explanation:
      "If empty, we let the user know there's nothing to see.",
  },
  {
    code: "        return -1;",
    explanation:
      "Return -1 to indicate an error — no front element exists to peek at!",
  },
  {
    code: "    }",
    explanation:
      "End of empty check.",
  },
  {
    code: "    return q->items[q->front];",
    explanation:
      "We return the value at the front position, but we DON'T move the front pointer or change count. The item stays exactly where it is — we just looked at it!",
  },
  {
    code: "}",
    explanation:
      "End of peek function. Now you can see who's next without disturbing the queue!",
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
