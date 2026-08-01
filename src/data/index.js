

import galleryContext from "./pages/gallery_page";
//import productosContext from './pages/index_items';

export default (page) => {
    switch (page) {
        case '/Gallery.html':
            return galleryContext;

       // case '/productos.html':
            //return productosContext;

        default:
            return {};
    }
};