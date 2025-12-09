import LearningLayout from "@/components/algoviz/LearningLayout";
import VisualConceptCanvas from "@/components/algoviz/VisualConceptCanvas";
import CodeLab from "@/components/algoviz/CodeLab";
import LinkedListVisualizer from "@/components/algoviz/LinkedListVisualizer";
import AiTutorButton from "@/components/algoviz/AiTutorButton";

const linkedListConceptNodes = [
  { id: "1", type: "start" as const, label: "Start" },
  {
    id: "2",
    type: "process" as const,
    label: "Define Node",
    description: "Container with Data + Next Pointer",
  },
  {
    id: "3",
    type: "process" as const,
    label: "Head Pointer",
    description: "Points to the very first node",
  },
  {
    id: "4",
    type: "process" as const,
    label: "Traverse",
    description: "Follow 'Next' to find the next item",
  },
  {
    id: "5",
    type: "decision" as const,
    label: "Is Next NULL?",
    description: "Check if we reached the end",
  },
  {
    id: "6",
    type: "process" as const,
    label: "Termination",
    description: "End of List (NULL reached)",
  },
  { id: "7", type: "end" as const, label: "Stop" },
];

const pythonCode = [
  { code: "class Node:", explanation: "Define the Node blueprint." },
  { code: "    def __init__(self, data):", explanation: "Initialize a Node." },
  { code: "        self.data = data", explanation: "Store the value." },
  { code: "        self.next = None", explanation: "Pointer starts as None (no connection yet)." },
  { code: "class LinkedList:", explanation: "Define the list manager." },
  { code: "    def __init__(self):", explanation: "Start with an empty list." },
  { code: "        self.head = None", explanation: "Head points to nothing." },
  { code: "    def insert_start(self, data):", explanation: "Add node to the front." },
  { code: "        new_node = Node(data)", explanation: "Create the new node." },
  { code: "        new_node.next = self.head", explanation: "Link new node to current Head." },
  { code: "        self.head = new_node", explanation: "Update Head to be the new node." },
  { code: "    def insert_end(self, data):", explanation: "Add node to the back." },
  { code: "        new_node = Node(data)", explanation: "Create the new node." },
  { code: "        if not self.head:", explanation: "Check if list is empty." },
  { code: "            self.head = new_node", explanation: "If empty, new node is Head." },
  { code: "            return", explanation: "Done." },
  { code: "        temp = self.head", explanation: "Start traversal from Head." },
  { code: "        while temp.next:", explanation: "Loop until the last node." },
  { code: "            temp = temp.next", explanation: "Move forward." },
  { code: "        temp.next = new_node", explanation: "Link the last node to the new node." },
  { code: "    def delete_start(self):", explanation: "Remove the first node." },
  { code: "        if self.head:", explanation: "Only run if list has items." },
  { code: "            self.head = self.head.next", explanation: "Move Head forward. Old head is lost." },
  { code: "    def delete_end(self):", explanation: "Remove the last node." },
  { code: "        if self.head is None:", explanation: "If empty, do nothing." },
  { code: "            return", explanation: "Stop." },
  { code: "        if self.head.next is None:", explanation: "If only one node exists..." },
  { code: "            self.head = None", explanation: "Delete it (Head becomes None)." },
  { code: "            return", explanation: "Stop." },
  { code: "        temp = self.head", explanation: "Start traversal." },
  { code: "        while temp.next.next:", explanation: "Stop at the SECOND to last node." },
  { code: "            temp = temp.next", explanation: "Move forward." },
  { code: "        temp.next = None", explanation: "Cut the link to the last node." },
];

const LinkedListModule = () => {
  return (
    <>
      <LearningLayout
        title="Singly Linked List"
        principle="A scavenger hunt where each item points to the next"
        visualTab={
          <VisualConceptCanvas
            conceptNodes={linkedListConceptNodes}
            dataStructureType="linked-list"
          />
        }
        codeTab={<CodeLab pythonCode={pythonCode} />}
        gameTab={<LinkedListVisualizer />}
      />
      <AiTutorButton />
    </>
  );
};

export default LinkedListModule;
