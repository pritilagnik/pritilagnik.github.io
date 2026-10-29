import {createRoot} from 'react-dom/client';
import {StandalonePage} from './StandalonePage';
import {AdminDashboard} from './components/AdminDashboard';
import './index.css';

createRoot(document.getElementById('root')!).render(<StandalonePage><AdminDashboard /></StandalonePage>);
