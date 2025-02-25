import { Outlet } from "react-router-dom";
import Header from "./Header";
import Nav from "./Nav";
import Footer from "./Footer";
import "./Layout.css";

function Layout() {
  return (
    <div className="App [&_input:focus]:ring-0 [&_input]:border-0 [&_select:focus]:ring-0 [&_select]:border-0">
      <img src="gradientHeader.svg" />
      <div className="App-content">
        <Header />
        <Nav />
        <div className="App-body">
          <Outlet />
        </div>
        <Footer />
      </div>
      <img src="gradientFooter.svg" />
    </div>
  );
}

export default Layout;
