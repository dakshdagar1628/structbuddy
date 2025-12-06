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
  {
    code: "class Node:",
    explanation: "We define the blueprint for a Node - a container for our data.",
  },
  {
    code: "    def __init__(self, data):",
    explanation: "Constructor method that runs when we create a new Node.",
  },
  {
    code: "        self.data = data",
    explanation: "Store the actual value inside the node.",
  },
  {
    code: "        self.next = None",
    explanation: "Initially, this node doesn't point to anything (None).",
  },
  { code: "", explanation: "" },
  {
    code: "class LinkedList:",
    explanation: "We define the LinkedList class to manage our chain of nodes.",
  },
  {
    code: "    def __init__(self):",
    explanation: "Constructor for an empty linked list.",
  },
  {
    code: "        self.head = None",
    explanation: "We start with an empty list - Head points to nothing.",
  },
  { code: "", explanation: "" },
  {
    code: "    def insert_start(self, data):",
    explanation: "Method to add a new node at the very beginning.",
  },
  {
    code: "        new_node = Node(data)",
    explanation: "Create a brand new node with the given data.",
  },
  {
    code: "        new_node.next = self.head",
    explanation: "Critical Step: New node points to the current first node.",
  },
  {
    code: "        self.head = new_node",
    explanation: "Update Head: The new node becomes the starting point.",
  },
  { code: "", explanation: "" },
  {
    code: "    def insert_end(self, data):",
    explanation: "Method to add a new node at the very end.",
  },
  {
    code: "        new_node = Node(data)",
    explanation: "Create the new node.",
  },
  {
    code: "        if self.head is None:",
    explanation: "Check: Is the list currently empty?",
  },
  {
    code: "            self.head = new_node",
    explanation: "If empty, this new node becomes the Head.",
  },
  {
    code: "            return",
    explanation: "We are done.",
  },
  {
    code: "        temp = self.head",
    explanation: "Traversal: Create a temporary pointer starting at Head.",
  },
  {
    code: "        while temp.next:",
    explanation: "Loop: Keep moving forward until we find the last node.",
  },
  {
    code: "            temp = temp.next",
    explanation: "Move to the next node.",
  },
  {
    code: "        temp.next = new_node",
    explanation: "Link the old last node to our new node.",
  },
  { code: "", explanation: "" },
  {
    code: "    def delete_start(self):",
    explanation: "Method to remove the first node.",
  },
  {
    code: "        if self.head is None:",
    explanation: "Safety: If list is empty, do nothing.",
  },
  {
    code: "            return",
    explanation: "Exit the method.",
  },
  {
    code: "        self.head = self.head.next",
    explanation: "Move the Head pointer to the second node (old first is gone).",
  },
];

const cCode = [
  {
    code: "struct Node { int data; struct Node* next; };",
    explanation: "We define the 'blueprint' for a Node. It has two parts: Data and a Pointer to the next node.",
  },
  {
    code: "struct Node* head = NULL;",
    explanation: "We start with an empty list. The Head points to nothing (NULL).",
  },
  { code: "", explanation: "" },
  {
    code: "void insertStart(int value) {",
    explanation: "Function to add a new node at the very beginning.",
  },
  {
    code: "    struct Node* newNode = malloc(sizeof(struct Node));",
    explanation: "We ask the computer for memory to create a brand new node.",
  },
  {
    code: "    newNode->data = value;",
    explanation: "We put the value (e.g., 10) inside the node.",
  },
  {
    code: "    newNode->next = head;",
    explanation: "Critical Step: We make the New Node point to the current first node.",
  },
  {
    code: "    head = newNode;",
    explanation: "Update Head: The New Node becomes the starting point of the list.",
  },
  {
    code: "}",
    explanation: "End of insertStart.",
  },
  { code: "", explanation: "" },
  {
    code: "void insertEnd(int value) {",
    explanation: "Function to add a new node at the very end.",
  },
  {
    code: "    struct Node* newNode = malloc(sizeof(struct Node));",
    explanation: "Create the new node in memory.",
  },
  {
    code: "    newNode->data = value;",
    explanation: "Set the data.",
  },
  {
    code: "    newNode->next = NULL;",
    explanation: "Since it will be last, it points to NULL (Nothing).",
  },
  {
    code: "    if (head == NULL) {",
    explanation: "Check: Is the list currently empty?",
  },
  {
    code: "        head = newNode;",
    explanation: "If empty, this new node becomes the Head.",
  },
  {
    code: "        return;",
    explanation: "We are done.",
  },
  {
    code: "    }",
    explanation: "End check.",
  },
  {
    code: "    struct Node* temp = head;",
    explanation: "Traversal: Create a temporary pointer starting at Head.",
  },
  {
    code: "    while (temp->next != NULL) {",
    explanation: "Loop: Keep moving forward until we find the last node.",
  },
  {
    code: "        temp = temp->next;",
    explanation: "Move to the next node.",
  },
  {
    code: "    }",
    explanation: "Stop when we reach the end.",
  },
  {
    code: "    temp->next = newNode;",
    explanation: "Link the old last node to our New Node.",
  },
  {
    code: "}",
    explanation: "End insertEnd.",
  },
  { code: "", explanation: "" },
  {
    code: "void deleteStart() {",
    explanation: "Function to remove the first node.",
  },
  {
    code: "    if (head == NULL) return;",
    explanation: "Safety: If list is empty, do nothing.",
  },
  {
    code: "    struct Node* temp = head;",
    explanation: "Save the current Head node so we can free it later.",
  },
  {
    code: "    head = head->next;",
    explanation: "Move the Head pointer to the second node.",
  },
  {
    code: "    free(temp);",
    explanation: "Delete the old Head node from memory.",
  },
  {
    code: "}",
    explanation: "End deleteStart.",
  },
  { code: "", explanation: "" },
  {
    code: "void deleteEnd() {",
    explanation: "Define function to remove the last node.",
  },
  {
    code: "    if (head == NULL) return;",
    explanation: "Safety: If list is empty, stop.",
  },
  {
    code: "    if (head->next == NULL) {",
    explanation: "Special Case: If there is only one node...",
  },
  {
    code: "        free(head);",
    explanation: "Delete the head.",
  },
  {
    code: "        head = NULL;",
    explanation: "Set head to NULL.",
  },
  {
    code: "        return;",
    explanation: "Exit function.",
  },
  {
    code: "    }",
    explanation: "End special case.",
  },
  {
    code: "    struct Node* temp = head;",
    explanation: "Traversal: Start from the head.",
  },
  {
    code: "    while (temp->next->next != NULL) {",
    explanation: "Loop: Stop at the SECOND to last node.",
  },
  {
    code: "        temp = temp->next;",
    explanation: "Move forward.",
  },
  {
    code: "    }",
    explanation: "Loop ends.",
  },
  {
    code: "    free(temp->next);",
    explanation: "Delete the actual last node.",
  },
  {
    code: "    temp->next = NULL;",
    explanation: "Update: This node is now the new end (NULL).",
  },
  {
    code: "}",
    explanation: "End deleteEnd.",
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
          />
        }
        codeTab={<CodeLab pythonCode={pythonCode} cCode={cCode} />}
        gameTab={<LinkedListVisualizer />}
      />
      <AiTutorButton />
    </>
  );
};

export default LinkedListModule;
