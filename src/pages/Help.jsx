import PageLayout from '../components/layout/PageLayout';
import { Card } from '../components/ui';
import { Command, MousePointerClick, Zap } from 'lucide-react';

export default function Help() {
  const shortcuts = [
    { key: 'Ctrl/Cmd + N', action: 'New note' },
    { key: 'Delete', action: 'Delete selected note/connection' },
    { key: 'Ctrl/Cmd + D', action: 'Duplicate note' },
    { key: 'Ctrl/Cmd + A', action: 'Select all nodes' },
    { key: 'Ctrl/Cmd + F', action: 'Focus search' },
    { key: 'Space + Drag', action: 'Pan canvas' },
    { key: 'Ctrl/Cmd + Scroll', action: 'Zoom canvas' },
    { key: 'Escape', action: 'Clear selection / Close inspector' },
    { key: 'F', action: 'Toggle favorite on selected note' },
    { key: 'P', action: 'Toggle pin on selected note' },
  ];

  return (
    <PageLayout title="Help & Shortcuts">
      <div className="max-w-3xl flex flex-col gap-8 pb-12">
        <section>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Command className="h-5 w-5 text-primary/70" /> Keyboard Shortcuts
          </h2>
          <Card className="p-0 overflow-hidden border-primary/20">
            <div className="divide-y divide-primary/10">
              {shortcuts.map((s, i) => (
                <div key={i} className="flex justify-between items-center p-4 hover:bg-primary/5 transition-colors">
                  <span className="text-sm font-medium">{s.action}</span>
                  <kbd className="px-2 py-1 bg-background border border-primary/20 rounded-[6px] text-xs font-mono font-bold text-primary/80">
                    {s.key}
                  </kbd>
                </div>
              ))}
            </div>
          </Card>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <MousePointerClick className="h-5 w-5 text-primary/70" /> Mouse Interactions
          </h2>
          <Card className="flex flex-col gap-4">
            <div className="flex gap-4">
              <div className="w-1/3 font-medium text-sm">Create Connection</div>
              <div className="w-2/3 text-sm text-primary/70">Drag from the bottom handle of one note to the top handle of another note.</div>
            </div>
            <div className="flex gap-4">
              <div className="w-1/3 font-medium text-sm">Select Multiple</div>
              <div className="w-2/3 text-sm text-primary/70">Hold <kbd className="px-1 bg-background rounded text-xs">Shift</kbd> and drag a box on the canvas to select multiple nodes.</div>
            </div>
            <div className="flex gap-4">
              <div className="w-1/3 font-medium text-sm">Edit Note</div>
              <div className="w-2/3 text-sm text-primary/70">Click on any note to open the Inspector Panel on the right.</div>
            </div>
          </Card>
        </section>
      </div>
    </PageLayout>
  );
}
