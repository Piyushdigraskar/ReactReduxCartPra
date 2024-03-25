import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import Store from './Store/Index';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Provider store={Store}>
    <App />
</Provider>);
