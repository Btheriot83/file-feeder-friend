import { ExternalLink, BookOpen, Globe, Video, FileText, Github } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const EssentialResources = () => {
  const resourceCategories = [
    {
      title: "Official Documentation",
      description: "Core Claude and AI development resources",
      icon: BookOpen,
      resources: [
        {
          name: "Claude API Documentation",
          url: "https://docs.anthropic.com/",
          description: "Complete API reference and guides",
          type: "Documentation"
        },
        {
          name: "Anthropic Console",
          url: "https://console.anthropic.com/",
          description: "Manage your Claude API usage",
          type: "Platform"
        },
        {
          name: "Claude Safety Guidelines",
          url: "https://www.anthropic.com/claude/use-policy",
          description: "Best practices for responsible AI use",
          type: "Guidelines"
        }
      ]
    },
    {
      title: "Development Tools",
      description: "Essential tools for Claude integration",
      icon: Github,
      resources: [
        {
          name: "Claude SDK for Python",
          url: "https://github.com/anthropics/anthropic-sdk-python",
          description: "Official Python SDK",
          type: "SDK"
        },
        {
          name: "Claude SDK for TypeScript",
          url: "https://github.com/anthropics/anthropic-sdk-typescript",
          description: "Official TypeScript/JavaScript SDK",
          type: "SDK"
        },
        {
          name: "Claude Workbench",
          url: "https://console.anthropic.com/workbench",
          description: "Interactive prompt testing environment",
          type: "Tool"
        }
      ]
    },
    {
      title: "Learning Materials",
      description: "Tutorials and educational content",
      icon: Video,
      resources: [
        {
          name: "Prompt Engineering Guide",
          url: "https://docs.anthropic.com/claude/docs/prompt-engineering",
          description: "Master the art of prompting Claude",
          type: "Guide"
        },
        {
          name: "Claude Cookbook",
          url: "https://github.com/anthropics/anthropic-cookbook",
          description: "Code examples and use cases",
          type: "Examples"
        },
        {
          name: "AI Safety Research",
          url: "https://www.anthropic.com/research",
          description: "Latest research on AI alignment",
          type: "Research"
        }
      ]
    },
    {
      title: "Community & Support",
      description: "Connect with other developers",
      icon: Globe,
      resources: [
        {
          name: "Anthropic Discord",
          url: "https://discord.gg/anthropic",
          description: "Join the developer community",
          type: "Community"
        },
        {
          name: "Stack Overflow",
          url: "https://stackoverflow.com/questions/tagged/claude-ai",
          description: "Q&A for Claude development",
          type: "Q&A"
        },
        {
          name: "GitHub Discussions",
          url: "https://github.com/anthropics/anthropic-sdk-python/discussions",
          description: "Technical discussions and support",
          type: "Support"
        }
      ]
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Documentation": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "Platform": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "SDK": return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      case "Tool": return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
      case "Guide": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "Examples": return "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200";
      case "Community": return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Essential Resources</h1>
          <p className="text-muted-foreground">
            Important URLs and resources for mastering Claude development
          </p>
        </div>

        <div className="grid gap-6">
          {resourceCategories.map((category, categoryIndex) => {
            const IconComponent = category.icon;
            return (
              <Card key={categoryIndex} className="p-6">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <IconComponent className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{category.title}</CardTitle>
                      <CardDescription>{category.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {category.resources.map((resource, resourceIndex) => (
                      <div
                        key={resourceIndex}
                        className="p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-medium text-sm line-clamp-1">
                            {resource.name}
                          </h3>
                          <Badge 
                            variant="secondary" 
                            className={`text-xs ml-2 ${getTypeColor(resource.type)}`}
                          >
                            {resource.type}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                          {resource.description}
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full"
                          onClick={() => window.open(resource.url, '_blank')}
                        >
                          <ExternalLink className="h-3 w-3 mr-2" />
                          Visit Resource
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EssentialResources;