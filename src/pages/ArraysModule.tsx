import LearningLayout from "@/components/algoviz/LearningLayout";
import IntegratedCodeLab from "@/components/algoviz/IntegratedCodeLab";
import ArraysVisualizer from "@/components/algoviz/ArraysVisualizer";
import ArraysConceptCanvas from "@/components/algoviz/ArraysConceptCanvas";
import ArraysGameArena from "@/components/algoviz/ArraysGameArena";
import { reverseArrayCode, reverseArrayDisplayCode } from "@/data/arrayData";

const ArraysModule = () => {
  return (
    <LearningLayout
      title="Arrays"
      principle="The Contiguous Block"
      visualTab={<ArraysConceptCanvas />}
      codeTab={
        <IntegratedCodeLab
          pythonCode={reverseArrayCode}
          displayCode={reverseArrayDisplayCode}
          visualizer={(visualState) => (
            <ArraysVisualizer visualState={visualState} />
          )}
        />
      }
      gameTab={<ArraysGameArena />}
    />
  );
};

export default ArraysModule;
