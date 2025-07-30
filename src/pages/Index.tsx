import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Upload, Share2, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

const Index = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { theme, setTheme } = useTheme();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      simulateUpload();
    }
  };

  const simulateUpload = () => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) clearInterval(interval);
    }, 300);
    // In real: Feed file to Claude API via fetch/post
  };

  const handleShare = () => {
    alert('Sharing file processing results...'); // Integrate with social APIs
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="p-4 border-b flex justify-between items-center">
        <h1 className="text-2xl font-bold">File Feeder Friend</h1>
        <div className="flex items-center gap-2">
          <Sun className="h-4 w-4" />
          <Switch checked={theme === 'dark'} onCheckedChange={toggleTheme} />
          <Moon className="h-4 w-4" />
        </div>
      </header>
      <main className="container mx-auto p-4 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={uploadProgress} className="w-full" />
            <p className="mt-2">Upload Progress: {uploadProgress}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Feed a File</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input type="file" onChange={handleFileChange} className="max-w-md" />
            <Button disabled={!file}>
              <Upload className="mr-2 h-4 w-4" /> Feed to Friend (Claude)
            </Button>
            <Button variant="outline" onClick={handleShare}>
              <Share2 className="mr-2 h-4 w-4" /> Share Results
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Index;
