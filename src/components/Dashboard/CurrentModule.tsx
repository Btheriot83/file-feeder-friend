import { ArrowRight, CheckCircle, Clock, Play, Target, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

export const CurrentLevel = () => {
  const currentLevel = {
    id: 1,
    title: "Beginner",
    description: "Master the fundamentals of AI-powered development with Claude",
    useCases: [
      { id: 1, title: "Build a Simple Landing Page", completed: true, current: false, duration: "15 min", difficulty: "Easy" },
      { id: 2, title: "Create a Contact Form", completed: true, current: false, duration: "20 min", difficulty: "Easy" },
      { id: 3, title: "Design a Product Card", completed: false, current: true, duration: "25 min", difficulty: "Easy" },
      { id: 4, title: "Interactive Todo List", completed: false, current: false, duration: "30 min", difficulty: "Medium" },
      { id: 5, title: "Responsive Navigation", completed: false, current: false, duration: "35 min", difficulty: "Medium" },
    ]
  };

  const currentTasks = [
    { id: 1, title: "Set up component structure", completed: true },
    { id: 2, title: "Style the card layout", completed: true },
    { id: 3, title: "Add product information", completed: false },
    { id: 4, title: "Implement hover effects", completed: false },
  ];

  const [taskStates, setTaskStates] = useState(
    currentTasks.reduce((acc, task) => ({ ...acc, [task.id]: task.completed }), {})
  );

  const handleTaskToggle = (taskId: number) => {
    setTaskStates(prev => ({ ...prev, [taskId]: !prev[taskId] }));
  };

  const completedUseCases = currentLevel.useCases.filter(u => u.completed).length;
  const progress = (completedUseCases / currentLevel.useCases.length) * 100;

  return (
    <>
      <Card className="transition-smooth hover:shadow-elegant">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-[hsl(var(--primary))]" />
                {currentLevel.title} Level
                <Badge variant="secondary">In Progress</Badge>
              </CardTitle>
              <p className="text-muted-foreground mt-1">
                {currentLevel.description}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">{Math.round(progress)}% Complete</p>
              <p className="text-xs text-muted-foreground">{completedUseCases}/{currentLevel.useCases.length} use cases</p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="px-4 py-4">
          {/* Progress Bar */}
          <div className="w-full bg-muted rounded-full h-2 mb-6">
            <div 
              className="h-2 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary-glow))] rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Use Cases List */}
          <div className="space-y-3 mb-6">
            {currentLevel.useCases.map((useCase) => (
              <div
                key={useCase.id}
                className={`flex items-center gap-3 p-3 rounded-lg border transition-smooth ${
                  useCase.current 
                    ? 'border-[hsl(var(--primary))]/30 bg-[hsl(var(--primary))]/5' 
                    : 'border-muted hover:border-[hsl(var(--primary))]/20'
                } ${
                  useCase.completed 
                    ? 'opacity-75' 
                    : useCase.current
                      ? 'shadow-sm'
                      : ''
                }`}
              >
                {useCase.completed ? (
                  <CheckCircle className="h-5 w-5 text-[hsl(var(--success))] flex-shrink-0" />
                ) : useCase.current ? (
                  <Play className="h-5 w-5 text-[hsl(var(--primary))] flex-shrink-0" />
                ) : (
                  <div className="h-5 w-5 rounded-full border-2 border-muted flex-shrink-0" />
                )}
                <div className="flex-1">
                  <h4 className={`font-medium ${useCase.current ? 'text-[hsl(var(--primary))]' : ''}`}>
                    {useCase.title}
                  </h4>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {useCase.duration}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {useCase.difficulty}
                    </Badge>
                  </div>
                </div>
                {useCase.current && (
                  <div className="flex items-center gap-2">
                    <Badge variant="default" className="text-xs">
                      Current
                    </Badge>
                    <Target className="h-4 w-4 text-[hsl(var(--primary))]" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Current Use Case Tasks */}
          <div className="border-t pt-4">
            <h4 className="font-medium mb-3 text-sm">Current Use Case: Design a Product Card</h4>
            <div className="space-y-2 mb-4">
              {currentTasks.map((task) => (
                <div key={task.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50">
                  <Checkbox 
                    checked={taskStates[task.id] || false}
                    onCheckedChange={() => handleTaskToggle(task.id)}
                  />
                  <span className={`text-sm ${
                    taskStates[task.id] ? 'line-through text-muted-foreground' : 'text-foreground'
                  }`}>
                    {task.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t">
            <Button className="w-full" size="lg">
              Continue Current Use Case
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};