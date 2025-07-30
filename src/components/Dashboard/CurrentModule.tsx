import { ArrowRight, CheckCircle, Clock, Play, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

export const CurrentModule = () => {
  const lessons = [
    { id: 1, title: "What is Claude Code?", completed: true, duration: "12 min" },
    { id: 2, title: "Getting Access & Account Setup", completed: true, duration: "8 min" },
    { id: 3, title: "First Prompt Engineering", completed: false, duration: "18 min", current: true },
    { id: 4, title: "Understanding AI Responses", completed: false, duration: "22 min" },
    { id: 5, title: "Building Your First App", completed: false, duration: "35 min" },
  ];

  const currentLessonTasks = [
    { id: 1, title: "Learn prompt structure basics", completed: true, subtasks: ["Read about clear instructions", "Practice with examples"] },
    { id: 2, title: "Practice clear instructions", completed: true, subtasks: ["Write 3 different prompts", "Compare results"] },
    { id: 3, title: "Try different prompt styles", completed: false, subtasks: ["Test conversational style", "Try step-by-step format", "Experiment with examples"] },
    { id: 4, title: "Test prompt variations", completed: false, subtasks: ["Modify existing prompts", "Analyze response quality"] }
  ];

  const [taskStates, setTaskStates] = useState(
    currentLessonTasks.reduce((acc, task) => ({ ...acc, [task.id]: task.completed }), {})
  );

  const handleTaskToggle = (taskId: number) => {
    setTaskStates(prev => ({ ...prev, [taskId]: !prev[taskId] }));
  };

  const completedLessons = lessons.filter(l => l.completed).length;
  const progress = (completedLessons / lessons.length) * 100;

  return (
    <Card className="transition-smooth hover:shadow-elegant">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              Module 1: What the Hell is Claude Code?
              <Badge variant="secondary">In Progress</Badge>
            </CardTitle>
            <p className="text-muted-foreground mt-1">
              Discover the power of AI-assisted coding and get started with Claude Code
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium">{Math.round(progress)}% Complete</p>
            <p className="text-xs text-muted-foreground">{completedLessons}/{lessons.length} lessons</p>
          </div>
        </div>
        <div className="relative mt-4">
          <Progress value={progress} className="h-2" />
          <div 
            className="absolute top-0 left-0 h-2 progress-bar rounded-full transition-all duration-1000"
            style={{ width: `${progress}%` }}
          />
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {lessons.map((lesson) => (
          <div
            key={lesson.id}
            className={`flex items-center gap-3 p-3 rounded-lg transition-smooth ${
              lesson.current 
                ? 'bg-[hsl(var(--primary))]/5 border border-[hsl(var(--primary))]/20' 
                : 'hover:bg-muted/50'
            }`}
          >
            <div className={`p-2 rounded-full ${
              lesson.completed 
                ? 'bg-[hsl(var(--success))] text-white' 
                : lesson.current
                  ? 'gradient-primary text-white'
                  : 'bg-muted text-muted-foreground'
            }`}>
              {lesson.completed ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className={`font-medium ${lesson.current ? 'text-[hsl(var(--primary))]' : ''}`}>
                  {lesson.title}
                </h4>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {lesson.duration}
                </div>
              </div>
            </div>
            
            {lesson.current && (
              <Button size="sm" className="ml-2">
                Continue
                <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            )}
          </div>
        ))}
        
        {/* Current Lesson Tasks */}
        <div className="pt-6 border-t">
          <div className="flex items-center gap-2 mb-4">
            <Target className="h-5 w-5 text-[hsl(var(--primary))]" />
            <h3 className="text-lg font-semibold">First Prompt Engineering - Tasks</h3>
          </div>
          
          <div className="space-y-3">
            {currentLessonTasks.map((task) => (
              <div key={task.id} className="p-4 rounded-lg border bg-background">
                <div className="flex items-start gap-3 mb-3">
                  <Checkbox 
                    checked={taskStates[task.id] || false}
                    onCheckedChange={() => handleTaskToggle(task.id)}
                    className="mt-0.5"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className={`font-medium ${
                        taskStates[task.id] ? 'line-through text-muted-foreground' : 'text-foreground'
                      }`}>
                        {task.title}
                      </span>
                      <Badge 
                        variant={taskStates[task.id] ? "default" : "secondary"} 
                        className="text-xs"
                      >
                        {taskStates[task.id] ? "Completed" : "In Progress"}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                {/* Subtasks */}
                <div className="ml-6 space-y-2">
                  {task.subtasks.map((subtask, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-2 h-2 rounded-full bg-[hsl(var(--primary))]/40"></div>
                      <span>{subtask}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="pt-4 border-t">
          <Button className="w-full" size="lg">
            Continue Current Lesson
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};