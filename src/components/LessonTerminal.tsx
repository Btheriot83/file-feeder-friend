import { useRef, useEffect, useState } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import 'xterm/css/xterm.css';

interface LessonTerminalProps {
  className?: string;
}

export function LessonTerminal({ className = "" }: LessonTerminalProps) {
  const termRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<Terminal | null>(null);
  const fitAddonRef = useRef<FitAddon | null>(null);
  const [currentInput, setCurrentInput] = useState('');
  const [conversation, setConversation] = useState<Array<{role: string, content: string}>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (!termRef.current) return;

    // Initialize terminal
    const terminal = new Terminal({
      theme: {
        background: '#1a1a1a',
        foreground: '#ffffff',
        cursor: '#00ff00',
      },
      fontSize: 14,
      fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
      cursorBlink: true,
      allowTransparency: true,
    });

    const fitAddon = new FitAddon();
    terminal.loadAddon(fitAddon);

    terminal.open(termRef.current);
    fitAddon.fit();

    terminalRef.current = terminal;
    fitAddonRef.current = fitAddon;

    // Welcome message
    terminal.writeln('\x1b[32m╔═══════════════════════════════════════════════════════════════╗\x1b[0m');
    terminal.writeln('\x1b[32m║              🤖 Claude Code Sim Terminal v1.0                 ║\x1b[0m');
    terminal.writeln('\x1b[32m║                 ClaudeCode Mastery Program                    ║\x1b[0m');
    terminal.writeln('\x1b[32m╚═══════════════════════════════════════════════════════════════╝\x1b[0m');
    terminal.writeln('');
    terminal.writeln('\x1b[36mWelcome to Claude Code Sim! I\'m here to help you learn coding.\x1b[0m');
    terminal.writeln('\x1b[36mAsk me about programming concepts, debug code, or get examples!\x1b[0m');
    terminal.writeln('');
    writePrompt();

    // Handle keyboard input
    terminal.onKey(({ key, domEvent }) => {
      const printable = !domEvent.altKey && !domEvent.ctrlKey && !domEvent.metaKey;

      if (domEvent.keyCode === 13) { // Enter
        if (currentInput.trim() && !isLoading) {
          handleCommand(currentInput.trim());
        }
        } else if (domEvent.keyCode === 8) { // Backspace
          if (currentInput.length > 0) {
            const newInput = currentInput.slice(0, -1);
            setCurrentInput(newInput);
            terminal.write('\b \b');
          }
      } else if (printable) {
        const newInput = currentInput + key;
        setCurrentInput(newInput);
        terminal.write(key);
      }
    });

    // Handle resize
    const handleResize = () => {
      fitAddon.fit();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      terminal.dispose();
    };
  }, []);

  const writePrompt = () => {
    if (terminalRef.current) {
      terminalRef.current.write('\x1b[33mclaude-sim> \x1b[0m');
    }
  };

  const handleCommand = async (input: string) => {
    if (!terminalRef.current) return;

    setCurrentInput('');
    terminalRef.current.writeln('');
    
    // Handle special commands
    if (input.toLowerCase() === 'clear') {
      terminalRef.current.clear();
      writePrompt();
      return;
    }

    if (input.toLowerCase() === 'help') {
      terminalRef.current.writeln('\x1b[36mAvailable commands:\x1b[0m');
      terminalRef.current.writeln('  help    - Show this help message');
      terminalRef.current.writeln('  clear   - Clear the terminal');
      terminalRef.current.writeln('  exit    - Clear conversation history');
      terminalRef.current.writeln('');
      terminalRef.current.writeln('\x1b[36mOr just ask me anything about coding!\x1b[0m');
      terminalRef.current.writeln('');
      writePrompt();
      return;
    }

    if (input.toLowerCase() === 'exit') {
      setConversation([]);
      terminalRef.current.writeln('\x1b[36mConversation history cleared.\x1b[0m');
      terminalRef.current.writeln('');
      writePrompt();
      return;
    }

    // Show loading indicator
    setIsLoading(true);
    terminalRef.current.writeln('\x1b[90mClaude is thinking...\x1b[0m');

    try {
      const { data, error } = await supabase.functions.invoke('claude-chat', {
        body: { 
          prompt: input,
          conversation: conversation
        }
      });

      if (error) {
        throw error;
      }

      if (data.success) {
        // Update conversation history
        setConversation(data.conversation || []);
        
        // Display Claude's response
        terminalRef.current.writeln('');
        terminalRef.current.writeln('\x1b[32m🤖 Claude:\x1b[0m');
        
        // Format and display the response with typing effect
        const lines = data.message.split('\n');
        for (const line of lines) {
          terminalRef.current.writeln(`\x1b[37m${line}\x1b[0m`);
        }
        
      } else {
        throw new Error(data.error || 'Failed to get response');
      }
    } catch (error) {
      console.error('Terminal error:', error);
      terminalRef.current.writeln('');
      terminalRef.current.writeln('\x1b[31m❌ Error: Unable to connect to Claude. Please try again.\x1b[0m');
      
      toast({
        variant: "destructive",
        title: "Connection Error",
        description: "Failed to connect to Claude. Please check your connection.",
      });
    } finally {
      setIsLoading(false);
      terminalRef.current.writeln('');
      writePrompt();
    }
  };

  return (
    <div className={`terminal-container ${className}`}>
      <div 
        ref={termRef} 
        className="w-full h-64 rounded-lg border border-border bg-[#1a1a1a] p-2"
        style={{ minHeight: '300px' }}
      />
    </div>
  );
}