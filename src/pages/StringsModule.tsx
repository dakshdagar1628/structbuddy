import LearningLayout from "@/components/algoviz/LearningLayout";
import IntegratedCodeLab from "@/components/algoviz/IntegratedCodeLab";
import StringsVisualizer from "@/components/algoviz/StringsVisualizer";
import StringsConceptCanvas from "@/components/algoviz/StringsConceptCanvas";
import StringsGameArena from "@/components/algoviz/StringsGameArena";
import AiTutorButton from "@/components/algoviz/AiTutorButton";
import { isPalindromeCode } from "@/data/stringData";

const StringsModule = () => {
  return (
    <>
      <LearningLayout
        title="Strings"
        principle="The Immutable Chain"
        visualTab={<StringsConceptCanvas />}
        codeTab={
          <IntegratedCodeLab
            pythonCode={isPalindromeCode}
            visualizer={(visualState) => (
              <StringsVisualizer visualState={visualState} />
            )}
          />
        }
        gameTab={<StringsGameArena />}
      />
      <AiTutorButton />
    </>
  );
};

export default StringsModule;
