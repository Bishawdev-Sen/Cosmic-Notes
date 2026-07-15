import GalaxyCanvas from '../components/graph/GalaxyCanvas';
import Sidebar from '../components/layout/Sidebar';
import StatusBar from '../components/layout/StatusBar';
import { ReactFlowProvider } from '@xyflow/react';

export default function Home() {
  return (
    <div className="w-full h-screen bg-background relative overflow-hidden flex flex-col">
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar />
        <div className="flex-1 relative h-full">
          <ReactFlowProvider>
            <GalaxyCanvas />
          </ReactFlowProvider>
        </div>
      </div>
      <StatusBar />
    </div>
  );
}
