import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import Favorites from '../pages/Favorites';
import Trash from '../pages/Trash';
import Settings from '../pages/Settings';
import Help from '../pages/Help';
import About from '../pages/About';
import NotFound from '../pages/NotFound';
import DevComponents from '../pages/DevComponents';

export const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/favorites', element: <Favorites /> },
  { path: '/trash', element: <Trash /> },
  { path: '/settings', element: <Settings /> },
  { path: '/help', element: <Help /> },
  { path: '/about', element: <About /> },
  { path: '/dev/components', element: <DevComponents /> },
  { path: '*', element: <NotFound /> },
]);

