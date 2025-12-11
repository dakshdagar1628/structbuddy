import LearningLayout from "@/components/algoviz/LearningLayout";
import VisualConceptCanvas from "@/components/algoviz/VisualConceptCanvas";
import IntegratedCodeLab, { type CodeStep } from "@/components/algoviz/IntegratedCodeLab";
import DoublyLinkedListCodeVisualizer from "@/components/algoviz/DoublyLinkedListCodeVisualizer";
import DoublyLinkedListVisualizer from "@/components/algoviz/DoublyLinkedListVisualizer";
import AiTutorButton from "@/components/algoviz/AiTutorButton";
import { ArrowLeftRight, Type } from "lucide-react";

// Extended visual state for doubly linked list
interface DoublyNode {
  id: string;
  val: number | string;
  next: string | null;
  prev: string | null;
}

const doublyLinkedListConceptNodes = [
  { id: "1", type: "start" as const, label: "Start" },
  {
    id: "2",
    type: "process" as const,
    label: "Define Node",
    description: "Container with Data + Next + Prev Pointers",
  },
  {
    id: "3",
    type: "process" as const,
    label: "Head & Tail",
    description: "Track both ends of the list",
  },
  {
    id: "4",
    type: "process" as const,
    label: "Traversal",
    description: "Move forward OR backward through nodes",
  },
  {
    id: "5",
    type: "decision" as const,
    label: "Check NULL",
    description: "prev=NULL at head, next=NULL at tail",
  },
  {
    id: "6",
    type: "process" as const,
    label: "Termination",
    description: "End reached (NULL pointer)",
  },
  { id: "7", type: "end" as const, label: "Stop" },
];

const doublyLinkedListTheoryContent = {
  theory: "A two-way street. Navigate forward or backward.",
  metaphorTitle: "Think of a Train",
  metaphor: "You can walk from the engine to the caboose (Next), or from the caboose back to the engine (Prev).",
  examples: [
    {
      icon: ArrowLeftRight,
      title: "Browser Navigation",
      description: "You can go 'Back' AND 'Forward' through your history."
    },
    {
      icon: Type,
      title: "Text Editor Cursor",
      description: "You can move the cursor left or right through the text."
    }
  ]
};

const pythonCode: CodeStep[] = [
  // Node class definition
  { 
    code: "class Node:", 
    explanation: "We define a blueprint for a Node. In a Doubly Linked List, each node has THREE parts: data, a 'next' pointer, and a 'prev' pointer.", 
    variables: {},
    visualState: { nodes: [], pointers: [] }
  },
  { 
    code: "    def __init__(self, data):", 
    explanation: "This is the constructor. When we create a new node with value 10, this function runs to set up the node.", 
    variables: { "data": "10" },
    visualState: { nodes: [], pointers: [] }
  },
  { 
    code: "        self.data = data", 
    explanation: "Store the value 10 in this node's 'data' field. This is the actual information the node holds.", 
    variables: { "self.data": "10", "data": "10" },
    visualState: { 
      nodes: [{ id: "n1", val: 10, next: null, prev: null }], 
      pointers: [] 
    }
  },
  { 
    code: "        self.next = None", 
    explanation: "Set the 'next' pointer to None. Right now, this node doesn't know about any node after it.", 
    variables: { "self.data": "10", "self.next": "None" },
    visualState: { 
      nodes: [{ id: "n1", val: 10, next: null, prev: null }], 
      pointers: [] 
    }
  },
  { 
    code: "        self.prev = None", 
    explanation: "Set the 'prev' pointer to None. Right now, this node doesn't know about any node before it.", 
    variables: { "self.data": "10", "self.next": "None", "self.prev": "None" },
    visualState: { 
      nodes: [{ id: "n1", val: 10, next: null, prev: null }], 
      pointers: [] 
    }
  },

  // DoublyLinkedList class definition
  { 
    code: "class DoublyLinkedList:", 
    explanation: "Now we create the DoublyLinkedList manager class. It will keep track of the 'head' (first node) and 'tail' (last node).", 
    variables: {},
    visualState: { nodes: [], pointers: [] }
  },
  { 
    code: "    def __init__(self):", 
    explanation: "Initialize an empty doubly linked list.", 
    variables: {},
    visualState: { nodes: [], pointers: [] }
  },
  { 
    code: "        self.head = None", 
    explanation: "Head pointer starts as None because the list is empty. No first node exists yet.", 
    variables: { "self.head": "None" },
    visualState: { nodes: [], pointers: [] }
  },
  { 
    code: "        self.tail = None", 
    explanation: "Tail pointer also starts as None. No last node exists yet. Both head and tail point to nothing.", 
    variables: { "self.head": "None", "self.tail": "None" },
    visualState: { nodes: [], pointers: [] }
  },

  // insert_end method - first insertion (empty list)
  { 
    code: "    def insert_end(self, data):", 
    explanation: "Let's add a node with value 10 to the end. Since the list is empty, this will be both the first AND last node.", 
    variables: { "data": "10", "self.head": "None", "self.tail": "None" },
    visualState: { nodes: [], pointers: [] }
  },
  { 
    code: "        new_node = Node(data)", 
    explanation: "Create a brand new node containing 10. It's floating in memory, not connected to anything yet.", 
    variables: { "data": "10", "new_node": "<Node 0x1A>" },
    visualState: { 
      nodes: [{ id: "n1", val: 10, next: null, prev: null }], 
      pointers: [{ label: "new_node", targetId: "n1" }],
      action: 'add' as const
    }
  },
  { 
    code: "        if not self.head:", 
    explanation: "Is the list empty? YES! head is None, so this condition is TRUE. We'll make this node both head and tail.", 
    variables: { "self.head": "None", "is_empty": "TRUE" },
    visualState: { 
      nodes: [{ id: "n1", val: 10, next: null, prev: null }], 
      pointers: [{ label: "new_node", targetId: "n1" }],
      action: 'read' as const
    }
  },
  { 
    code: "            self.head = new_node", 
    explanation: "Point head to our new node. Now we have a first node in the list!", 
    variables: { "self.head": "<Node 0x1A>", "new_node": "<Node 0x1A>" },
    visualState: { 
      nodes: [{ id: "n1", val: 10, next: null, prev: null }], 
      pointers: [{ label: "head", targetId: "n1" }, { label: "new_node", targetId: "n1" }],
      action: 'add' as const
    }
  },
  { 
    code: "            self.tail = new_node", 
    explanation: "Point tail to the same node. Since there's only one node, it's both the first AND the last!", 
    variables: { "self.head": "<Node 0x1A>", "self.tail": "<Node 0x1A>" },
    visualState: { 
      nodes: [{ id: "n1", val: 10, next: null, prev: null }], 
      pointers: [{ label: "head", targetId: "n1" }, { label: "tail", targetId: "n1" }],
      action: 'add' as const
    }
  },
  { 
    code: "            return", 
    explanation: "We're done! The list now has one node [10] with both head and tail pointing to it.", 
    variables: { "self.head": "<Node 0x1A>", "self.tail": "<Node 0x1A>" },
    visualState: { 
      nodes: [{ id: "n1", val: 10, next: null, prev: null }], 
      pointers: [{ label: "head", targetId: "n1" }, { label: "tail", targetId: "n1" }]
    }
  },

  // insert_end - adding second node (GRANULAR STEPS)
  { 
    code: "    def insert_end(self, data):", 
    explanation: "Now let's add value 20 to the end. The list currently has [10]. Watch carefully as we link the new node step-by-step.", 
    variables: { "data": "20", "self.head": "<Node 0x1A>", "self.tail": "<Node 0x1A>" },
    visualState: { 
      nodes: [{ id: "n1", val: 10, next: null, prev: null }], 
      pointers: [{ label: "head", targetId: "n1" }, { label: "tail", targetId: "n1" }]
    }
  },
  { 
    code: "        new_node = Node(data)", 
    explanation: "Create a brand new node with value 20. Look! It appears as a FLOATING node on the right - completely disconnected from our list.", 
    variables: { "data": "20", "new_node": "<Node 0x34>", "new_node.prev": "None", "new_node.next": "None" },
    visualState: { 
      nodes: [
        { id: "n1", val: 10, next: null, prev: null },
        { id: "n2", val: "20 ✨", next: null, prev: null }
      ], 
      pointers: [{ label: "head", targetId: "n1" }, { label: "tail", targetId: "n1" }, { label: "new_node", targetId: "n2" }],
      action: 'add' as const
    }
  },
  { 
    code: "        if not self.head:", 
    explanation: "Is the list empty? Check head → it points to node 10, so NOT empty. Condition is FALSE. We skip the 'if' block and continue to link the nodes.", 
    variables: { "self.head": "<Node 0x1A>", "condition": "FALSE" },
    visualState: { 
      nodes: [
        { id: "n1", val: 10, next: null, prev: null },
        { id: "n2", val: 20, next: null, prev: null }
      ], 
      pointers: [{ label: "head", targetId: "n1" }, { label: "tail", targetId: "n1" }, { label: "new_node", targetId: "n2" }],
      action: 'read' as const
    }
  },
  { 
    code: "        self.tail.next = new_node", 
    explanation: "FORWARD LINK! Draw an arrow from the OLD tail (node 10) → to NEW node (20). The 'next' pointer of node 10 now holds address 0x34!", 
    variables: { "self.tail": "<Node 0x1A>", "self.tail.next": "<Node 0x34> ⚡" },
    visualState: { 
      nodes: [
        { id: "n1", val: 10, next: "n2", prev: null },
        { id: "n2", val: 20, next: null, prev: null }
      ], 
      pointers: [{ label: "head", targetId: "n1" }, { label: "tail", targetId: "n1" }, { label: "new_node", targetId: "n2" }],
      action: 'add' as const
    }
  },
  { 
    code: "        new_node.prev = self.tail", 
    explanation: "BACKWARD LINK! Now draw the arrow going backwards: NEW node (20) → points back to OLD tail (10). The two-way connection is complete!", 
    variables: { "new_node": "<Node 0x34>", "new_node.prev": "<Node 0x1A> ⚡" },
    visualState: { 
      nodes: [
        { id: "n1", val: 10, next: "n2", prev: null },
        { id: "n2", val: 20, next: null, prev: "n1" }
      ], 
      pointers: [{ label: "head", targetId: "n1" }, { label: "tail", targetId: "n1" }, { label: "new_node", targetId: "n2" }],
      action: 'add' as const
    }
  },
  { 
    code: "        self.tail = new_node", 
    explanation: "MOVE THE TAIL! Watch the 'tail' label slide from node 10 to node 20. Node 20 is now officially the LAST node in our list!", 
    variables: { "self.tail (before)": "<Node 0x1A>", "self.tail (after)": "<Node 0x34> ⚡" },
    visualState: { 
      nodes: [
        { id: "n1", val: 10, next: "n2", prev: null },
        { id: "n2", val: 20, next: null, prev: "n1" }
      ], 
      pointers: [{ label: "head", targetId: "n1" }, { label: "tail", targetId: "n2" }],
      action: 'add' as const
    }
  },

  // delete_end method
  { 
    code: "    def delete_end(self):", 
    explanation: "Now let's remove the last node. Our list is [10 ↔ 20]. We'll remove 20.", 
    variables: { "self.head": "<Node 0x1A>", "self.tail": "<Node 0x34>" },
    visualState: { 
      nodes: [
        { id: "n1", val: 10, next: "n2", prev: null },
        { id: "n2", val: 20, next: null, prev: "n1" }
      ], 
      pointers: [{ label: "head", targetId: "n1" }, { label: "tail", targetId: "n2" }]
    }
  },
  { 
    code: "        if not self.tail:", 
    explanation: "Is the list empty? NO! tail points to node 20. Nothing to delete from empty list, but we're not empty.", 
    variables: { "self.tail": "<Node 0x34>", "is_empty": "FALSE" },
    visualState: { 
      nodes: [
        { id: "n1", val: 10, next: "n2", prev: null },
        { id: "n2", val: 20, next: null, prev: "n1" }
      ], 
      pointers: [{ label: "head", targetId: "n1" }, { label: "tail", targetId: "n2" }],
      action: 'read' as const
    }
  },
  { 
    code: "            return", 
    explanation: "Skipped - the list is not empty.", 
    variables: {},
    visualState: { 
      nodes: [
        { id: "n1", val: 10, next: "n2", prev: null },
        { id: "n2", val: 20, next: null, prev: "n1" }
      ], 
      pointers: [{ label: "head", targetId: "n1" }, { label: "tail", targetId: "n2" }]
    }
  },
  { 
    code: "        if self.head == self.tail:", 
    explanation: "Is there only one node? NO! head (10) is not the same as tail (20). We have more than one node.", 
    variables: { "self.head": "<Node 0x1A>", "self.tail": "<Node 0x34>", "single_node": "FALSE" },
    visualState: { 
      nodes: [
        { id: "n1", val: 10, next: "n2", prev: null },
        { id: "n2", val: 20, next: null, prev: "n1" }
      ], 
      pointers: [{ label: "head", targetId: "n1" }, { label: "tail", targetId: "n2" }],
      action: 'read' as const
    }
  },
  { 
    code: "            self.head = None", 
    explanation: "Skipped - we have more than one node.", 
    variables: {},
    visualState: { 
      nodes: [
        { id: "n1", val: 10, next: "n2", prev: null },
        { id: "n2", val: 20, next: null, prev: "n1" }
      ], 
      pointers: [{ label: "head", targetId: "n1" }, { label: "tail", targetId: "n2" }]
    }
  },
  { 
    code: "            self.tail = None", 
    explanation: "Skipped - we have more than one node.", 
    variables: {},
    visualState: { 
      nodes: [
        { id: "n1", val: 10, next: "n2", prev: null },
        { id: "n2", val: 20, next: null, prev: "n1" }
      ], 
      pointers: [{ label: "head", targetId: "n1" }, { label: "tail", targetId: "n2" }]
    }
  },
  { 
    code: "            return", 
    explanation: "Skipped.", 
    variables: {},
    visualState: { 
      nodes: [
        { id: "n1", val: 10, next: "n2", prev: null },
        { id: "n2", val: 20, next: null, prev: "n1" }
      ], 
      pointers: [{ label: "head", targetId: "n1" }, { label: "tail", targetId: "n2" }]
    }
  },
  { 
    code: "        self.tail = self.tail.prev", 
    explanation: "Move tail backwards! tail.prev points to node 10, so tail now points to 10. This 'disconnects' node 20.", 
    variables: { "self.tail (prev)": "<Node 0x34>", "self.tail": "<Node 0x1A>" },
    visualState: { 
      nodes: [
        { id: "n1", val: 10, next: "n2", prev: null },
        { id: "n2", val: 20, next: null, prev: "n1" }
      ], 
      pointers: [{ label: "head", targetId: "n1" }, { label: "tail", targetId: "n1" }],
      action: 'remove' as const
    }
  },
  { 
    code: "        self.tail.next = None", 
    explanation: "Cut the forward link! Node 10's 'next' is now None. Node 20 is completely unreachable and will be garbage collected.", 
    variables: { "self.tail": "<Node 0x1A>", "self.tail.next": "None" },
    visualState: { 
      nodes: [
        { id: "n1", val: 10, next: null, prev: null }
      ], 
      pointers: [{ label: "head", targetId: "n1" }, { label: "tail", targetId: "n1" }],
      action: 'remove' as const
    }
  },

  // Final state
  { 
    code: "# List: [10]", 
    explanation: "Done! The list now has only [10]. Both head and tail point to this single node. The doubly linked list operations are complete!", 
    variables: { "self.head": "<Node 0x1A>", "self.tail": "<Node 0x1A>", "list": "[10]" },
    visualState: { 
      nodes: [
        { id: "n1", val: 10, next: null, prev: null }
      ], 
      pointers: [{ label: "head", targetId: "n1" }, { label: "tail", targetId: "n1" }]
    }
  },
];

const DoublyLinkedListModule = () => {
  return (
    <>
      <LearningLayout
        title="Doubly Linked List"
        principle="A two-way street where every node knows its neighbors"
        visualTab={
          <VisualConceptCanvas
            conceptNodes={doublyLinkedListConceptNodes}
            dataStructureType="linked-list"
            theoryContent={doublyLinkedListTheoryContent}
          />
        }
        codeTab={
          <IntegratedCodeLab
            pythonCode={pythonCode}
            visualizer={(visualState) => <DoublyLinkedListCodeVisualizer visualState={visualState} />}
          />
        }
        gameTab={<DoublyLinkedListVisualizer />}
      />
      <AiTutorButton />
    </>
  );
};

export default DoublyLinkedListModule;
