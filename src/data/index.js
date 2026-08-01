

import homeContext from './pages/index_page';
import productosContext from './pages/index_items';
import deportesContext from './pages/index_rankings';

export default (page) => {
    switch (page) {
        case '/index.html':
            return homeContext;

        case '/productos.html':
            return productosContext;

        case '/deportes.html':
            return deportesContext

        default:
            return {};
    }
};