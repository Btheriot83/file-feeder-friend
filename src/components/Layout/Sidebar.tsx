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
  Bug,
  Check,
  Circle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

const modules = [
  { id: 1, title: "What the Hell is Claude Code?", icon: Brain, progress: 40, badge: "Current" },
  { id: 2, title: "Under the Hood Secrets", icon: Zap, progress: 0, badge: null },
  { id: 3, title: "Taking the Wheel", icon: Target, progress: 0, badge: null },
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

// Current lesson tasks based on the active module
const currentLessonTasks = {
  1: { // "What the Hell is Claude Code?" module
    title: "First Prompt Engineering",
    tasks: [
      { id: 1, title: "Learn prompt structure basics", completed: true, clickable: true },
      { id: 2, title: "Practice clear instructions", completed: true, clickable: true },
      { id: 3, title: "Try different prompt styles", completed: false, clickable: true },
      { id: 4, title: "Test prompt variations", completed: false, clickable: false }
    ]
  },
  2: { // "Under the Hood Secrets" module
    title: "Understanding AI Architecture",
    tasks: [
      { id: 1, title: "Study transformer models", completed: true, clickable: true },
      { id: 2, title: "Analyze token processing", completed: true, clickable: true },
      { id: 3, title: "Explore attention mechanisms", completed: false, clickable: true },
      { id: 4, title: "Practice: Debug AI responses", completed: false, clickable: false }
    ]
  },
  // Add more modules as needed
};

export const Sidebar = () => {
  const overallProgress = 100; // Temporarily set to 100% to preview the gold master badge
  const currentModuleId = 1; // "What the Hell is Claude Code?" - the current active module
  const currentTasks = currentLessonTasks[currentModuleId];
  const [taskStates, setTaskStates] = useState(
    currentTasks?.tasks.reduce((acc, task) => ({ ...acc, [task.id]: task.completed }), {}) || {}
  );

  const handleTaskToggle = (taskId: number) => {
    setTaskStates(prev => ({ ...prev, [taskId]: !prev[taskId] }));
  };

  const handleTaskClick = (task: any) => {
    if (task.clickable) {
      // Navigate to specific part of lesson - placeholder for now
      console.log(`Navigating to: ${task.title}`);
    }
  };

  return (
    <aside className="hidden md:flex w-72 bg-card border-r flex-col">
      {/* Progress Overview */}
      <div className="px-2 py-2 border-b bg-gradient-to-br from-background to-muted/30">
        <div className="space-y-2">
          {/* Header */}
          <div className="flex items-center justify-between mb-1 w-full">
            <h3 className="font-bold text-xs bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary-glow))] bg-clip-text text-transparent flex-shrink">
              Your Journey
            </h3>
            <div className="flex items-center gap-1 flex-shrink-0">
              <span className="text-base font-bold text-[hsl(var(--primary))] whitespace-nowrap">{Math.round(overallProgress)}%</span>
              <span className="text-sm">🚀</span>
            </div>
          </div>
          
          {/* Progress Bar with Scratch & Reveal */}
          <div className="relative mb-2 w-full">
            <Progress value={overallProgress} className="h-3" />
            <div 
              className="absolute top-0 left-0 h-3 progress-bar rounded-full transition-all duration-1000"
              style={{ width: `${overallProgress}%` }}
            />
            {/* Gold Master Badge - shows when 100% complete */}
            {overallProgress === 100 && (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-full shadow-2xl animate-pulse hover-scale">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 rounded-full animate-pulse opacity-75"></div>
                <span className="relative text-xs font-bold text-yellow-900 tracking-wide px-1 animate-fade-in">✨ CLAUDE CODE MASTER ✨</span>
              </div>
            )}
          </div>
          
          {/* Motivational Messages - Properly Spaced */}
          <div className="space-y-1">
            <div className="flex items-center justify-center">
              <span className="text-muted-foreground font-medium text-xs">No procrastination zone</span>
              <span className="ml-1 text-base">🛠️</span>
            </div>
            <div className="flex items-center justify-center">
              <span className="text-[hsl(var(--success))] font-semibold text-xs">You've got this!</span>
              <span className="ml-2 text-base">🔥</span>
            </div>
          </div>
        </div>
      </div>

      {/* Module List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-2 space-y-1">
          <h4 className="text-xs font-medium text-muted-foreground mb-2 px-2">Learning Modules</h4>
          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <Button
                key={module.id}
                variant={module.progress > 0 ? "secondary" : "ghost"}
                className="w-full justify-start p-2 h-auto transition-smooth hover:shadow-elegant"
              >
                <div className="flex items-center gap-2 w-full">
                  <div className={`p-1.5 rounded-lg ${
                    module.progress === 100 
                      ? 'bg-[hsl(var(--success))] text-white' 
                      : module.progress > 0 
                        ? 'gradient-primary text-white'
                        : 'bg-muted text-muted-foreground'
                  }`}>
                    <Icon className="h-3 w-3" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium">{module.title}</span>
                    </div>
                    {module.progress > 0 && (
                      <div className="w-full bg-muted rounded-full h-1.5 mb-2">
                        <div 
                          className="h-1.5 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary-glow))] rounded-full transition-all duration-500"
                          style={{ width: `${module.progress}%` }}
                        />
                      </div>
                    )}
                    {module.badge && (
                      <Badge 
                        variant={module.badge === "✓" ? "default" : "secondary"}
                        className="text-xs px-1.5 py-0.5"
                      >
                        {module.badge}
                      </Badge>
                    )}
                  </div>
                </div>
              </Button>
            );
          })}
          
          {/* Current Lesson Tasks */}
          {currentTasks && (
            <div className="mt-6 pt-4 border-t border-muted">
              <h4 className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">
                Current Lesson: {currentTasks.title}
              </h4>
              <div className="space-y-2">
                {currentTasks.tasks.map((task) => (
                  <div 
                    key={task.id}
                    className={`flex items-start gap-3 p-3 rounded-lg border transition-smooth ${
                      task.clickable 
                        ? 'hover:border-[hsl(var(--primary))]/30 cursor-pointer hover:bg-[hsl(var(--primary))]/5' 
                        : 'border-muted'
                    }`}
                    onClick={() => handleTaskClick(task)}
                  >
                    <Checkbox 
                      checked={taskStates[task.id] || false}
                      onCheckedChange={() => handleTaskToggle(task.id)}
                      className="mt-0.5"
                      onClick={(e) => e.stopPropagation()}
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className={`text-sm ${
                          taskStates[task.id] ? 'line-through text-muted-foreground' : 'text-foreground'
                        }`}>
                          {task.title}
                        </span>
                        <Badge 
                          variant={taskStates[task.id] ? "default" : "secondary"} 
                          className="text-xs ml-2"
                        >
                          {taskStates[task.id] ? "Completed" : "In Progress"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Resources Section */}
          <div className="mt-6 pt-4 border-t border-muted">
            <h4 className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">Resources</h4>
            <Button 
              variant="outline" 
              className="w-full justify-start gap-2 bg-background border-[hsl(var(--primary))]/20 hover:bg-[hsl(var(--primary))]/5"
              onClick={() => window.location.href = '/use-case-library'}
            >
              <BookOpen className="h-4 w-4" />
              Use Case Library
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
};