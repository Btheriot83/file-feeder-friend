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

const learningLevels = [
  { id: 1, title: "Beginner", icon: Circle, progress: 40, badge: "Current", useCases: 0 },
  { id: 2, title: "Intermediate", icon: Target, progress: 0, badge: null, useCases: 0 },
  { id: 3, title: "Advanced", icon: Zap, progress: 0, badge: null, useCases: 0 },
  { id: 4, title: "Master", icon: Trophy, progress: 0, badge: null, useCases: 0 },
];

// Current lesson tasks based on the active level
const currentLevelTasks = {
  1: { // Beginner level
    title: "Basic AI Prompting",
    tasks: [
      { id: 1, title: "Learn prompt structure basics", completed: true, clickable: true },
      { id: 2, title: "Practice clear instructions", completed: true, clickable: true },
      { id: 3, title: "Try different prompt styles", completed: false, clickable: true },
      { id: 4, title: "Complete first use case", completed: false, clickable: false }
    ]
  },
  2: { // Intermediate level
    title: "Advanced Techniques",
    tasks: [
      { id: 1, title: "Study complex prompting", completed: false, clickable: true },
      { id: 2, title: "Practice multi-step tasks", completed: false, clickable: true },
      { id: 3, title: "Explore advanced features", completed: false, clickable: true },
      { id: 4, title: "Complete intermediate use cases", completed: false, clickable: false }
    ]
  },
  // Add more levels as needed
};

export const Sidebar = () => {
  const overallProgress = 100; // Temporarily set to 100% to preview the gold master badge
  const currentLevelId = 1; // Beginner - the current active level
  const currentTasks = currentLevelTasks[currentLevelId];
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
        <div className="space-y-1 max-w-full overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between mb-0.5 w-full min-w-0">
            <h3 className="font-bold text-xs bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary-glow))] bg-clip-text text-transparent truncate flex-1 min-w-0">
              Your Journey
            </h3>
            <div className="flex items-center gap-1 flex-shrink-0 ml-2">
              <span className="text-xs font-bold text-[hsl(var(--primary))] whitespace-nowrap">{Math.round(overallProgress)}%</span>
              <span className="text-xs">🚀</span>
            </div>
          </div>
          
          {/* Progress Bar with Scratch & Reveal */}
          <div className="relative mb-1 w-full">
            <Progress value={overallProgress} className="h-2 w-full" />
            <div 
              className="absolute top-0 left-0 h-2 progress-bar rounded-full transition-all duration-1000"
              style={{ width: `${overallProgress}%` }}
            />
            {/* Gold Master Badge - shows when 100% complete */}
            {overallProgress === 100 && (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-full shadow-2xl animate-pulse hover-scale">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 rounded-full animate-pulse opacity-75"></div>
                <span className="relative text-xs font-bold text-yellow-900 tracking-tight px-1 animate-fade-in whitespace-nowrap">✨ MASTER ✨</span>
              </div>
            )}
          </div>
          
          {/* Motivational Messages - Properly Spaced */}
          <div className="space-y-1">
            <div className="flex items-center justify-center text-center">
              <span className="text-muted-foreground font-medium text-xs">No procrastination</span>
              <span className="ml-1 text-xs">🛠️</span>
            </div>
            <div className="flex items-center justify-center text-center">
              <span className="text-[hsl(var(--success))] font-semibold text-xs">You've got this!</span>
              <span className="ml-1 text-xs">🔥</span>
            </div>
          </div>
        </div>
      </div>

      {/* Module List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-2 space-y-1">
          <h4 className="text-xs font-medium text-muted-foreground mb-2 px-2">Learning Levels</h4>
          {learningLevels.map((level) => {
            const Icon = level.icon;
            return (
              <Button
                key={level.id}
                variant={level.progress > 0 ? "secondary" : "ghost"}
                className="w-full justify-start p-2 h-auto transition-smooth hover:shadow-elegant"
              >
                <div className="flex items-center gap-2 w-full">
                  <div className={`p-1.5 rounded-lg ${
                    level.progress === 100 
                      ? 'bg-[hsl(var(--success))] text-white' 
                      : level.progress > 0 
                        ? 'gradient-primary text-white'
                        : 'bg-muted text-muted-foreground'
                  }`}>
                    <Icon className="h-3 w-3" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium">{level.title}</span>
                      <span className="text-xs text-muted-foreground">({level.useCases} use cases)</span>
                    </div>
                    {level.progress > 0 && (
                      <div className="w-full bg-muted rounded-full h-1.5 mb-2">
                        <div 
                          className="h-1.5 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary-glow))] rounded-full transition-all duration-500"
                          style={{ width: `${level.progress}%` }}
                        />
                      </div>
                    )}
                    {level.badge && (
                      <Badge 
                        variant={level.badge === "✓" ? "default" : "secondary"}
                        className="text-xs px-1.5 py-0.5"
                      >
                        {level.badge}
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