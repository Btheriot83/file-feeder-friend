import { 
  BookOpen, 
  Code, 
  GitBranch, 
  Lightbulb, 
  Trophy, 
  Users,
  Zap,
  Brain,
  Target,
  Puzzle,
  Rocket,
  Bug
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const modules = [
  { id: 1, title: "What the Hell is Claude Code?", icon: Brain, progress: 100, badge: "✓" },
  { id: 2, title: "Under the Hood Secrets", icon: Zap, progress: 85, badge: "Current" },
  { id: 3, title: "Taking the Wheel", icon: Target, progress: 60, badge: null },
  { id: 4, title: "Terminal Ninja Skills", icon: Code, progress: 0, badge: null },
  { id: 5, title: "Advanced Power Moves", icon: Puzzle, progress: 0, badge: null },
  { id: 6, title: "Build Epic Projects", icon: BookOpen, progress: 0, badge: null },
  { id: 7, title: "Fixing the Unfixable", icon: Bug, progress: 0, badge: null },
  { id: 8, title: "Git Like a Boss", icon: GitBranch, progress: 0, badge: null },
  { id: 9, title: "Production Beast Mode", icon: Rocket, progress: 0, badge: null },
  { id: 10, title: "Working with Humans", icon: Users, progress: 0, badge: null },
  { id: 11, title: "Scaling Like a Titan", icon: Trophy, progress: 0, badge: null },
  { id: 12, title: "Hustle and Innovate", icon: Lightbulb, progress: 0, badge: null },
];

export const Sidebar = () => {
  const overallProgress = modules.reduce((sum, mod) => sum + mod.progress, 0) / modules.length;

  return (
    <aside className="hidden md:flex w-80 bg-card border-r flex-col">
      {/* Progress Overview */}
      <div className="p-6 border-b bg-gradient-to-br from-background to-muted/30">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary-glow))] bg-clip-text text-transparent">
              Your Journey
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-[hsl(var(--primary))]">{Math.round(overallProgress)}%</span>
              <span className="animate-bounce text-xl">🚀</span>
            </div>
          </div>
          <div className="relative">
            <Progress value={overallProgress} className="h-4" />
            <div 
              className="absolute top-0 left-0 h-4 progress-bar rounded-full transition-all duration-1000 animate-fade-in"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[hsl(var(--success))] font-medium animate-fade-in">
              You've got this! <span className="animate-pulse">🔥</span>
            </span>
            <span className="text-muted-foreground">No procrastination zone</span>
          </div>
        </div>
      </div>

      {/* Module List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-2">
          <h4 className="text-sm font-medium text-muted-foreground mb-3">Learning Modules</h4>
          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <Button
                key={module.id}
                variant={module.progress > 0 ? "secondary" : "ghost"}
                className="w-full justify-start p-3 h-auto transition-smooth hover:shadow-elegant"
              >
                <div className="flex items-center gap-3 w-full">
                  <div className={`p-2 rounded-lg ${
                    module.progress === 100 
                      ? 'bg-[hsl(var(--success))] text-white' 
                      : module.progress > 0 
                        ? 'gradient-primary text-white'
                        : 'bg-muted text-muted-foreground'
                  }`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium">{module.title}</span>
                      {module.badge && (
                        <Badge 
                          variant={module.badge === "✓" ? "default" : "secondary"}
                          className="text-xs px-2 py-0"
                        >
                          {module.badge}
                        </Badge>
                      )}
                    </div>
                    {module.progress > 0 && (
                      <div className="w-full bg-muted rounded-full h-1.5">
                        <div 
                          className="h-1.5 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary-glow))] rounded-full transition-all duration-500"
                          style={{ width: `${module.progress}%` }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </Button>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-t">
        <div className="space-y-2">
          <Button variant="outline" className="w-full justify-start gap-2">
            <BookOpen className="h-4 w-4" />
            Use Case Library
          </Button>
        </div>
      </div>
    </aside>
  );
};