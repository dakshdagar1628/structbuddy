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
    code: "int stack[MAX], top = -1;",
    explanation:
      "We create an array to hold items and set 'top' to -1 to show it's empty.",
  },
  {
    code: "void push(int value) {",
    explanation:
      "We define the Push function to add new items to the stack.",
  },
  {
    code: "    if (top == MAX - 1) return;",
    explanation:
      "Check: If the stack is full (Overflow), we stop here.",
  },
  {
    code: "    top++; stack[top] = value;",
    explanation:
      "We move the top marker up and insert the value.",
  },
  {
    code: "void pop() {",
    explanation:
      "We define the Pop function to remove items.",
  },
  {
    code: "    if (top == -1) return;",
    explanation:
      "Check: If the stack is empty (Underflow), we stop here.",
  },
  {
    code: '    printf("%d deleted", stack[top--]);',
    explanation:
      "We print the removed item and move the top marker down.",
  },
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
