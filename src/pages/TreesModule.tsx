import LearningLayout from "@/components/algoviz/LearningLayout";
import IntegratedCodeLab from "@/components/algoviz/IntegratedCodeLab";
import TreeConceptCanvas from "@/components/algoviz/TreeConceptCanvas";
import TreeVisualizer from "@/components/algoviz/TreeVisualizer";
import TreeGameArena from "@/components/algoviz/TreeGameArena";
import { bstInsertCode, bstInsertDisplayCode } from "@/data/treeData";

const TreesModule = () => (
  <LearningLayout
    title="Trees"
    principle="The Hierarchical Structure"
    visualTab={<TreeConceptCanvas />}
    codeTab={
      <IntegratedCodeLab
        pythonCode={bstInsertCode}
        displayCode={bstInsertDisplayCode}
        visualizer={(vs) => <TreeVisualizer visualState={vs} />}
      />
    }
    gameTab={<TreeGameArena />}
  />
);

export default TreesModule;
