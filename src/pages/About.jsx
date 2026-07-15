import PageLayout from '../components/layout/PageLayout';
import { Card, Badge } from '../components/ui';
import { Compass, Sparkles } from 'lucide-react';

export default function About() {
  return (
    <PageLayout title="About">
      <div className="max-w-2xl flex flex-col gap-6">
        <Card className="flex flex-col items-center justify-center py-12 text-center bg-gradient-to-b from-primary/10 to-transparent border-primary/20">
          <div className="h-20 w-20 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-6 shadow-[0_0_30px_rgba(91,140,255,0.3)]">
            <Compass className="h-10 w-10" />
          </div>
          <h2 className="text-3xl font-bold mb-2">Cosmic Note</h2>
          <Badge variant="accent" className="mb-6">Version 1.0.0</Badge>
          <p className="text-primary/70 max-w-md">
            A premium visual knowledge graph and spatial note-taking system.
            Organize your thoughts like stars in a galaxy, completely offline and private.
          </p>
        </Card>

        <Card className="flex flex-col gap-4">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-accent" /> Philosophy
          </h3>
          <p className="text-sm text-primary/70 leading-relaxed">
            Cosmic Note is built on the idea that knowledge isn't linear. Folders and lists force your brain into rigid structures. A spatial canvas allows ideas to form organic constellations, reflecting how human memory actually works.
          </p>
          <p className="text-sm text-primary/70 leading-relaxed">
            Everything is stored instantly and securely in your browser's local storage. There are no servers, no accounts, and no subscriptions.
          </p>
        </Card>
      </div>
    </PageLayout>
  );
}
