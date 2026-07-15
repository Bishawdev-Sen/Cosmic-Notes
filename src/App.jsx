import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';
import { router } from './routes';
import { useEffect } from 'react';
import { useStorageStore, useNotesStore, useGraphStore, useSettingsStore } from './store';

function App() {
  const loadFromStorage = useStorageStore(state => state.loadFromStorage);
  const initNotes = useNotesStore(state => state.initNotes);
  const initEdges = useGraphStore(state => state.initEdges);
  const initSettings = useSettingsStore(state => state.initSettings);
  const settings = useSettingsStore(state => state.settings);

  useEffect(() => {
    const data = loadFromStorage();
    if (data) {
      initNotes(data.notes || []);
      initEdges(data.edges || []);
      initSettings(data.settings || {});
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', settings.theme);
  }, [settings.theme]);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
