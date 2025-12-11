import LearningLayout from "@/components/algoviz/LearningLayout";
import VisualConceptCanvas from "@/components/algoviz/VisualConceptCanvas";
import IntegratedCodeLab, { type CodeStep } from "@/components/algoviz/IntegratedCodeLab";
import StackCodeVisualizer from "@/components/algoviz/StackCodeVisualizer";
import StackVisualizer from "@/components/algoviz/StackVisualizer";
import AiTutorButton from "@/components/algoviz/AiTutorButton";
import { Undo2, History } from "lucide-react";

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

const stackTheoryContent = {
  theory: "The last item you put in is the first one you take out.",
  metaphorTitle: "Think of a Stack of Plates",
  metaphor: "You always add a new plate to the top, and you take the top one off first. If you try to pull a plate from the bottom, the whole stack might fall!",
  examples: [
    {
      icon: Undo2,
      title: "The 'Undo' Button",
      description: "The computer remembers your steps. When you click Undo, it removes the very last thing you did."
    },
    {
      icon: History,
      title: "Browser Back Button",
      description: "Your history is a stack. Clicking 'Back' removes the current page to show you the one before it."
    }
  ]
};

const pythonCode: CodeStep[] = [
  { 
    code: "class Stack:", 
    explanation: "Define a Stack class to hold our data.", 
    variables: {},
    visualState: { items: [], activeIndices: [], action: 'none' }
  },
  { 
    code: "    def __init__(self, limit=8):", 
    explanation: "Initialize the stack with a size limit of 8.", 
    variables: { "limit": "8" },
    visualState: { items: [], activeIndices: [], action: 'none' }
  },
  { 
    code: "        self.items = []", 
    explanation: "Create an empty list to store the stack items.", 
    variables: { "self.items": "[]", "self.limit": "8" },
    visualState: { items: [], activeIndices: [], action: 'none' }
  },
  { 
    code: "        self.limit = limit", 
    explanation: "Save the limit so we can check for overflows.", 
    variables: { "self.items": "[]", "self.limit": "8" },
    visualState: { items: [], activeIndices: [], action: 'none' }
  },
  { 
    code: "    def push(self, item):", 
    explanation: "Define push to add an item to the top. We're pushing 30 onto a stack with [10, 20].", 
    variables: { "self.items": "[10, 20]", "self.limit": "8", "item": "30" },
    visualState: { items: [10, 20], activeIndices: [], action: 'none' }
  },
  { 
    code: "        if len(self.items) >= self.limit:", 
    explanation: "Check: Is the stack full? We have 2 items, limit is 8, so 2 < 8 = False (not full).", 
    variables: { "self.items": "[10, 20]", "self.limit": "8", "len(self.items)": "2", "item": "30" },
    visualState: { items: [10, 20], activeIndices: [], action: 'none' }
  },
  { 
    code: "            print('Stack Overflow')", 
    explanation: "This line would run if stack was full. It's skipped since we have room.", 
    variables: { "condition": "False (2 < 8)" },
    visualState: { items: [10, 20], activeIndices: [], action: 'none' }
  },
  { 
    code: "            return", 
    explanation: "This return is skipped because our overflow check was False.", 
    variables: {},
    visualState: { items: [10, 20], activeIndices: [], action: 'none' }
  },
  { 
    code: "        self.items.append(item)", 
    explanation: "Add 30 to the top of the stack. The stack becomes [10, 20, 30].", 
    variables: { "self.items": "[10, 20, 30]", "item": "30" },
    visualState: { items: [10, 20, 30], activeIndices: [2], action: 'add' }
  },
  { 
    code: "    def pop(self):", 
    explanation: "Define pop to remove the top item. Our stack currently has [10, 20, 30].", 
    variables: { "self.items": "[10, 20, 30]" },
    visualState: { items: [10, 20, 30], activeIndices: [], action: 'none' }
  },
  { 
    code: "        if not self.items:", 
    explanation: "Check: Is the stack empty? We have 3 items, so 'not [10,20,30]' = False.", 
    variables: { "self.items": "[10, 20, 30]", "is_empty": "False" },
    visualState: { items: [10, 20, 30], activeIndices: [], action: 'none' }
  },
  { 
    code: "            print('Stack Underflow')", 
    explanation: "This would run if stack was empty. Skipped since we have items.", 
    variables: { "condition": "False (not empty)" },
    visualState: { items: [10, 20, 30], activeIndices: [], action: 'none' }
  },
  { 
    code: "            return", 
    explanation: "Skipped because the underflow check was False.", 
    variables: {},
    visualState: { items: [10, 20, 30], activeIndices: [], action: 'none' }
  },
  { 
    code: "        return self.items.pop()", 
    explanation: "Remove and return 30 (the last item). Stack becomes [10, 20].", 
    variables: { "self.items": "[10, 20]", "returned": "30" },
    visualState: { items: [10, 20, 30], activeIndices: [2], action: 'remove' }
  },
  { 
    code: "    def peek(self):", 
    explanation: "Define peek to look at the top item without removing it. Stack is [10, 20].", 
    variables: { "self.items": "[10, 20]" },
    visualState: { items: [10, 20], activeIndices: [], action: 'none' }
  },
  { 
    code: "        if not self.items:", 
    explanation: "Check if empty first. We have items, so this is False.", 
    variables: { "self.items": "[10, 20]", "is_empty": "False" },
    visualState: { items: [10, 20], activeIndices: [], action: 'none' }
  },
  { 
    code: "            return None", 
    explanation: "Skipped because stack is not empty.", 
    variables: {},
    visualState: { items: [10, 20], activeIndices: [], action: 'none' }
  },
  { 
    code: "        return self.items[-1]", 
    explanation: "Return 20 (the top item at index -1) without removing it.", 
    variables: { "self.items": "[10, 20]", "self.items[-1]": "20" },
    visualState: { items: [10, 20], activeIndices: [1], action: 'read' }
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
            theoryContent={stackTheoryContent}
          />
        }
        codeTab={
          <IntegratedCodeLab
            pythonCode={pythonCode}
            visualizer={(visualState) => <StackCodeVisualizer visualState={visualState} />}
          />
        }
        gameTab={<StackVisualizer />}
      />
      <AiTutorButton />
    </>
  );
};

export default StackModule;
