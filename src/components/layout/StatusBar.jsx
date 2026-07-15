import { useStorageStore } from '../../store';
import { Database, CheckCircle2, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function StatusBar() {
  const lastSaved = useStorageStore(state => state.lastSaved);
  const [timeAgo, setTimeAgo] = useState('Just now');

  useEffect(() => {
    if (!lastSaved) return;
    const interval = setInterval(() => {
      const seconds = Math.floor((new Date() - new Date(lastSaved)) / 1000);
      if (seconds < 60) setTimeAgo('Just now');
      else if (seconds < 3600) setTimeAgo(`${Math.floor(seconds / 60)}m ago`);
      else setTimeAgo(`${Math.floor(seconds / 3600)}h ago`);
    }, 10000);
    return () => clearInterval(interval);
  }, [lastSaved]);

  return (
    <div className="h-8 border-t border-primary/10 bg-surface/50 shrink-0 flex items-center justify-between px-4 text-[10px] text-primary/50 uppercase tracking-widest font-medium z-30 relative">
      <div className="flex items-center gap-4">
        <span>Cosmic Note v1.0</span>
        <span className="flex items-center gap-1">
          <Database className="h-3 w-3" /> Local Storage
        </span>
      </div>
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1">
          {lastSaved ? <CheckCircle2 className="h-3 w-3 text-green-500" /> : <Clock className="h-3 w-3" />}
          {lastSaved ? `Saved ${timeAgo}` : 'Waiting to save...'}
        </span>
      </div>
    </div>
  );
}
