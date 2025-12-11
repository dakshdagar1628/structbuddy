import LearningLayout from "@/components/algoviz/LearningLayout";
import VisualConceptCanvas from "@/components/algoviz/VisualConceptCanvas";
import IntegratedCodeLab, { type CodeStep } from "@/components/algoviz/IntegratedCodeLab";
import LinkedListCodeVisualizer from "@/components/algoviz/LinkedListCodeVisualizer";
import LinkedListVisualizer from "@/components/algoviz/LinkedListVisualizer";
import AiTutorButton from "@/components/algoviz/AiTutorButton";
import { Image, ListMusic } from "lucide-react";

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

const linkedListTheoryContent = {
  theory: "A chain where each item holds a map to the next one.",
  metaphorTitle: "Think of a Scavenger Hunt",
  metaphor: "You start with one clue. It tells you where to find the next clue. You keep following clues until you find the treasure (NULL).",
  examples: [
    {
      icon: Image,
      title: "Image Viewer",
      description: "The 'Next Photo' button points to the memory address of the next image."
    },
    {
      icon: ListMusic,
      title: "Music Playlist",
      description: "Each song file points to the next song to play."
    }
  ]
};

const pythonCode: CodeStep[] = [
  { 
    code: "class Node:", 
    explanation: "Define the Node blueprint - each node holds data and a pointer to the next.", 
    variables: {},
    visualState: { nodes: [], pointers: [] }
  },
  { 
    code: "    def __init__(self, data):", 
    explanation: "Initialize a Node with data value 42.", 
    variables: { "data": "42" },
    visualState: { nodes: [], pointers: [] }
  },
  { 
    code: "        self.data = data", 
    explanation: "Store the value 42 in this node's data field.", 
    variables: { "self.data": "42", "data": "42" },
    visualState: { nodes: [{ id: "n1", val: 42, next: null }], pointers: [] }
  },
  { 
    code: "        self.next = None", 
    explanation: "Set the next pointer to None (no connection yet).", 
    variables: { "self.data": "42", "self.next": "None" },
    visualState: { nodes: [{ id: "n1", val: 42, next: null }], pointers: [] }
  },
  { 
    code: "class LinkedList:", 
    explanation: "Define the LinkedList manager class.", 
    variables: {},
    visualState: { nodes: [], pointers: [] }
  },
  { 
    code: "    def __init__(self):", 
    explanation: "Initialize an empty linked list.", 
    variables: {},
    visualState: { nodes: [], pointers: [] }
  },
  { 
    code: "        self.head = None", 
    explanation: "Head pointer starts as None (empty list).", 
    variables: { "self.head": "None" },
    visualState: { nodes: [], pointers: [] }
  },
  { 
    code: "    def insert_start(self, data):", 
    explanation: "Add a new node with value 5 to the front. Current list has one node (10).", 
    variables: { "self.head": "<Node 0x100>", "data": "5" },
    visualState: { 
      nodes: [{ id: "n1", val: 10, next: null }], 
      pointers: [{ label: "head", targetId: "n1" }] 
    }
  },
  { 
    code: "        new_node = Node(data)", 
    explanation: "Create a new node containing 5.", 
    variables: { "data": "5", "new_node": "<Node 0x200>" },
    visualState: { 
      nodes: [{ id: "n2", val: 5, next: null }, { id: "n1", val: 10, next: null }], 
      pointers: [{ label: "head", targetId: "n1" }, { label: "new_node", targetId: "n2" }] 
    }
  },
  { 
    code: "        new_node.next = self.head", 
    explanation: "Link new node's next to current head (node 10).", 
    variables: { "new_node": "<Node 0x200>", "new_node.next": "<Node 0x100>", "self.head": "<Node 0x100>" },
    visualState: { 
      nodes: [{ id: "n2", val: 5, next: "n1" }, { id: "n1", val: 10, next: null }], 
      pointers: [{ label: "head", targetId: "n1" }, { label: "new_node", targetId: "n2" }] 
    }
  },
  { 
    code: "        self.head = new_node", 
    explanation: "Move head to point to the new node. Now 5 is first!", 
    variables: { "self.head": "<Node 0x200>", "new_node": "<Node 0x200>" },
    visualState: { 
      nodes: [{ id: "n2", val: 5, next: "n1" }, { id: "n1", val: 10, next: null }], 
      pointers: [{ label: "head", targetId: "n2" }] 
    }
  },
  { 
    code: "    def insert_end(self, data):", 
    explanation: "Add a node with value 42 to the end. List has [10 → 20].", 
    variables: { "self.head": "<Node 0x100>", "data": "42" },
    visualState: { 
      nodes: [{ id: "n1", val: 10, next: "n2" }, { id: "n2", val: 20, next: null }], 
      pointers: [{ label: "head", targetId: "n1" }] 
    }
  },
  { 
    code: "        new_node = Node(data)", 
    explanation: "Create a new node containing 42.", 
    variables: { "data": "42", "new_node": "<Node 0x300>" },
    visualState: { 
      nodes: [{ id: "n1", val: 10, next: "n2" }, { id: "n2", val: 20, next: null }, { id: "n3", val: 42, next: null }], 
      pointers: [{ label: "head", targetId: "n1" }, { label: "new_node", targetId: "n3" }] 
    }
  },
  { 
    code: "        if not self.head:", 
    explanation: "Is the list empty? No, head points to node 10.", 
    variables: { "self.head": "<Node 0x100>", "is_empty": "False" },
    visualState: { 
      nodes: [{ id: "n1", val: 10, next: "n2" }, { id: "n2", val: 20, next: null }, { id: "n3", val: 42, next: null }], 
      pointers: [{ label: "head", targetId: "n1" }, { label: "new_node", targetId: "n3" }] 
    }
  },
  { 
    code: "            self.head = new_node", 
    explanation: "Skipped (list is not empty).", 
    variables: {},
    visualState: { 
      nodes: [{ id: "n1", val: 10, next: "n2" }, { id: "n2", val: 20, next: null }, { id: "n3", val: 42, next: null }], 
      pointers: [{ label: "head", targetId: "n1" }, { label: "new_node", targetId: "n3" }] 
    }
  },
  { 
    code: "            return", 
    explanation: "Skipped.", 
    variables: {},
    visualState: { 
      nodes: [{ id: "n1", val: 10, next: "n2" }, { id: "n2", val: 20, next: null }, { id: "n3", val: 42, next: null }], 
      pointers: [{ label: "head", targetId: "n1" }, { label: "new_node", targetId: "n3" }] 
    }
  },
  { 
    code: "        temp = self.head", 
    explanation: "Start traversal: temp points to head (node 10).", 
    variables: { "self.head": "<Node 0x100>", "temp": "<Node 0x100>" },
    visualState: { 
      nodes: [{ id: "n1", val: 10, next: "n2" }, { id: "n2", val: 20, next: null }, { id: "n3", val: 42, next: null }], 
      pointers: [{ label: "head", targetId: "n1" }, { label: "temp", targetId: "n1" }, { label: "new_node", targetId: "n3" }] 
    }
  },
  { 
    code: "        while temp.next:", 
    explanation: "Does temp.next exist? Yes (points to node 20). Continue loop.", 
    variables: { "temp": "<Node 0x100>", "temp.next": "<Node 0x200>" },
    visualState: { 
      nodes: [{ id: "n1", val: 10, next: "n2" }, { id: "n2", val: 20, next: null }, { id: "n3", val: 42, next: null }], 
      pointers: [{ label: "head", targetId: "n1" }, { label: "temp", targetId: "n1" }, { label: "new_node", targetId: "n3" }] 
    }
  },
  { 
    code: "            temp = temp.next", 
    explanation: "Move temp forward to node 20.", 
    variables: { "temp (prev)": "<Node 0x100>", "temp": "<Node 0x200>" },
    visualState: { 
      nodes: [{ id: "n1", val: 10, next: "n2" }, { id: "n2", val: 20, next: null }, { id: "n3", val: 42, next: null }], 
      pointers: [{ label: "head", targetId: "n1" }, { label: "temp", targetId: "n2" }, { label: "new_node", targetId: "n3" }] 
    }
  },
  { 
    code: "        temp.next = new_node", 
    explanation: "Link the last node (20) to the new node (42). List is now [10 → 20 → 42].", 
    variables: { "temp": "<Node 0x200>", "temp.next": "<Node 0x300>", "new_node": "<Node 0x300>" },
    visualState: { 
      nodes: [{ id: "n1", val: 10, next: "n2" }, { id: "n2", val: 20, next: "n3" }, { id: "n3", val: 42, next: null }], 
      pointers: [{ label: "head", targetId: "n1" }, { label: "temp", targetId: "n2" }] 
    }
  },
  { 
    code: "    def delete_start(self):", 
    explanation: "Remove the first node. List has [10 → 20 → 42].", 
    variables: { "self.head": "<Node 0x100>" },
    visualState: { 
      nodes: [{ id: "n1", val: 10, next: "n2" }, { id: "n2", val: 20, next: "n3" }, { id: "n3", val: 42, next: null }], 
      pointers: [{ label: "head", targetId: "n1" }] 
    }
  },
  { 
    code: "        if self.head:", 
    explanation: "Does head exist? Yes, it points to node 10.", 
    variables: { "self.head": "<Node 0x100>", "has_items": "True" },
    visualState: { 
      nodes: [{ id: "n1", val: 10, next: "n2" }, { id: "n2", val: 20, next: "n3" }, { id: "n3", val: 42, next: null }], 
      pointers: [{ label: "head", targetId: "n1" }] 
    }
  },
  { 
    code: "            self.head = self.head.next", 
    explanation: "Move head to node 20. Node 10 is now unreachable (deleted). List: [20 → 42].", 
    variables: { "self.head (prev)": "<Node 0x100>", "self.head": "<Node 0x200>" },
    visualState: { 
      nodes: [{ id: "n2", val: 20, next: "n3" }, { id: "n3", val: 42, next: null }], 
      pointers: [{ label: "head", targetId: "n2" }] 
    }
  },
  { 
    code: "    def delete_end(self):", 
    explanation: "Remove the last node. List has [10 → 20 → 42].", 
    variables: { "self.head": "<Node 0x100>" },
    visualState: { 
      nodes: [{ id: "n1", val: 10, next: "n2" }, { id: "n2", val: 20, next: "n3" }, { id: "n3", val: 42, next: null }], 
      pointers: [{ label: "head", targetId: "n1" }] 
    }
  },
  { 
    code: "        if self.head is None:", 
    explanation: "Is head None (empty list)? No, head exists.", 
    variables: { "self.head": "<Node 0x100>", "is_none": "False" },
    visualState: { 
      nodes: [{ id: "n1", val: 10, next: "n2" }, { id: "n2", val: 20, next: "n3" }, { id: "n3", val: 42, next: null }], 
      pointers: [{ label: "head", targetId: "n1" }] 
    }
  },
  { 
    code: "            return", 
    explanation: "Skipped (list is not empty).", 
    variables: {},
    visualState: { 
      nodes: [{ id: "n1", val: 10, next: "n2" }, { id: "n2", val: 20, next: "n3" }, { id: "n3", val: 42, next: null }], 
      pointers: [{ label: "head", targetId: "n1" }] 
    }
  },
  { 
    code: "        if self.head.next is None:", 
    explanation: "Is there only one node? No, head.next points to node 20.", 
    variables: { "self.head": "<Node 0x100>", "self.head.next": "<Node 0x200>" },
    visualState: { 
      nodes: [{ id: "n1", val: 10, next: "n2" }, { id: "n2", val: 20, next: "n3" }, { id: "n3", val: 42, next: null }], 
      pointers: [{ label: "head", targetId: "n1" }] 
    }
  },
  { 
    code: "            self.head = None", 
    explanation: "Skipped (more than one node).", 
    variables: {},
    visualState: { 
      nodes: [{ id: "n1", val: 10, next: "n2" }, { id: "n2", val: 20, next: "n3" }, { id: "n3", val: 42, next: null }], 
      pointers: [{ label: "head", targetId: "n1" }] 
    }
  },
  { 
    code: "            return", 
    explanation: "Skipped.", 
    variables: {},
    visualState: { 
      nodes: [{ id: "n1", val: 10, next: "n2" }, { id: "n2", val: 20, next: "n3" }, { id: "n3", val: 42, next: null }], 
      pointers: [{ label: "head", targetId: "n1" }] 
    }
  },
  { 
    code: "        temp = self.head", 
    explanation: "Start traversal: temp points to head (node 10).", 
    variables: { "self.head": "<Node 0x100>", "temp": "<Node 0x100>" },
    visualState: { 
      nodes: [{ id: "n1", val: 10, next: "n2" }, { id: "n2", val: 20, next: "n3" }, { id: "n3", val: 42, next: null }], 
      pointers: [{ label: "head", targetId: "n1" }, { label: "temp", targetId: "n1" }] 
    }
  },
  { 
    code: "        while temp.next.next:", 
    explanation: "Does temp.next.next exist? temp(10).next(20).next(42) = Yes. Continue.", 
    variables: { "temp": "<Node 0x100>", "temp.next": "<Node 0x200>", "temp.next.next": "<Node 0x300>" },
    visualState: { 
      nodes: [{ id: "n1", val: 10, next: "n2" }, { id: "n2", val: 20, next: "n3" }, { id: "n3", val: 42, next: null }], 
      pointers: [{ label: "head", targetId: "n1" }, { label: "temp", targetId: "n1" }] 
    }
  },
  { 
    code: "            temp = temp.next", 
    explanation: "Move temp to node 20 (second-to-last).", 
    variables: { "temp (prev)": "<Node 0x100>", "temp": "<Node 0x200>" },
    visualState: { 
      nodes: [{ id: "n1", val: 10, next: "n2" }, { id: "n2", val: 20, next: "n3" }, { id: "n3", val: 42, next: null }], 
      pointers: [{ label: "head", targetId: "n1" }, { label: "temp", targetId: "n2" }] 
    }
  },
  { 
    code: "        temp.next = None", 
    explanation: "Cut the link to node 42. List is now [10 → 20].", 
    variables: { "temp": "<Node 0x200>", "temp.next": "None" },
    visualState: { 
      nodes: [{ id: "n1", val: 10, next: "n2" }, { id: "n2", val: 20, next: null }], 
      pointers: [{ label: "head", targetId: "n1" }, { label: "temp", targetId: "n2" }] 
    }
  },
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
            theoryContent={linkedListTheoryContent}
          />
        }
        codeTab={
          <IntegratedCodeLab
            pythonCode={pythonCode}
            visualizer={(visualState) => <LinkedListCodeVisualizer visualState={visualState} />}
          />
        }
        gameTab={<LinkedListVisualizer />}
      />
      <AiTutorButton />
    </>
  );
};

export default LinkedListModule;
