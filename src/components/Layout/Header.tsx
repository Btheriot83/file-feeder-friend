import { Code2, Menu, Search, User, Share2, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/components/theme-provider";
import { useToast } from "@/hooks/use-toast";

export const Header = () => {
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  
  const isDarkMode = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  
  const toggleDarkMode = (checked: boolean) => {
    setTheme(checked ? 'dark' : 'light');
  };

  const handleShareProgress = async () => {
    const shareData = {
      title: 'My Learn Claude Code Progress',
      text: '🚀 100% Claude Code Master! Join me learning Claude Code on the go.',
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
        toast({
          title: "Progress shared!",
          description: "Link copied to clipboard. Share it with your friends!",
        });
      }
    } catch (error) {
      // If sharing fails, just copy to clipboard
      try {
        await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
        toast({
          title: "Progress shared!",
          description: "Link copied to clipboard. Share it with your friends!",
        });
      } catch (clipError) {
        toast({
          variant: "destructive",
          title: "Share failed",
          description: "Unable to share progress. Please try again.",
        });
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo & Brand */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <div className="p-2 gradient-primary rounded-lg shadow-glow">
              <Code2 className="h-6 w-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary-glow))] bg-clip-text text-transparent">
                Learn Claude Code on the go
              </h1>
              <p className="text-xs text-muted-foreground">0 to Hero Coding Program</p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-md mx-4 hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search levels, use cases, concepts..."
              className="pl-10 transition-smooth focus:shadow-elegant"
            />
          </div>
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Search className="h-5 w-5" />
          </Button>

          {/* Dark Mode Toggle */}
          <div className="flex items-center gap-2">
            <Sun className="h-4 w-4 text-muted-foreground" />
            <Switch 
              checked={isDarkMode} 
              onCheckedChange={toggleDarkMode} 
              aria-label="Toggle dark mode"
              className="data-[state=checked]:bg-primary" 
            />
            <Moon className="h-4 w-4 text-muted-foreground" />
          </div>
          
          {/* Share Progress Button */}
          <Button 
            onClick={handleShareProgress}
            variant="outline" 
            size="sm"
            className="hidden sm:flex items-center gap-2 hover-scale transition-smooth"
          >
            <Share2 className="h-4 w-4" />
            <span className="hidden lg:inline">Share Progress</span>
          </Button>
          
          {/* Mobile Share Button */}
          <Button 
            onClick={handleShareProgress}
            variant="ghost" 
            size="icon" 
            className="sm:hidden"
          >
            <Share2 className="h-5 w-5" />
          </Button>
          
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};