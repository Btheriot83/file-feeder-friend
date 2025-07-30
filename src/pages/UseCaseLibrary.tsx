import { Header } from "@/components/Layout/Header";
import { Sidebar } from "@/components/Layout/Sidebar";
import { UseCaseLibrary as UseCaseLibraryComponent } from "@/components/Dashboard/UseCaseLibrary";

const UseCaseLibrary = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2">Use Case Library</h1>
              <p className="text-muted-foreground">
                Explore real-world examples and practical implementations to enhance your Claude Code skills
              </p>
            </div>
            <UseCaseLibraryComponent />
          </div>
        </main>
      </div>
    </div>
  );
};

export default UseCaseLibrary;