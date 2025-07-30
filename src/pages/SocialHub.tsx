import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Share2, Trophy, Medal, Crown, Users, UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock leaderboard data
const mockLeaderboardData = [
  {
    id: 1,
    username: "CodeMaster_Alex",
    progress: 120,
    totalModules: 120,
    badges: ["Expert", "Speed Demon", "Helper"],
    avatar: "/placeholder.svg",
    rank: 1
  },
  {
    id: 2,
    username: "DevNinja_Sarah",
    progress: 118,
    totalModules: 120,
    badges: ["Expert", "Perfectionist"],
    avatar: "/placeholder.svg",
    rank: 2
  },
  {
    id: 3,
    username: "PyPro_Mike",
    progress: 115,
    totalModules: 120,
    badges: ["Expert", "Consistent"],
    avatar: "/placeholder.svg",
    rank: 3
  },
  {
    id: 4,
    username: "JSJedi_Emma",
    progress: 110,
    totalModules: 120,
    badges: ["Advanced", "Creative"],
    avatar: "/placeholder.svg",
    rank: 4
  },
  {
    id: 5,
    username: "You",
    progress: 85,
    totalModules: 120,
    badges: ["Intermediate", "Dedicated"],
    avatar: "/placeholder.svg",
    rank: 5,
    isCurrentUser: true
  },
  {
    id: 6,
    username: "ReactRanger_Tom",
    progress: 82,
    totalModules: 120,
    badges: ["Intermediate"],
    avatar: "/placeholder.svg",
    rank: 6
  },
  {
    id: 7,
    username: "CloudCoder_Lisa",
    progress: 78,
    totalModules: 120,
    badges: ["Intermediate", "Team Player"],
    avatar: "/placeholder.svg",
    rank: 7
  },
  {
    id: 8,
    username: "AIAdept_John",
    progress: 75,
    totalModules: 120,
    badges: ["Beginner Plus"],
    avatar: "/placeholder.svg",
    rank: 8
  },
  {
    id: 9,
    username: "DataDev_Anna",
    progress: 72,
    totalModules: 120,
    badges: ["Beginner Plus", "Curious"],
    avatar: "/placeholder.svg",
    rank: 9
  },
  {
    id: 10,
    username: "WebWizard_Ben",
    progress: 68,
    totalModules: 120,
    badges: ["Beginner Plus"],
    avatar: "/placeholder.svg",
    rank: 10
  }
];

const SocialHub = () => {
  const { toast } = useToast();
  const [selectedFilter, setSelectedFilter] = useState("global");

  const handleInviteFriends = async () => {
    const inviteData = {
      title: 'Join me on ClaudeCode Mastery!',
      text: '🚀 I\'m learning to code with ClaudeCode Mastery. Join me on this amazing journey from 0 to hero!',
      url: window.location.origin
    };

    try {
      if (navigator.share) {
        await navigator.share(inviteData);
      } else {
        await navigator.clipboard.writeText(`${inviteData.text} ${inviteData.url}`);
        toast({
          title: "Invite link copied!",
          description: "Share it with your friends to invite them to join.",
        });
      }
    } catch (error) {
      try {
        await navigator.clipboard.writeText(`${inviteData.text} ${inviteData.url}`);
        toast({
          title: "Invite link copied!",
          description: "Share it with your friends to invite them to join.",
        });
      } catch (clipError) {
        toast({
          variant: "destructive",
          title: "Share failed",
          description: "Unable to create invite link. Please try again.",
        });
      }
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Trophy className="h-5 w-5 text-amber-600" />;
      default:
        return <span className="text-sm font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getProgressPercentage = (progress: number, total: number) => {
    return Math.round((progress / total) * 100);
  };

  return (
    <div className="container mx-auto p-4 space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Social Hub</h1>
          <p className="text-muted-foreground">Connect, compete, and celebrate progress together</p>
        </div>
        <Button onClick={handleInviteFriends} className="flex items-center gap-2 hover-scale">
          <UserPlus className="h-4 w-4" />
          Invite Friends
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
            <div className="text-2xl font-bold">1,247</div>
            <div className="text-sm text-muted-foreground">Active Learners</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Trophy className="h-8 w-8 mx-auto mb-2 text-primary" />
            <div className="text-2xl font-bold">#5</div>
            <div className="text-sm text-muted-foreground">Your Rank</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Medal className="h-8 w-8 mx-auto mb-2 text-primary" />
            <div className="text-2xl font-bold">2</div>
            <div className="text-sm text-muted-foreground">Your Badges</div>
          </CardContent>
        </Card>
      </div>

      {/* Leaderboard */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                Leaderboard
              </CardTitle>
              <p className="text-sm text-muted-foreground">Top performers this month</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant={selectedFilter === "global" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter("global")}
              >
                Global
              </Button>
              <Button
                variant={selectedFilter === "friends" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter("friends")}
              >
                Friends
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockLeaderboardData.map((user) => (
              <div
                key={user.id}
                className={`flex items-center justify-between p-4 rounded-lg border transition-smooth hover-scale ${
                  user.isCurrentUser 
                    ? 'bg-primary/10 border-primary/20 shadow-elegant' 
                    : 'hover:bg-muted/50'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-8">
                    {getRankIcon(user.rank)}
                  </div>
                  
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>
                      {user.username.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <div className="font-medium flex items-center gap-2">
                      {user.username}
                      {user.isCurrentUser && (
                        <Badge variant="secondary" className="text-xs">You</Badge>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {user.progress}/{user.totalModules} modules completed
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-lg font-bold">
                    {getProgressPercentage(user.progress, user.totalModules)}%
                  </div>
                  <div className="flex gap-1 mt-1">
                    {user.badges.slice(0, 2).map((badge, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {badge}
                      </Badge>
                    ))}
                    {user.badges.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{user.badges.length - 2}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Coming Soon Section */}
      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg opacity-60">
              <h3 className="font-medium mb-2">Daily Challenges</h3>
              <p className="text-sm text-muted-foreground">
                Compete in daily coding challenges and earn bonus points
              </p>
            </div>
            <div className="p-4 border rounded-lg opacity-60">
              <h3 className="font-medium mb-2">Study Groups</h3>
              <p className="text-sm text-muted-foreground">
                Join or create study groups with fellow learners
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SocialHub;