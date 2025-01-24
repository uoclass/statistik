import { Outlet } from "react-router-dom";
import Header from "./Header";
import Nav from "./Nav";
import Footer from "./Footer";
import "./Layout.css";

function Layout() {
  return (
    <div className="App">
      <div className="App-content">
        <Header />
        <Nav />
        <div className="App-body">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
