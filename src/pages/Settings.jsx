import PageLayout from '../components/layout/PageLayout';
import { useSettingsStore, useStorageStore } from '../store';
import { Card, Switch, Button, Badge } from '../components/ui';
import { Palette, Zap, Download, Upload, Database } from 'lucide-react';
import { toast } from 'sonner';

export default function Settings() {
  const { settings, updateSettings } = useSettingsStore();
  const exportData = useStorageStore(state => state.exportData);
  const importData = useStorageStore(state => state.importData);

  const handleExport = () => {
    const data = exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cosmic-note-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Backup exported successfully');
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const success = importData(event.target.result);
        if (success) {
          toast.success('Data imported successfully. Reloading...');
          setTimeout(() => window.location.reload(), 1000);
        } else {
          toast.error('Invalid backup file structure.');
        }
      } catch (err) {
        toast.error('Failed to parse backup file.');
      }
    };
    reader.readAsText(file);
    e.target.value = ''; // Reset input
  };

  return (
    <PageLayout title="Settings">
      <div className="max-w-3xl flex flex-col gap-6 pb-12">
        
        <section>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Palette className="h-5 w-5 text-primary/70" /> Appearance
          </h2>
          <Card className="flex flex-col gap-6">
            <div>
              <label className="text-sm font-medium mb-3 block">Theme</label>
              <div className="flex flex-wrap gap-3">
                {['deep-space', 'purple-nebula', 'aurora', 'solar-eclipse'].map(theme => (
                  <button
                    key={theme}
                    onClick={() => updateSettings({ theme })}
                    className={`px-4 py-2 rounded-[12px] text-sm font-medium border-2 transition-all capitalize ${
                      settings.theme === theme ? 'border-primary bg-primary/10 text-primary' : 'border-primary/20 hover:border-primary/50 text-primary/70'
                    }`}
                  >
                    {theme.replace('-', ' ')}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex items-center justify-between py-4 border-t border-primary/10">
              <div>
                <div className="font-medium">Reduced Motion</div>
                <div className="text-sm text-primary/60">Disable ambient animations to improve performance</div>
              </div>
              <Switch checked={settings.reduceMotion} onChange={(e) => updateSettings({ reduceMotion: e.target.checked })} />
            </div>

            <div className="flex items-center justify-between py-4 border-t border-primary/10">
              <div>
                <div className="font-medium">Show Grid</div>
                <div className="text-sm text-primary/60">Display the background grid on the galaxy canvas</div>
              </div>
              <Switch checked={settings.showGrid} onChange={(e) => updateSettings({ showGrid: e.target.checked })} />
            </div>

            <div className="flex items-center justify-between py-4 border-t border-primary/10">
              <div>
                <div className="font-medium">Autosave Delay</div>
                <div className="text-sm text-primary/60">How quickly changes are saved to local storage</div>
              </div>
              <select 
                className="bg-background border border-primary/20 rounded-[8px] px-3 py-1.5 text-sm text-primary focus:outline-none focus:border-primary"
                value={settings.autosaveDelay}
                onChange={(e) => updateSettings({ autosaveDelay: Number(e.target.value) })}
              >
                <option value={100}>Aggressive (100ms)</option>
                <option value={300}>Normal (300ms)</option>
                <option value={1000}>Relaxed (1s)</option>
                <option value={5000}>Lazy (5s)</option>
              </select>
            </div>
          </Card>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Database className="h-5 w-5 text-primary/70" /> Data & Storage
          </h2>
          <Card className="flex flex-col gap-6">
            <div className="flex gap-4">
              <Button variant="secondary" onClick={handleExport} className="flex-1">
                <Download className="h-4 w-4 mr-2" /> Export Backup
              </Button>
              <div className="flex-1 relative">
                <input 
                  type="file" 
                  accept=".json" 
                  onChange={handleImport} 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                  title="Import Backup"
                />
                <Button variant="outline" className="w-full pointer-events-none">
                  <Upload className="h-4 w-4 mr-2" /> Import Backup
                </Button>
              </div>
            </div>
            <div className="text-xs text-primary/50 bg-background p-3 rounded-[12px] border border-primary/10 flex flex-col gap-1">
              <span className="font-semibold text-primary/70">Storage Info</span>
              <span>All data is saved locally on your device in your browser's localStorage.</span>
              <span>Clearing site data will permanently delete your notes unless exported.</span>
            </div>
          </Card>
        </section>
      </div>
    </PageLayout>
  );
}
