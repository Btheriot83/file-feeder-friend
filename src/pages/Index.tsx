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
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      <Header />
      <div {...handlers} className="flex flex-col md:flex-row">
        <aside className="w-full md:w-1/4 hidden md:block">
          <Sidebar />
        </aside>
        <main className="w-full md:w-3/4 p-4 md:p-6 space-y-6">
          <WelcomeSection />
          <CurrentModule />
        </main>
      </div>
      
      {/* Mobile Bottom Tab Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-background border-t md:hidden flex justify-around p-2 z-50">
        {tabItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors ${
                activeTab === item.id
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Index;
