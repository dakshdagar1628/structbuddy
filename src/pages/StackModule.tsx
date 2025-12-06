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
      "We define a constant called MAX_SIZE to set the maximum number of elements our stack can hold. This prevents the stack from growing infinitely.",
  },
  { code: "", explanation: "" },
  {
    code: "typedef struct {",
    explanation:
      "We create a custom data type called a 'struct' to group together all the information our stack needs to work properly.",
  },
  {
    code: "    int items[MAX_SIZE];",
    explanation:
      "This is an array that will hold all the actual data in our stack. Think of it like a vertical stack of boxes where we store our numbers.",
  },
  {
    code: "    int top;",
    explanation:
      "This variable acts like a bookmark that tells us where the top element is. When empty, it's -1 because there's nothing in the stack yet.",
  },
  {
    code: "} Stack;",
    explanation:
      "This line finishes our struct definition and gives it the name 'Stack' so we can use it throughout our program.",
  },
  { code: "", explanation: "" },
  {
    code: "void initialize(Stack *s) {",
    explanation:
      "This function sets up a brand new stack before we use it. The '*s' means we're working directly with a stack in memory, not a copy.",
  },
  {
    code: "    s->top = -1;",
    explanation:
      "We set top to -1 because no items have been added yet. This special value tells us the stack is completely empty.",
  },
  {
    code: "}",
    explanation:
      "This closes the initialize function. Our stack is now ready to use!",
  },
  { code: "", explanation: "" },
  {
    code: "void push(Stack *s, int item) {",
    explanation:
      "The push function adds a new item to the top of the stack, like placing a new plate on top of a pile.",
  },
  {
    code: "    if (s->top >= MAX_SIZE - 1) {",
    explanation:
      "OVERFLOW CHECK: Before adding, we check if the stack is already full. If top equals MAX_SIZE - 1, we've used all available spaces.",
  },
  {
    code: '        printf("Stack Overflow!\\n");',
    explanation:
      "If the stack is full, we print an error message to let the user know we cannot add any more items.",
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
    code: "    s->top++;",
    explanation:
      "We move the top pointer up by 1 to make room for the new element. This is like making space for a new plate.",
  },
  {
    code: "    s->items[s->top] = item;",
    explanation:
      "We store the new item at the top position. The new element is now sitting on top of the stack!",
  },
  {
    code: "}",
    explanation:
      "This closes the push function. The new item is now safely on top of the stack!",
  },
  { code: "", explanation: "" },
  {
    code: "int pop(Stack *s) {",
    explanation:
      "The pop function removes and returns the top item from the stack, like taking the top plate off a pile.",
  },
  {
    code: "    if (s->top == -1) {",
    explanation:
      "UNDERFLOW CHECK: Before removing, we check if the stack is empty. If top is -1, there's nothing to remove.",
  },
  {
    code: '        printf("Stack Underflow!\\n");',
    explanation:
      "If the stack is empty, we print an error message to let the user know we cannot remove anything.",
  },
  {
    code: "        return -1;",
    explanation:
      "We return -1 as a special error code to indicate the pop operation failed because the stack was empty.",
  },
  {
    code: "    }",
    explanation:
      "This closes the underflow check. If we get past here, we know there's at least one item to remove.",
  },
  {
    code: "    int item = s->items[s->top];",
    explanation:
      "We save the top item in a temporary variable so we can return it later. This is the item we're about to remove.",
  },
  {
    code: "    s->top--;",
    explanation:
      "We move the top pointer down by 1, effectively removing the top element. The item is no longer accessible.",
  },
  {
    code: "    return item;",
    explanation:
      "We return the item we removed so the program can use it. The top plate has been taken off the stack!",
  },
  {
    code: "}",
    explanation:
      "This closes the pop function. The top item has been successfully removed and returned.",
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
