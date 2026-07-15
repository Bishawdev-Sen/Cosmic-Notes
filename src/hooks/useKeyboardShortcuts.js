import { useEffect } from 'react';

export const useKeyboardShortcuts = (actions) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const cmdOrCtrl = isMac ? e.metaKey : e.ctrlKey;

      if (cmdOrCtrl && e.key.toLowerCase() === 'n') {
        e.preventDefault();
        actions.onNewNote?.();
      } else if (cmdOrCtrl && e.key.toLowerCase() === 'd') {
        e.preventDefault();
        actions.onDuplicate?.();
      } else if (cmdOrCtrl && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        actions.onSelectAll?.();
      } else if (cmdOrCtrl && e.key.toLowerCase() === 'f') {
        e.preventDefault();
        actions.onSearch?.();
      } else if (e.key === 'Delete') {
        e.preventDefault();
        actions.onDelete?.();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        actions.onEscape?.();
      } else if (!cmdOrCtrl && e.key.toLowerCase() === 'f') {
        e.preventDefault();
        actions.onToggleFavorite?.();
      } else if (!cmdOrCtrl && e.key.toLowerCase() === 'p') {
        e.preventDefault();
        actions.onTogglePin?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [actions]);
};
