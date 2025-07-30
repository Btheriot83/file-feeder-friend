import { 
  Code, 
  Database, 
  Globe, 
  Smartphone, 
  ArrowRight,
  ExternalLink,
  Star,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const useCases = [
  {
    id: 1,
    title: "Building a React Dashboard",
    description: "Complete walkthrough of creating a data visualization dashboard with Claude Code",
    category: "Frontend",
    icon: Globe,
    difficulty: "Intermediate",
    time: "45 min",
    rating: 4.8,
    popular: true
  },
  {
    id: 2,
    title: "API Development with Node.js",
    description: "Learn to build scalable REST APIs using Claude Code for backend development",
    category: "Backend",
    icon: Database,
    difficulty: "Advanced",
    time: "60 min",
    rating: 4.9,
    popular: false
  },
  {
    id: 3,
    title: "Mobile App with React Native",
    description: "Step-by-step guide to creating cross-platform mobile applications",
    category: "Mobile",
    icon: Smartphone,
    difficulty: "Intermediate",
    time: "90 min",
    rating: 4.7,
    popular: true
  },
  {
    id: 4,
    title: "Algorithm Implementation",
    description: "Master complex algorithms and data structures with Claude Code assistance",
    category: "Algorithms",
    icon: Code,
    difficulty: "Advanced",
    time: "30 min",
    rating: 4.6,
    popular: false
  }
];

export const UseCaseLibrary = () => {
  return (
    <Card className="transition-smooth hover:shadow-elegant">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Use Case Library</CardTitle>
            <p className="text-muted-foreground mt-1">
              Real-world examples and practical implementations
            </p>
          </div>
          <Button variant="outline" size="sm">
            View All
            <ExternalLink className="ml-2 h-3 w-3" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {useCases.map((useCase) => {
          const Icon = useCase.icon;
          return (
            <div
              key={useCase.id}
              className="group p-4 rounded-lg border border-border hover:border-[hsl(var(--primary))]/30 transition-smooth hover:shadow-elegant cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[hsl(var(--primary))]/10 rounded-lg group-hover:gradient-primary group-hover:text-white transition-smooth">
                  <Icon className="h-5 w-5" />
                </div>
                
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium group-hover:text-[hsl(var(--primary))] transition-smooth">
                          {useCase.title}
                        </h4>
                        {useCase.popular && (
                          <Badge variant="secondary" className="text-xs">
                            <Star className="h-3 w-3 mr-1 fill-current" />
                            Popular
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {useCase.description}
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-[hsl(var(--primary))] transition-smooth" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {useCase.time}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {useCase.difficulty}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-[hsl(var(--warning))] text-[hsl(var(--warning))]" />
                        {useCase.rating}
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {useCase.category}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        
        <div className="pt-4 border-t">
          <Button variant="outline" className="w-full">
            Explore More Use Cases
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};