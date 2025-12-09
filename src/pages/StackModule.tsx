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
  { code: "class Stack:", explanation: "Define a Stack class to hold our data." },
  { code: "    def __init__(self, limit=8):", explanation: "Initialize the stack with a size limit of 8." },
  { code: "        self.items = []", explanation: "Create an empty list to store the stack items." },
  { code: "        self.limit = limit", explanation: "Save the limit so we can check for overflows." },
  { code: "    def push(self, item):", explanation: "Define push to add an item to the top." },
  { code: "        if len(self.items) >= self.limit:", explanation: "Check: Is the stack full? (Overflow)" },
  { code: "            print('Stack Overflow')", explanation: "Error: Cannot add to a full stack." },
  { code: "            return", explanation: "Stop execution." },
  { code: "        self.items.append(item)", explanation: "Add the item to the top of the list." },
  { code: "    def pop(self):", explanation: "Define pop to remove the top item." },
  { code: "        if not self.items:", explanation: "Check: Is the stack empty? (Underflow)" },
  { code: "            print('Stack Underflow')", explanation: "Error: Cannot remove from an empty stack." },
  { code: "            return", explanation: "Stop execution." },
  { code: "        return self.items.pop()", explanation: "Remove and return the last item added." },
  { code: "    def peek(self):", explanation: "Define peek to look at the top item without removing it." },
  { code: "        if not self.items:", explanation: "Check if empty." },
  { code: "            return None", explanation: "Nothing to see." },
  { code: "        return self.items[-1]", explanation: "Return the last item (Top) safely." },
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
        codeTab={<CodeLab pythonCode={pythonCode} />}
        gameTab={<StackVisualizer />}
      />
      <AiTutorButton />
    </>
  );
};

export default StackModule;
