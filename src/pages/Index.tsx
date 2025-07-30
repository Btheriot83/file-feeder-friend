import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import { Header } from "@/components/Layout/Header";
import { Sidebar } from "@/components/Layout/Sidebar";
import { WelcomeSection } from "@/components/Dashboard/WelcomeSection";
import { CurrentModule } from "@/components/Dashboard/CurrentModule";
import { Home, BookOpen, Library, Users, User } from "lucide-react";

const Index = () => {
  const [currentModule, setCurrentModule] = useState(0);
  const [activeTab, setActiveTab] = useState("home");

  const navigateNextModule = () => {
    // Add logic to navigate to next module
    console.log("Navigate to next module");
  };

  const navigatePrevModule = () => {
    // Add logic to navigate to previous module
    console.log("Navigate to previous module");
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => navigateNextModule(),
    onSwipedRight: () => navigatePrevModule(),
    trackMouse: true,
  });

  const tabItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "lessons", label: "Lessons", icon: BookOpen },
    { id: "library", label: "Library", icon: Library },
    { id: "social", label: "Social", icon: Users },
    { id: "profile", label: "Profile", icon: User },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div {...handlers} className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)]">
        <aside className="w-full md:w-1/4 hidden md:block md:sticky md:top-0 md:h-screen md:overflow-y-auto">
          <Sidebar />
        </aside>
        <main className="w-full md:w-3/4 p-4 md:p-6 space-y-6 pb-20 md:pb-6 overflow-y-auto">
          <WelcomeSection />
          <CurrentModule />
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
                onClick={() => setActiveTab(item.id)}
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
