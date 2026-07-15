import { useCallback, useMemo, useState } from 'react';
import { ReactFlow, useNodesState, useEdgesState, addEdge, applyNodeChanges, applyEdgeChanges, Background, Controls, MiniMap, useReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useNotesStore, useGraphStore, useSearchStore, getFilteredNotes, useSettingsStore, useUiStore } from '../../store';
import StarNode from './StarNode';
import PlanetNode from './PlanetNode';
import EdgeConnection from './EdgeConnection';
import BackgroundStars from './BackgroundStars';
import BackgroundNebula from './BackgroundNebula';
import CanvasControls from './CanvasControls';
import SelectionBox from './SelectionBox';
import InspectorPanel from '../layout/InspectorPanel';
import { useKeyboardShortcuts } from '../../hooks/useKeyboardShortcuts';
import { Modal, Button } from '../ui';
import { AnimatePresence } from 'framer-motion';
import { PanelLeftOpen } from 'lucide-react';

const nodeTypes = {
  star: StarNode,
  planet: PlanetNode,
};

const edgeTypes = {
  custom: EdgeConnection,
};

export default function GalaxyCanvas() {
  const { setCenter, getViewport } = useReactFlow();
  
  // Use a custom hook or subscription for getFilteredNotes to ensure re-renders
  // Since getFilteredNotes isn't a simple zustand selector, we can select the dependencies
  // and call it to get the derived state.
  const allNotes = useNotesStore(state => state.notes);
  const searchState = useSearchStore(state => state);
  const notes = useMemo(() => getFilteredNotes(), [allNotes, searchState]);
  
  const createNote = useNotesStore(state => state.createNote);
  const deleteNote = useNotesStore(state => state.deleteNote);
  const duplicateNote = useNotesStore(state => state.duplicateNote);
  const toggleFavorite = useNotesStore(state => state.toggleFavorite);
  const togglePin = useNotesStore(state => state.togglePin);
  
  const edgesData = useGraphStore(state => state.edges);
  const createEdge = useGraphStore(state => state.createEdge);
  const updateNodePosition = useGraphStore(state => state.updateNodePosition);
  const setViewport = useGraphStore(state => state.setViewport);

  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [selectedEdgeId, setSelectedEdgeId] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // Map notes to ReactFlow nodes
  const nodes = useMemo(() => notes.map(note => ({
    id: note.id,
    type: 'star',
    position: note.position || { x: 0, y: 0 },
    data: { 
      label: note.title, 
      content: note.content,
      color: note.color,
      category: note.category,
    },
    selected: selectedNodeId === note.id,
  })), [notes, selectedNodeId]);

  // Map store edges to ReactFlow edges
  const edges = useMemo(() => edgesData.map(edge => ({
    id: edge.id,
    source: edge.source,
    target: edge.target,
    type: 'custom',
    animated: edge.animated,
    selected: selectedEdgeId === edge.id,
  })), [edgesData, selectedEdgeId]);

  const onNodesChange = useCallback((changes) => {
    changes.forEach((change) => {
      if (change.type === 'position' && change.position) {
        updateNodePosition(change.id, change.position);
      }
    });
  }, [updateNodePosition]);

  const onConnect = useCallback((params) => {
    createEdge(params.source, params.target);
  }, [createEdge]);

  const onMoveEnd = useCallback((event, viewport) => {
    setViewport(viewport);
  }, [setViewport]);

  const onNodeClick = useCallback((_, node) => {
    setSelectedNodeId(node.id);
    setSelectedEdgeId(null);
  }, []);

  const onEdgeClick = useCallback((_, edge) => {
    setSelectedEdgeId(edge.id);
    setSelectedNodeId(null);
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedNodeId(null);
    setSelectedEdgeId(null);
  }, []);

  const handleNewNote = useCallback(() => {
    const { x, y, zoom } = getViewport();
    // Create note in center of viewport
    const id = createNote({
      title: 'New Note',
      position: { x: (-x + window.innerWidth / 2) / zoom, y: (-y + window.innerHeight / 2) / zoom }
    });
    setSelectedNodeId(id);
    setSelectedEdgeId(null);
  }, [createNote, getViewport]);

  const handleDelete = useCallback(() => {
    if (selectedNodeId) {
      setDeleteConfirmId(selectedNodeId);
    } else if (selectedEdgeId) {
      useGraphStore.getState().deleteEdge(selectedEdgeId);
      setSelectedEdgeId(null);
    }
  }, [selectedNodeId, selectedEdgeId]);

  const confirmDelete = () => {
    if (deleteConfirmId) {
      deleteNote(deleteConfirmId);
      setDeleteConfirmId(null);
      setSelectedNodeId(null);
    }
  };

  useKeyboardShortcuts({
    onNewNote: handleNewNote,
    onDelete: handleDelete,
    onDuplicate: () => selectedNodeId && duplicateNote(selectedNodeId),
    onEscape: onPaneClick,
    onToggleFavorite: () => selectedNodeId && toggleFavorite(selectedNodeId),
    onTogglePin: () => selectedNodeId && togglePin(selectedNodeId),
  });

  const settings = useSettingsStore(state => state.settings);
  const setSidebarCollapsed = useUiStore(state => state.setSidebarCollapsed);

  return (
    <div className="w-full h-full relative">
      {(settings.showNebula !== false) && <BackgroundNebula reduceMotion={settings.reduceMotion} />}

      <div className="absolute top-4 left-4 z-20 flex gap-2 items-center">
        <button 
          className="md:hidden p-2 bg-surface/80 backdrop-blur border border-primary/20 rounded-[12px] text-primary focus:outline-none focus:ring-2 focus:ring-primary shadow-sm flex items-center justify-center transition-colors hover:bg-primary/10" 
          onClick={() => setSidebarCollapsed(false)}
          title="Expand Sidebar"
        >
          <PanelLeftOpen className="h-5 w-5" />
        </button>
        <Button onClick={handleNewNote}>+ New Note</Button>
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onConnect={onConnect}
        onMoveEnd={onMoveEnd}
        onNodeClick={onNodeClick}
        onEdgeClick={onEdgeClick}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        panOnScroll={true}
        panOnDrag={true}
        selectionMode="partial"
        selectionKeyCode="Shift"
        multiSelectionKeyCode="Control"
        deleteKeyCode={null} // We handle delete manually
        fitView
      >
        {(settings.showGrid !== false) && <BackgroundStars />}
        <CanvasControls />
        <SelectionBox />
      </ReactFlow>

      <AnimatePresence>
        {selectedNodeId && (
          <InspectorPanel 
            key="inspector"
            selectedId={selectedNodeId} 
            onClose={() => setSelectedNodeId(null)}
            onConfirmDelete={(id) => setDeleteConfirmId(id)}
          />
        )}
      </AnimatePresence>

      <Modal 
        isOpen={!!deleteConfirmId} 
        onClose={() => setDeleteConfirmId(null)} 
        title="Delete Note"
      >
        <p className="mb-6 text-sm text-primary/80">Are you sure you want to delete this note? This action can be undone from the Trash.</p>
        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setDeleteConfirmId(null)}>Cancel</Button>
          <Button variant="danger" onClick={confirmDelete}>Delete</Button>
        </div>
      </Modal>
    </div>
  );
}
