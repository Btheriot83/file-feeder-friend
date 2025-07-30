import { ArrowRight, Clock, Trophy, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const WelcomeSection = () => {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl gradient-primary p-8 text-white shadow-glow">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-2">
            See it. Do it. Learn it. Fast.
          </h2>
          <p className="text-white/90 mb-6 max-w-2xl">
            Transform from having no clue at all to being a Claude Code boss through our comprehensive, 
            hands-on curriculum designed by a guy who knew how to prompt really well.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button 
              size="lg" 
              className="bg-white text-[hsl(var(--primary))] hover:bg-white/90 shadow-elegant"
            >
              Let's Build
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white/30 text-white hover:bg-white/10 bg-white/5"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              See My Journey
            </Button>
          </div>
        </div>
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
          <div className="w-full h-full bg-gradient-to-br from-white/20 to-white/5 rounded-full" />
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="transition-smooth hover:shadow-elegant">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[hsl(var(--success))]/10 rounded-lg">
                <Trophy className="h-6 w-6 text-[hsl(var(--success))]" />
              </div>
              <div>
                <p className="text-2xl font-bold">2/12</p>
                <p className="text-sm text-muted-foreground">Modules Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="transition-smooth hover:shadow-elegant">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[hsl(var(--info))]/10 rounded-lg">
                <Clock className="h-6 w-6 text-[hsl(var(--info))]" />
              </div>
              <div>
                <p className="text-2xl font-bold">18/120</p>
                <p className="text-sm text-muted-foreground">Lessons Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="transition-smooth hover:shadow-elegant">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[hsl(var(--warning))]/10 rounded-lg">
                <Target className="h-6 w-6 text-[hsl(var(--warning))]" />
              </div>
              <div>
                <p className="text-2xl font-bold">Expert</p>
                <p className="text-sm text-muted-foreground">Skill Mastery Level</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};