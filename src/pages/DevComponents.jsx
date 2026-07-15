import { useState } from 'react';
import { Button, Input, SearchInput, TextArea, Card, Badge, Tooltip, Modal, Tabs, Checkbox, Switch, Skeleton, TextSkeleton, EmptyState, ErrorState } from '../components/ui';
import { Ghost, Star } from 'lucide-react';
import { toast } from 'sonner';

export default function DevComponents() {
  const [modalOpen, setModalOpen] = useState(false);
  const [checked, setChecked] = useState(true);
  const [switchOn, setSwitchOn] = useState(false);

  return (
    <div className="min-h-screen bg-background text-primary p-8 overflow-y-auto pb-24">
      <h1 className="text-4xl font-bold mb-8">UI Components Showcase</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 border-b border-primary/20 pb-2">Buttons</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="danger">Danger</Button>
          <Button loading>Loading</Button>
          <Button disabled>Disabled</Button>
          <Button size="sm">Small</Button>
          <Button size="lg">Large</Button>
          <Button size="icon"><Star className="h-5 w-5" /></Button>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 border-b border-primary/20 pb-2">Inputs & Controls</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
          <Input placeholder="Standard input..." />
          <Input placeholder="Error input..." error="This field is required" />
          <SearchInput placeholder="Search notes..." />
          <TextArea placeholder="Text area..." />
        </div>
        <div className="flex gap-8 mt-6">
          <Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)} label="Include deleted notes" />
          <Switch checked={switchOn} onChange={(e) => setSwitchOn(e.target.checked)} label="Enable animations" />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 border-b border-primary/20 pb-2">Badges & Tooltips</h2>
        <div className="flex gap-4 items-center">
          <Badge variant="primary">Primary Badge</Badge>
          <Badge variant="secondary">Secondary Badge</Badge>
          <Badge variant="accent">Accent Badge</Badge>
          
          <div className="ml-8">
            <Tooltip content="This is a tooltip!" position="top">
              <span className="underline decoration-dashed cursor-help">Hover me</span>
            </Tooltip>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 border-b border-primary/20 pb-2">Cards & Tabs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
          <Card>
            <h3 className="text-xl font-bold mb-2">Note Card</h3>
            <p className="text-sm opacity-80 mb-4">Cards have soft shadows and rounded corners (20px).</p>
            <Button variant="secondary" size="sm">Action</Button>
          </Card>
          
          <Card>
            <Tabs 
              tabs={[
                { id: 'tab1', label: 'Recent', content: <div className="p-2 text-sm">Recent notes appear here.</div> },
                { id: 'tab2', label: 'Favorites', content: <div className="p-2 text-sm">Your favorite notes.</div> },
              ]} 
              defaultTab="tab1" 
            />
          </Card>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 border-b border-primary/20 pb-2">States & Feedback</h2>
        <div className="flex gap-4 mb-6">
          <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
          <Button onClick={() => toast('Saved successfully!', { description: 'Your note was synced.' })}>Show Toast</Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
          <EmptyState 
            icon={Ghost} 
            title="No notes found" 
            description="It's quiet out here in space. Create a note to get started." 
            action={<Button>Create Note</Button>} 
          />
          <ErrorState 
            title="Connection lost" 
            message="We couldn't sync your changes. Please check your connection."
            onRetry={() => alert('Retrying...')}
          />
        </div>
      </section>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 border-b border-primary/20 pb-2">Skeletons</h2>
        <div className="max-w-md">
          <Card>
            <Skeleton className="h-6 w-3/4 mb-4" />
            <TextSkeleton lines={3} />
          </Card>
        </div>
      </section>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Create New Tag">
        <p className="mb-4 text-sm opacity-80">Add a new tag to organize your notes.</p>
        <Input placeholder="Tag name..." className="mb-4" />
        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Button>
          <Button onClick={() => setModalOpen(false)}>Create</Button>
        </div>
      </Modal>
    </div>
  );
}
