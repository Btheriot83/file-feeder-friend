import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import { useNavigate, useLocation } from "react-router-dom";
import { Header } from "@/components/Layout/Header";
import { Sidebar } from "@/components/Layout/Sidebar";
import { WelcomeSection } from "@/components/Dashboard/WelcomeSection";
import { CurrentLevel } from "@/components/Dashboard/CurrentModule";
import { Home, BookOpen, Library, Users, User } from "lucide-react";

const Index = () => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Set active tab based on current route
  const getActiveTab = () => {
    switch (location.pathname) {
      case "/social":
        return "social";
      case "/use-case-library":
        return "library";
      default:
        return "home";
    }
  };
  
  const [activeTab, setActiveTab] = useState(getActiveTab());

  const navigateNextLevel = () => {
    // Add logic to navigate to next level
    console.log("Navigate to next level");
  };

  const navigatePrevLevel = () => {
    // Add logic to navigate to previous level
    console.log("Navigate to previous level");
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => navigateNextLevel(),
    onSwipedRight: () => navigatePrevLevel(),
    trackMouse: true,
  });

  const tabItems = [
    { id: "home", label: "Home", icon: Home, path: "/" },
    { id: "levels", label: "Levels", icon: BookOpen, path: "/levels" },
    { id: "library", label: "Library", icon: Library, path: "/use-case-library" },
    { id: "social", label: "Social", icon: Users, path: "/social" },
    { id: "profile", label: "Profile", icon: User, path: "/profile" },
  ];

  const handleTabClick = (tabId: string, path: string) => {
    setActiveTab(tabId);
    if (path !== location.pathname) {
      navigate(path);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div {...handlers} className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)]">
        <aside className="w-full md:w-1/3 hidden md:block md:sticky md:top-0 md:h-screen md:overflow-y-auto">
          <Sidebar />
        </aside>
        <main className="w-full md:w-2/3 p-2 md:p-4 space-y-4 pb-20 md:pb-4 overflow-y-auto">
          <WelcomeSection />
          <CurrentLevel />
        </main>
      </div>
      
      {/* Mobile Bottom Tab Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border md:hidden z-50 h-16">
        <div className="flex justify-around items-center h-full px-2">
          {tabItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id, item.path)}
                className={`flex flex-col items-center justify-center space-y-1 p-2 rounded-lg transition-colors min-h-[3rem] ${
                  activeTab === item.id
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Index;
