import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Github, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface UseCaseCardProps {
  repo: string;
  owner: string;
  title: string;
  description: string;
}

export function UseCaseCard({ repo, owner, title, description }: UseCaseCardProps) {
  const [forked, setForked] = useState(false);
  const [isForking, setIsForking] = useState(false);
  const { toast } = useToast();

  const handleFork = async () => {
    setIsForking(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('fork-repository', {
        body: { owner, repo }
      });

      if (error) {
        throw error;
      }

      if (data.success) {
        setForked(true);
        toast({
          title: "Repository forked!",
          description: `Successfully forked ${owner}/${repo} to your GitHub account.`,
        });
        
        // Open the forked repository in a new tab
        if (data.forkUrl) {
          window.open(data.forkUrl, '_blank');
        }
      } else {
        throw new Error(data.error || 'Fork failed');
      }
    } catch (error) {
      console.error('Fork failed:', error);
      toast({
        variant: "destructive",
        title: "Fork failed",
        description: error.message || 'Failed to fork repository. Please try again.',
      });
    } finally {
      setIsForking(false);
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Github className="h-5 w-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{description}</p>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>{owner}/{repo}</span>
        </div>
        <Button 
          onClick={handleFork} 
          disabled={forked || isForking}
          className="w-full"
          variant={forked ? "secondary" : "default"}
        >
          {isForking ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Forking...
            </>
          ) : forked ? (
            <>
              <Github className="mr-2 h-4 w-4" />
              Forked
            </>
          ) : (
            <>
              <Github className="mr-2 h-4 w-4" />
              Fork to GitHub
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}