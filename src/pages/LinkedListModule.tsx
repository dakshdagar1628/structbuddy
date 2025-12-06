import LearningLayout from "@/components/algoviz/LearningLayout";
import LinkedListVisualizer from "@/components/algoviz/LinkedListVisualizer";
import AiTutorButton from "@/components/algoviz/AiTutorButton";

const linkedListConceptNodes = [
  { id: "1", type: "start" as const, label: "Start" },
  {
    id: "2",
    type: "process" as const,
    label: "Create Node",
    description: "Allocate memory for node",
  },
  {
    id: "3",
    type: "decision" as const,
    label: "Is List Empty?",
    description: "Check if head is NULL",
  },
  {
    id: "4",
    type: "process" as const,
    label: "Set as Head",
    description: "Make new node the head",
  },
  {
    id: "5",
    type: "process" as const,
    label: "Traverse List",
    description: "Find insertion point",
  },
  {
    id: "6",
    type: "process" as const,
    label: "Link Nodes",
    description: "Update next pointers",
  },
  { id: "7", type: "end" as const, label: "Stop" },
];

// Placeholder code - will be populated later
const pythonCode = [
  {
    code: "# Coming soon...",
    explanation: "Python implementation will be added in the next update.",
  },
];

const cCode = [
  {
    code: "// Coming soon...",
    explanation: "C implementation will be added in the next update.",
  },
];

const LinkedListModule = () => {
  return (
    <>
      <LearningLayout
        title="Singly Linked List"
        principle="A scavenger hunt where each item points to the next"
        visualTab={<LinkedListVisualizer />}
        codeTab={
          <div className="h-full flex items-center justify-center">
            <p className="text-muted-foreground font-mono">
              Code Lab coming soon...
            </p>
          </div>
        }
        gameTab={
          <div className="h-full flex items-center justify-center">
            <p className="text-muted-foreground font-mono">
              Game Arena coming soon...
            </p>
          </div>
        }
      />
      <AiTutorButton />
    </>
  );
};

export default LinkedListModule;
