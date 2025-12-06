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
  { code: "class Node:", explanation: "Define the Node class to store data and the link." },
  { code: "    def __init__(self, data):", explanation: "Initialize the Node." },
  { code: "        self.data = data", explanation: "Store the value." },
  { code: "        self.next = None", explanation: "Set the next pointer to None initially." },
  { code: "class LinkedList:", explanation: "Define the main Linked List class." },
  { code: "    def __init__(self):", explanation: "Initialize the list." },
  { code: "        self.head = None", explanation: "Start with an empty list (Head is None)." },
  { code: "    def insert_start(self, data):", explanation: "Function to add node at the beginning." },
  { code: "        new_node = Node(data)", explanation: "Create a new node." },
  { code: "        new_node.next = self.head", explanation: "Point new node to the current head." },
  { code: "        self.head = new_node", explanation: "Update head to be the new node." },
  { code: "    def insert_end(self, data):", explanation: "Function to add node at the end." },
  { code: "        new_node = Node(data)", explanation: "Create a new node." },
  { code: "        if not self.head:", explanation: "Check if list is empty." },
  { code: "            self.head = new_node", explanation: "If empty, new node becomes Head." },
  { code: "            return", explanation: "Done." },
  { code: "        temp = self.head", explanation: "Start traversal from Head." },
  { code: "        while temp.next:", explanation: "Loop until the last node." },
  { code: "            temp = temp.next", explanation: "Move to next node." },
  { code: "        temp.next = new_node", explanation: "Link the last node to the new node." },
  { code: "    def delete_start(self):", explanation: "Function to remove the first node." },
  { code: "        if self.head:", explanation: "Only delete if list is not empty." },
  { code: "            self.head = self.head.next", explanation: "Move head to the second node." },
  { code: "    def delete_end(self):", explanation: "Function to remove the last node." },
  { code: "        if self.head is None:", explanation: "If list is empty, do nothing." },
  { code: "            return", explanation: "Exit." },
  { code: "        if self.head.next is None:", explanation: "If only one node exists..." },
  { code: "            self.head = None", explanation: "Remove it (Set head to None)." },
  { code: "            return", explanation: "Exit." },
  { code: "        temp = self.head", explanation: "Start traversal." },
  { code: "        while temp.next.next:", explanation: "Stop at the SECOND to last node." },
  { code: "            temp = temp.next", explanation: "Move forward." },
  { code: "        temp.next = None", explanation: "Remove the link to the last node." },
];

const cCode = [
  { code: "struct Node { int data; struct Node* next; };", explanation: "Define the Node structure." },
  { code: "struct Node* head = NULL;", explanation: "Initialize Head as NULL (Empty)." },
  { code: "void insertStart(int value) {", explanation: "Function to insert at start." },
  { code: "    struct Node* newNode = malloc(sizeof(struct Node));", explanation: "Allocate memory for new node." },
  { code: "    newNode->data = value;", explanation: "Assign value." },
  { code: "    newNode->next = head;", explanation: "Link new node to current head." },
  { code: "    head = newNode;", explanation: "Update head pointer." },
  { code: "}", explanation: "End insertStart." },
  { code: "void insertEnd(int value) {", explanation: "Function to insert at end." },
  { code: "    struct Node* newNode = malloc(sizeof(struct Node));", explanation: "Allocate memory." },
  { code: "    newNode->data = value;", explanation: "Assign value." },
  { code: "    newNode->next = NULL;", explanation: "Next is NULL (it will be last)." },
  { code: "    if (head == NULL) {", explanation: "If list is empty..." },
  { code: "        head = newNode;", explanation: "New node becomes head." },
  { code: "        return;", explanation: "Exit." },
  { code: "    }", explanation: "End check." },
  { code: "    struct Node* temp = head;", explanation: "Start traversal." },
  { code: "    while (temp->next != NULL) {", explanation: "Find the last node." },
  { code: "        temp = temp->next;", explanation: "Move next." },
  { code: "    }", explanation: "End loop." },
  { code: "    temp->next = newNode;", explanation: "Link last node to new node." },
  { code: "}", explanation: "End insertEnd." },
  { code: "void deleteStart() {", explanation: "Function to delete first node." },
  { code: "    if (head == NULL) return;", explanation: "If empty, stop." },
  { code: "    struct Node* temp = head;", explanation: "Save current head." },
  { code: "    head = head->next;", explanation: "Move head forward." },
  { code: "    free(temp);", explanation: "Free memory." },
  { code: "}", explanation: "End deleteStart." },
  { code: "void deleteEnd() {", explanation: "Function to delete last node." },
  { code: "    if (head == NULL) return;", explanation: "If empty, stop." },
  { code: "    if (head->next == NULL) {", explanation: "If only one node..." },
  { code: "        free(head);", explanation: "Free head." },
  { code: "        head = NULL;", explanation: "Set head to NULL." },
  { code: "        return;", explanation: "Exit." },
  { code: "    }", explanation: "End check." },
  { code: "    struct Node* temp = head;", explanation: "Start traversal." },
  { code: "    while (temp->next->next != NULL) {", explanation: "Stop before the last node." },
  { code: "        temp = temp->next;", explanation: "Move next." },
  { code: "    }", explanation: "End loop." },
  { code: "    free(temp->next);", explanation: "Free the last node." },
  { code: "    temp->next = NULL;", explanation: "Set new end to NULL." },
  { code: "}", explanation: "End deleteEnd." },
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
