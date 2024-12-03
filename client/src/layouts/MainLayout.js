import Nav from "../components/Nav";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
export default function MainLayout() {
    return (
        <>
            <ScrollToTop />
            <Nav />
            <Outlet />
            <Footer />
        </>
    );
}
