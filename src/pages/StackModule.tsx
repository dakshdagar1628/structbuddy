import LearningLayout from "@/components/algoviz/LearningLayout";
import VisualConceptCanvas from "@/components/algoviz/VisualConceptCanvas";
import CodeLab from "@/components/algoviz/CodeLab";
import StackVisualizer from "@/components/algoviz/StackVisualizer";
import AiTutorButton from "@/components/algoviz/AiTutorButton";

const stackConceptNodes = [
  { id: "1", type: "start" as const, label: "Start" },
  {
    id: "2",
    type: "process" as const,
    label: "Create Stack",
    description: "Initialize empty stack",
  },
  {
    id: "3",
    type: "decision" as const,
    label: "Is Stack Full?",
    description: "Check capacity",
  },
  {
    id: "4",
    type: "process" as const,
    label: "Push Element",
    description: "Add to top",
  },
  {
    id: "5",
    type: "decision" as const,
    label: "Is Stack Empty?",
    description: "Check if empty",
  },
  {
    id: "6",
    type: "process" as const,
    label: "Pop Element",
    description: "Remove from top",
  },
  { id: "7", type: "end" as const, label: "Stop" },
];

const pythonCode = [
  {
    code: "class Stack:",
    explanation:
      "We define a Stack class to encapsulate all stack operations and data.",
  },
  {
    code: "    def __init__(self):",
    explanation:
      "The constructor method initializes a new stack instance when created.",
  },
  {
    code: "        self.items = []",
    explanation:
      "We use a Python list to store stack elements. It starts empty.",
  },
  { code: "", explanation: "" },
  {
    code: "    def push(self, item):",
    explanation:
      "The push method adds a new element to the top of the stack.",
  },
  {
    code: "        self.items.append(item)",
    explanation:
      "We use list's append() to add the item at the end, which is our 'top'.",
  },
  { code: "", explanation: "" },
  {
    code: "    def pop(self):",
    explanation:
      "The pop method removes and returns the top element from the stack.",
  },
  {
    code: "        if not self.is_empty():",
    explanation: "First, we check if the stack has elements to prevent errors.",
  },
  {
    code: "            return self.items.pop()",
    explanation:
      "List's pop() removes and returns the last item - our stack's top.",
  },
  {
    code: "        return None",
    explanation:
      "If stack is empty, we return None to indicate no element exists.",
  },
  { code: "", explanation: "" },
  {
    code: "    def peek(self):",
    explanation: "Peek returns the top element without removing it.",
  },
  {
    code: "        if not self.is_empty():",
    explanation: "We must check if stack is not empty before accessing.",
  },
  {
    code: "            return self.items[-1]",
    explanation:
      "Index -1 gives us the last element in Python - our stack's top.",
  },
  {
    code: "        return None",
    explanation: "Return None if the stack is empty.",
  },
  { code: "", explanation: "" },
  {
    code: "    def is_empty(self):",
    explanation: "Helper method to check if the stack contains no elements.",
  },
  {
    code: "        return len(self.items) == 0",
    explanation:
      "Returns True if length is 0 (empty), False otherwise.",
  },
];

const cCode = [
  {
    code: "#define MAX_SIZE 100",
    explanation:
      "We define a constant for maximum stack size using preprocessor directive.",
  },
  { code: "", explanation: "" },
  {
    code: "typedef struct {",
    explanation:
      "We create a struct to hold the stack data: items array and top index.",
  },
  {
    code: "    int items[MAX_SIZE];",
    explanation: "Array to store stack elements with fixed maximum capacity.",
  },
  {
    code: "    int top;",
    explanation:
      "Integer to track the index of the top element (-1 when empty).",
  },
  { code: "} Stack;", explanation: "Complete the struct definition." },
  { code: "", explanation: "" },
  {
    code: "void initialize(Stack *s) {",
    explanation:
      "Function to initialize a stack, takes a pointer to Stack struct.",
  },
  {
    code: "    s->top = -1;",
    explanation:
      "Set top to -1 indicating an empty stack (no valid index yet).",
  },
  { code: "}", explanation: "End of initialize function." },
  { code: "", explanation: "" },
  {
    code: "void push(Stack *s, int item) {",
    explanation:
      "Push function adds an item to the stack. Takes pointer and value.",
  },
  {
    code: "    if (s->top < MAX_SIZE - 1) {",
    explanation: "Check if there's room in the stack to prevent overflow.",
  },
  {
    code: "        s->items[++s->top] = item;",
    explanation:
      "Increment top first, then store item at that index.",
  },
  { code: "    }", explanation: "End of overflow check." },
  { code: "}", explanation: "End of push function." },
  { code: "", explanation: "" },
  {
    code: "int pop(Stack *s) {",
    explanation:
      "Pop function removes and returns the top element from stack.",
  },
  {
    code: "    if (s->top >= 0) {",
    explanation: "Check if stack is not empty to prevent underflow.",
  },
  {
    code: "        return s->items[s->top--];",
    explanation:
      "Return current top item, then decrement the top index.",
  },
  { code: "    }", explanation: "End of underflow check." },
  {
    code: "    return -1;",
    explanation:
      "Return -1 as error indicator if stack was empty.",
  },
  { code: "}", explanation: "End of pop function." },
];

const StackModule = () => {
  return (
    <>
      <LearningLayout
        title="Stack"
        principle="LIFO - Last In, First Out"
        visualTab={
          <VisualConceptCanvas
            conceptNodes={stackConceptNodes}
            dataStructureType="stack"
          />
        }
        codeTab={<CodeLab pythonCode={pythonCode} cCode={cCode} />}
        gameTab={<StackVisualizer />}
      />
      <AiTutorButton />
    </>
  );
};

export default StackModule;
