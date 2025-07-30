import { Header } from "@/components/Layout/Header";
import { Sidebar } from "@/components/Layout/Sidebar";
import { WelcomeSection } from "@/components/Dashboard/WelcomeSection";
import { CurrentModule } from "@/components/Dashboard/CurrentModule";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 space-y-6">
          <WelcomeSection />
          <CurrentModule />
        </main>
      </div>
    </div>
  );
};

export default Index;
