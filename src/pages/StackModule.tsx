import LearningLayout from "@/components/algoviz/LearningLayout";
import VisualConceptCanvas from "@/components/algoviz/VisualConceptCanvas";
import IntegratedCodeLab from "@/components/algoviz/IntegratedCodeLab";
import StackCodeVisualizer from "@/components/algoviz/StackCodeVisualizer";
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
  { code: "class Stack:", explanation: "Define a Stack class to hold our data.", variables: {} },
  { code: "    def __init__(self, limit=8):", explanation: "Initialize the stack with a size limit of 8.", variables: { "limit": "8" } },
  { code: "        self.items = []", explanation: "Create an empty list to store the stack items.", variables: { "self.items": "[]", "self.limit": "8" } },
  { code: "        self.limit = limit", explanation: "Save the limit so we can check for overflows.", variables: { "self.items": "[]", "self.limit": "8" } },
  { code: "    def push(self, item):", explanation: "Define push to add an item to the top.", variables: { "self.items": "[10, 20]", "self.limit": "8", "item": "30" } },
  { code: "        if len(self.items) >= self.limit:", explanation: "Check: Is the stack full? (Overflow)", variables: { "self.items": "[10, 20]", "self.limit": "8", "len(self.items)": "2", "item": "30" } },
  { code: "            print('Stack Overflow')", explanation: "Error: Cannot add to a full stack.", variables: { "self.items": "[10, 20]", "self.limit": "8", "condition": "False (2 < 8)" } },
  { code: "            return", explanation: "Stop execution.", variables: {} },
  { code: "        self.items.append(item)", explanation: "Add the item to the top of the list.", variables: { "self.items": "[10, 20, 30]", "item": "30" } },
  { code: "    def pop(self):", explanation: "Define pop to remove the top item.", variables: { "self.items": "[10, 20, 30]" } },
  { code: "        if not self.items:", explanation: "Check: Is the stack empty? (Underflow)", variables: { "self.items": "[10, 20, 30]", "is_empty": "False" } },
  { code: "            print('Stack Underflow')", explanation: "Error: Cannot remove from an empty stack.", variables: { "condition": "False (not empty)" } },
  { code: "            return", explanation: "Stop execution.", variables: {} },
  { code: "        return self.items.pop()", explanation: "Remove and return the last item added.", variables: { "self.items": "[10, 20]", "returned": "30" } },
  { code: "    def peek(self):", explanation: "Define peek to look at the top item without removing it.", variables: { "self.items": "[10, 20]" } },
  { code: "        if not self.items:", explanation: "Check if empty.", variables: { "self.items": "[10, 20]", "is_empty": "False" } },
  { code: "            return None", explanation: "Nothing to see.", variables: {} },
  { code: "        return self.items[-1]", explanation: "Return the last item (Top) safely.", variables: { "self.items": "[10, 20]", "self.items[-1]": "20" } },
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
        codeTab={
          <IntegratedCodeLab
            pythonCode={pythonCode}
            visualizer={(currentLine) => <StackCodeVisualizer currentLine={currentLine} />}
          />
        }
        gameTab={<StackVisualizer />}
      />
      <AiTutorButton />
    </>
  );
};

export default StackModule;
