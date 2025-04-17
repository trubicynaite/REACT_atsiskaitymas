import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

import { BrowserRouter } from 'react-router';
import { UsersProvider } from './contexts/UsersContext.tsx';
import { ProductsProvider } from './contexts/ProductsContext.tsx';

createRoot(document.getElementById('root') as HTMLDivElement).render(
    <ProductsProvider>
        <UsersProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </UsersProvider>
    </ProductsProvider>
)
