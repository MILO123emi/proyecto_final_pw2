import galleryContext from "./pages/gallery_page";
import aboutContext from "./pages/about_page";

export default (page) => {
    switch (page) {
        case '/Gallery.html':
            return galleryContext;

        case '/About_us.html':
            return aboutContext;

        default:
            return {};
    }
};