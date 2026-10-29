import {createRoot} from 'react-dom/client';
import {StandalonePage} from './StandalonePage';
import {StatusCheckView} from './components/StatusCheckView';
import './index.css';

createRoot(document.getElementById('root')!).render(<StandalonePage><StatusCheckView /></StandalonePage>);
