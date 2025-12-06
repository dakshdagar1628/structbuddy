import LearningLayout from "@/components/algoviz/LearningLayout";
import LinkedListVisualizer from "@/components/algoviz/LinkedListVisualizer";
import AiTutorButton from "@/components/algoviz/AiTutorButton";

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