// UserLayout.jsx
import { Link } from "react-router-dom";
import UserHeader from "./UserHeader";
import UserFooter from "./UserFooter";

function UserLayout({ children }) {
  return (
    <>
      {/* <Header />
      <nav style={{ margin: "1rem", display: "flex", gap: "1rem" }}>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/layout">Layout</Link>
      </nav>
      <main>{children}</main>
      <Footer /> */}
      <UserHeader />
      {children}
      <UserFooter />
    </>
  );
}

export default UserLayout;