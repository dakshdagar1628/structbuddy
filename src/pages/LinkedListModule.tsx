import LearningLayout from "@/components/algoviz/LearningLayout";
import VisualConceptCanvas from "@/components/algoviz/VisualConceptCanvas";
import IntegratedCodeLab from "@/components/algoviz/IntegratedCodeLab";
import LinkedListCodeVisualizer from "@/components/algoviz/LinkedListCodeVisualizer";
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
  { code: "class Node:", explanation: "Define the Node blueprint.", variables: {} },
  { code: "    def __init__(self, data):", explanation: "Initialize a Node.", variables: { "data": "42" } },
  { code: "        self.data = data", explanation: "Store the value.", variables: { "self.data": "42", "data": "42" } },
  { code: "        self.next = None", explanation: "Pointer starts as None (no connection yet).", variables: { "self.data": "42", "self.next": "None" } },
  { code: "class LinkedList:", explanation: "Define the list manager.", variables: {} },
  { code: "    def __init__(self):", explanation: "Start with an empty list.", variables: {} },
  { code: "        self.head = None", explanation: "Head points to nothing.", variables: { "self.head": "None" } },
  { code: "    def insert_start(self, data):", explanation: "Add node to the front.", variables: { "self.head": "<Node 0x100>", "data": "5" } },
  { code: "        new_node = Node(data)", explanation: "Create the new node.", variables: { "data": "5", "new_node": "<Node 0x200>" } },
  { code: "        new_node.next = self.head", explanation: "Link new node to current Head.", variables: { "new_node": "<Node 0x200>", "new_node.next": "<Node 0x100>", "self.head": "<Node 0x100>" } },
  { code: "        self.head = new_node", explanation: "Update Head to be the new node.", variables: { "self.head": "<Node 0x200>", "new_node": "<Node 0x200>" } },
  { code: "    def insert_end(self, data):", explanation: "Add node to the back.", variables: { "self.head": "<Node 0x100>", "data": "42" } },
  { code: "        new_node = Node(data)", explanation: "Create the new node.", variables: { "data": "42", "new_node": "<Node 0x300>" } },
  { code: "        if not self.head:", explanation: "Check if list is empty.", variables: { "self.head": "<Node 0x100>", "is_empty": "False" } },
  { code: "            self.head = new_node", explanation: "If empty, new node is Head.", variables: {} },
  { code: "            return", explanation: "Done.", variables: {} },
  { code: "        temp = self.head", explanation: "Start traversal from Head.", variables: { "self.head": "<Node 0x100>", "temp": "<Node 0x100>" } },
  { code: "        while temp.next:", explanation: "Loop until the last node.", variables: { "temp": "<Node 0x100>", "temp.next": "<Node 0x200>" } },
  { code: "            temp = temp.next", explanation: "Move forward.", variables: { "temp (prev)": "<Node 0x100>", "temp": "<Node 0x200>" } },
  { code: "        temp.next = new_node", explanation: "Link the last node to the new node.", variables: { "temp": "<Node 0x200>", "temp.next": "<Node 0x300>", "new_node": "<Node 0x300>" } },
  { code: "    def delete_start(self):", explanation: "Remove the first node.", variables: { "self.head": "<Node 0x100>" } },
  { code: "        if self.head:", explanation: "Only run if list has items.", variables: { "self.head": "<Node 0x100>", "has_items": "True" } },
  { code: "            self.head = self.head.next", explanation: "Move Head forward. Old head is lost.", variables: { "self.head (prev)": "<Node 0x100>", "self.head": "<Node 0x200>" } },
  { code: "    def delete_end(self):", explanation: "Remove the last node.", variables: { "self.head": "<Node 0x100>" } },
  { code: "        if self.head is None:", explanation: "If empty, do nothing.", variables: { "self.head": "<Node 0x100>", "is_none": "False" } },
  { code: "            return", explanation: "Stop.", variables: {} },
  { code: "        if self.head.next is None:", explanation: "If only one node exists...", variables: { "self.head": "<Node 0x100>", "self.head.next": "<Node 0x200>" } },
  { code: "            self.head = None", explanation: "Delete it (Head becomes None).", variables: {} },
  { code: "            return", explanation: "Stop.", variables: {} },
  { code: "        temp = self.head", explanation: "Start traversal.", variables: { "self.head": "<Node 0x100>", "temp": "<Node 0x100>" } },
  { code: "        while temp.next.next:", explanation: "Stop at the SECOND to last node.", variables: { "temp": "<Node 0x100>", "temp.next": "<Node 0x200>", "temp.next.next": "<Node 0x300>" } },
  { code: "            temp = temp.next", explanation: "Move forward.", variables: { "temp (prev)": "<Node 0x100>", "temp": "<Node 0x200>" } },
  { code: "        temp.next = None", explanation: "Cut the link to the last node.", variables: { "temp": "<Node 0x200>", "temp.next": "None" } },
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
        codeTab={
          <IntegratedCodeLab
            pythonCode={pythonCode}
            visualizer={(currentLine, variables) => <LinkedListCodeVisualizer currentLine={currentLine} variables={variables} />}
          />
        }
        gameTab={<LinkedListVisualizer />}
      />
      <AiTutorButton />
    </>
  );
};

export default LinkedListModule;
