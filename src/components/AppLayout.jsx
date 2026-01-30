// Home.jsx
// function Home() {
//   return (
//     <div className="container">
//       <h3 className="text-center">Welcome to Expense App</h3>
//     </div>
//   );
// }
// export default Home;

import Header from "./UserHeader";
import Footer from "./UserFooter";
// AppLayout.jsx
function AppLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

export default AppLayout;