import LearningLayout from "@/components/algoviz/LearningLayout";
import VisualConceptCanvas from "@/components/algoviz/VisualConceptCanvas";
import IntegratedCodeLab from "@/components/algoviz/IntegratedCodeLab";
import QueueCodeVisualizer from "@/components/algoviz/QueueCodeVisualizer";
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
  { code: "class Queue:", explanation: "Define a Queue class." },
  { code: "    def __init__(self, limit=8):", explanation: "Initialize with a limit of 8 items." },
  { code: "        self.items = []", explanation: "Create an empty list for the queue." },
  { code: "        self.limit = limit", explanation: "Store the limit." },
  { code: "    def enqueue(self, item):", explanation: "Define enqueue to add to the Rear." },
  { code: "        if len(self.items) >= self.limit:", explanation: "Check: Is the queue full? (Overflow)" },
  { code: "            print('Queue Overflow')", explanation: "Error: Cannot add more items." },
  { code: "            return", explanation: "Stop." },
  { code: "        self.items.append(item)", explanation: "Add the new item to the end of the list." },
  { code: "    def dequeue(self):", explanation: "Define dequeue to remove from the Front." },
  { code: "        if not self.items:", explanation: "Check: Is the queue empty? (Underflow)" },
  { code: "            print('Queue Underflow')", explanation: "Error: Nothing to remove." },
  { code: "            return", explanation: "Stop." },
  { code: "        return self.items.pop(0)", explanation: "Remove the FIRST item (index 0)." },
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
        codeTab={
          <IntegratedCodeLab
            pythonCode={pythonCode}
            visualizer={(currentLine) => <QueueCodeVisualizer currentLine={currentLine} />}
          />
        }
        gameTab={<QueueVisualizer />}
      />
      <AiTutorButton />
    </>
  );
};

export default QueueModule;
