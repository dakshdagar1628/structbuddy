import LearningLayout from "@/components/algoviz/LearningLayout";
import IntegratedCodeLab from "@/components/algoviz/IntegratedCodeLab";
import StringsVisualizer from "@/components/algoviz/StringsVisualizer";
import StringsConceptCanvas from "@/components/algoviz/StringsConceptCanvas";
import StringsGameArena from "@/components/algoviz/StringsGameArena";
import { isPalindromeCode, isPalindromeDisplayCode } from "@/data/stringData";

const StringsModule = () => {
  return (
    <LearningLayout
      title="Strings"
      principle="The Immutable Chain"
      visualTab={<StringsConceptCanvas />}
      codeTab={
        <IntegratedCodeLab
          pythonCode={isPalindromeCode}
          displayCode={isPalindromeDisplayCode}
          visualizer={(visualState) => (
            <StringsVisualizer visualState={visualState} />
          )}
        />
      }
      gameTab={<StringsGameArena />}
    />
  );
};

export default StringsModule;
