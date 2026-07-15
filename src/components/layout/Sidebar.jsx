import { useUiStore, useStatisticsStore, useSearchStore, getFilteredNotes, useNotesStore, useGraphStore } from '../../store';
import { SearchInput, Button, Badge } from '../ui';
import { LayoutDashboard, Compass, Star, Settings, Tag, Folder, Activity, ChevronLeft, ChevronRight, Search, Trash2, HelpCircle, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const { sidebarCollapsed, setSidebarCollapsed } = useUiStore();
  const { query, setQuery, activeFilters, setFilter, clearFilters } = useSearchStore();
  const navigate = useNavigate();
  const location = useLocation();
  
  const allNotes = useNotesStore(state => state.notes);
  const searchState = useSearchStore(state => state);
  const edges = useGraphStore(state => state.edges);
  
  const stats = useMemo(() => useStatisticsStore.getState().getStats(), [allNotes, edges]);
  const filteredCount = useMemo(() => getFilteredNotes().length, [allNotes, searchState]);
  
  const isFiltering = query || activeFilters.category || activeFilters.tag || activeFilters.favorite || activeFilters.pinned;

  const navItems = [
    { icon: Compass, label: 'Galaxy Canvas', path: '/' },
    { icon: Star, label: 'Favorites', path: '/favorites' },
    { icon: Trash2, label: 'Trash', path: '/trash' },
  ];

  const bottomNavItems = [
    { icon: Settings, label: 'Settings', path: '/settings' },
    { icon: HelpCircle, label: 'Help', path: '/help' },
    { icon: Info, label: 'About', path: '/about' },
  ];

  const isMobile = window.innerWidth < 768;

  return (
    <>
      {/* Mobile overlay */}
      {!sidebarCollapsed && (
        <div 
          className="md:hidden fixed inset-0 bg-background/50 z-40 backdrop-blur-sm"
          onClick={() => setSidebarCollapsed(true)}
        />
      )}
      <motion.div 
        initial={false}
        animate={{ 
          width: sidebarCollapsed ? (isMobile ? 0 : 64) : (isMobile ? '100%' : 280),
          x: sidebarCollapsed && isMobile ? -300 : 0
        }}
        className={`h-full bg-surface border-r border-primary/10 flex flex-col transition-colors z-50 shrink-0 absolute md:relative left-0 top-0 overflow-hidden shadow-2xl md:shadow-none`}
      >
        <div className="p-4 flex items-center justify-between border-b border-primary/5 shrink-0 h-[73px]">
        <AnimatePresence>
          {!sidebarCollapsed && (
            <motion.h2 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="font-bold text-lg whitespace-nowrap overflow-hidden"
            >
              Cosmic Note
            </motion.h2>
          )}
        </AnimatePresence>
        <button 
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="p-1 hover:bg-primary/10 rounded text-primary/70 transition-colors focus:outline-none focus:ring-2 focus:ring-primary md:block hidden"
        >
          {sidebarCollapsed ? <ChevronRight /> : <ChevronLeft />}
        </button>
        <button 
          onClick={() => setSidebarCollapsed(true)}
          className="p-1 hover:bg-primary/10 rounded text-primary/70 transition-colors focus:outline-none focus:ring-2 focus:ring-primary md:hidden block"
        >
          <ChevronLeft />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden p-3 flex flex-col gap-6">
        {/* Search */}
        {!sidebarCollapsed ? (
          <div>
            <SearchInput 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search universe (Ctrl+F)..." 
              className="w-full"
            />
            {isFiltering && (
              <div className="flex justify-between items-center mt-2 px-1">
                <span className="text-xs text-primary/60">{filteredCount} results</span>
                <button onClick={clearFilters} className="text-xs text-accent hover:underline">Clear</button>
              </div>
            )}
          </div>
        ) : (
          <button onClick={() => setSidebarCollapsed(false)} className="w-full p-2 flex justify-center hover:bg-primary/10 rounded transition-colors text-primary/70 focus:outline-none focus:ring-2 focus:ring-primary">
            <Search className="h-5 w-5" />
          </button>
        )}

        {/* Navigation */}
        <div className="flex flex-col gap-1">
          {!sidebarCollapsed && <span className="text-xs font-semibold text-primary/50 uppercase ml-2 mb-1">Navigation</span>}
          {navItems.map((item, idx) => {
            const isActive = location.pathname === item.path;
            return (
              <button 
                key={idx}
                onClick={() => navigate(item.path)}
                className={`flex items-center gap-3 p-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${isActive ? 'bg-primary/20 text-primary' : 'hover:bg-primary/10 text-primary/70'}`}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {!sidebarCollapsed && (
                  <div className="flex-1 flex items-center justify-between overflow-hidden">
                    <span className="truncate">{item.label}</span>
                    {item.badge && <Badge variant="accent" className="scale-75">{item.badge}</Badge>}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Bottom Nav Items */}
        <div className="flex flex-col gap-1 mt-4">
          {bottomNavItems.map((item, idx) => {
            const isActive = location.pathname === item.path;
            return (
              <button 
                key={idx}
                onClick={() => navigate(item.path)}
                className={`flex items-center gap-3 p-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${isActive ? 'bg-primary/20 text-primary' : 'hover:bg-primary/10 text-primary/70'}`}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {!sidebarCollapsed && <span className="truncate">{item.label}</span>}
              </button>
            );
          })}
        </div>

        {/* Statistics */}
        {!sidebarCollapsed && (
          <div className="mt-auto">
            <span className="text-xs font-semibold text-primary/50 uppercase ml-2 mb-2 block">Statistics</span>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-background rounded-lg p-3 text-center border border-primary/5">
                <div className="text-2xl font-bold">{stats.totalNotes}</div>
                <div className="text-[10px] text-primary/50 uppercase">Stars</div>
              </div>
              <div className="bg-background rounded-lg p-3 text-center border border-primary/5">
                <div className="text-2xl font-bold">{stats.totalConnections}</div>
                <div className="text-[10px] text-primary/50 uppercase">Edges</div>
              </div>
              <div className="bg-background rounded-lg p-3 text-center border border-primary/5">
                <div className="text-2xl font-bold">{stats.totalCategories}</div>
                <div className="text-[10px] text-primary/50 uppercase">Galaxies</div>
              </div>
              <div className="bg-background rounded-lg p-3 text-center border border-primary/5">
                <div className="text-2xl font-bold">{stats.totalTags}</div>
                <div className="text-[10px] text-primary/50 uppercase">Tags</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
    </>
  );
}
