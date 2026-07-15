import Sidebar from './Sidebar';
import StatusBar from './StatusBar';
import { PanelLeftOpen } from 'lucide-react';
import { useUiStore } from '../../store';

export default function PageLayout({ children, title }) {
  const setSidebarCollapsed = useUiStore(state => state.setSidebarCollapsed);

  return (
    <div className="w-full h-screen bg-background relative overflow-hidden flex flex-col">
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-4 md:p-8 relative flex flex-col min-w-0">
          <div className="flex items-center gap-4 mb-6 shrink-0">
            <button 
              className="md:hidden p-2 bg-surface border border-primary/20 rounded-[12px] text-primary focus:outline-none focus:ring-2 focus:ring-primary shadow-sm hover:bg-primary/10 transition-colors" 
              onClick={() => setSidebarCollapsed(false)}
              title="Expand Sidebar"
            >
              <PanelLeftOpen className="h-5 w-5" />
            </button>
            {title && <h1 className="text-2xl md:text-3xl font-bold text-primary truncate">{title}</h1>}
          </div>
          <div className="flex-1 min-w-0">
            {children}
          </div>
        </main>
      </div>
      <StatusBar />
    </div>
  );
}
