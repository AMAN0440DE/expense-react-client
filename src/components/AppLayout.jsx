import { Children } from "react";
import Footer from "./Footer";
import Header from "./Header";

function AppLayout({ children}) {
    return(
        <>
            <Header />
            {Children}
            <Footer />
        </>
    );
}
export default AppLayout;