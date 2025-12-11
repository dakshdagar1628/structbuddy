import { Link } from "react-router-dom";
import { ArrowLeft, Type } from "lucide-react";
import IntegratedCodeLab from "@/components/algoviz/IntegratedCodeLab";
import StringsVisualizer from "@/components/algoviz/StringsVisualizer";
import { isPalindromeCode } from "@/data/stringData";

const StringsModule = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-md shrink-0">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-mono hidden sm:inline">Back</span>
            </Link>
            <div className="w-px h-6 bg-border hidden sm:block" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                <Type className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <h1 className="text-lg font-display font-bold text-foreground">
                  Strings
                </h1>
                <p className="text-xs text-muted-foreground font-mono hidden sm:block">
                  The Immutable Chain
                </p>
              </div>
            </div>
          </div>
          <div className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full">
            <span className="text-xs font-mono text-emerald-300">
              Palindrome Check
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 min-h-0">
        <IntegratedCodeLab
          pythonCode={isPalindromeCode}
          visualizer={(visualState) => (
            <StringsVisualizer visualState={visualState} />
          )}
        />
      </main>
    </div>
  );
};

export default StringsModule;
