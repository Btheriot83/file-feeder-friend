import { ArrowRight, CheckCircle, Clock, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export const CurrentModule = () => {
  const lessons = [
    { id: 1, title: "Installation & Setup", completed: true, duration: "15 min" },
    { id: 2, title: "Authentication & Billing", completed: true, duration: "10 min" },
    { id: 3, title: "IDE Integration", completed: true, duration: "20 min" },
    { id: 4, title: "Your First Session", completed: false, duration: "30 min", current: true },
    { id: 5, title: "Code Generation Patterns", completed: false, duration: "25 min" },
  ];

  const completedLessons = lessons.filter(l => l.completed).length;
  const progress = (completedLessons / lessons.length) * 100;

  return (
    <Card className="transition-smooth hover:shadow-elegant">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              Module 2: Core Mechanics
              <Badge variant="secondary">In Progress</Badge>
            </CardTitle>
            <p className="text-muted-foreground mt-1">
              Learn the fundamental mechanics of Claude Code
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