import { Header } from "@/components/Layout/Header";
import { Sidebar } from "@/components/Layout/Sidebar";
import { WelcomeSection } from "@/components/Dashboard/WelcomeSection";
import { CurrentModule } from "@/components/Dashboard/CurrentModule";
import { UseCaseLibrary } from "@/components/Dashboard/UseCaseLibrary";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 space-y-6">
          <WelcomeSection />
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <CurrentModule />
            <UseCaseLibrary />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
