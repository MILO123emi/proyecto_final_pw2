import galleryContext from "./pages/gallery_page";
import aboutContext from "./pages/about_page";
import FAQ from "./pages/FAQ";
import Events from "./pages/Events";
import Help from "./pages/Help";
import Blog from "./pages/Blog";
import StylingCare from "./pages/StyleCare";
 
export default (page) => {
    switch (page) {
        case '/Gallery.html':
            return galleryContext;

        case '/About_us.html':
            return aboutContext;

        case '/FAQ.html':
            return FAQ;

        case '/Events.html':
            return Events;
        
        case "/Help.html":
            return Help

        case "/Blog.html": 
            return Blog 
        
        case "/Styling_care.html": 
            return StylingCare
        default:
            return {};
    }
};