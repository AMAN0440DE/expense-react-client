// import Student from "./pages/examples/Student";
// import Student1 from "./pages/examples/Student1";
// import Student2 from "./pages/examples/Student2";
// import UserCard from "./pages/examples/practice/UserCard";
// import ProductList from "./pages/examples/practice/ProductList";
// import EngineeringTeam from "./pages/examples/practice/EngineeringTeam";
// import { useState } from "react";
// import LoginPage from "./pages/LoginPage";


// function App(){
//   const [visible, setVisible] = useState(true);
//   const [showLogin, setShowLogin] = useState(false);

//   const studentList = [
//     { rollNumber: 1, name: "Alice" },
//     { rollNumber: 2, name: "Bob" },
//     { rollNumber: 3, name: "Charlie" }
//   ];

//   const handleClick = () => {
//     setVisible(!visible);
//   };
//   const products = [
//     { id: 1, name: "Laptop", price: 89999, category: "Electronics" },
//     { id: 2, name: "Coffee Maker", price: 5049, category: "Home" },
//     { id: 3, name: "Smartphone", price: 68899, category: "Electronics" }
//   ];

//   const employees = [
//     { id: 101, name: "Alice", department: "Engineering", active: true },
//     { id: 102, name: "Bob", department: "Design", active: false },
//     { id: 103, name: "Charlie", department: "Engineering", active: true },
//     { id: 104, name: "David", department: "HR", active: true }
//   ];

//   // If login page is shown, display login page
//   if (showLogin) {
//     return <LoginPage onBackClick={() => setShowLogin(false)} />;
//   }

//   return (
//     <>
//         {/* Login Button - Top Right Corner */}
//         <div style={{ position: "fixed", top: "20px", right: "20px", zIndex: 1000 }}>
//           <button 
//             className="btn btn-primary" 
//             onClick={() => setShowLogin(true)}
//           >
//             Login
//           </button>
//         </div>

//         <h1>Welcome to Expense App</h1>    
//         <Student />
//         <Student1 />
//         <Student1 name = "John" rollNumber = {20} />
//         <Student2 />

//         <h2>User Cards</h2>   
//         <UserCard name="Aman" age={28} location="Boston" isPremium={true} />
//         <UserCard name="Bob" age={35} location="Chennai" isPremium={false} />
//         <UserCard name="John" age={24} location="Singapore" isPremium={true} />

//         <ProductList products={products} />

//         <EngineeringTeam employees={employees} />

//         {/* Hide Student Section */}
//         <div>
//           <button onClick={handleClick}>Hide Student</button>

//           {visible && (
//             <>
//               {studentList.map((s) => (
//                 <p key={s.rollNumber}>
//                   Roll Number: {s.rollNumber}
//                   <br/>
//                   Name: {s.name}
//                 </p>
//               ))}
//             </>
//           )}
//         </div>
//     </>
//   )
// }

// export default App;

// app.jsx is parent level component

// import Containers from "react-bootsrap/Container";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
// import { useState } from "react";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import LayoutPage from "./pages/LayoutPage"; // create this page
import AppLayout from "./components/AppLayout";
import UserLayout from "./components/UserLayout";
import Logout from "./pages/Logout";
import { useEffect, useState } from "react";
import axios from "axios";
import Register from "./pages/Register";
import { useSelector, useDispatch } from "react-redux";
import { SET_USER } from "./redux/user/action";


function App() {
  // const [userDetails, setUserDetails] = useState(null);
  const userDetails = useSelector((state) => state.userDetails);
  const dispatch = useDispatch();

  const setUserDetails = (user) => {
    dispatch({
      type: SET_USER,
      payload: user,
    });
  };
  const [loading, setLoading] = useState(true);

  const isUserLoggedIn = async () => {
    try {
      const response = await axios.post('http://localhost:5001/auth/is-user-logged-in',
        {}, { withCredentials: true });
      // setUserDetails(response.data.user);
      dispatch({
        type: SET_USER,
        payload: response.data.user
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  };
  useEffect(() => {
    isUserLoggedIn();
  }, []);

  if (loading) {
    return (
      <div className="container text-center mt-5">
        <div className="spinner-border text-primary"></div>
        <p>Verifying session...</p>
      </div>
    );
  }
  return (

    <Routes>
      <Route
        path="/"
        element={
          userDetails ? (
            <Navigate to="/dashboard" />
          ) : (
            <AppLayout>
              <Home />
            </AppLayout>
          )
        }
      />
      <Route
        path="/login"
        element={
          userDetails ? (
            <Navigate to="/dashboard" />
          ) : (
            <AppLayout>
              <Login setUser={setUserDetails} />
            </AppLayout>
          )
        }
      />
      <Route
        path="/dashboard"
        element={
          userDetails ? (
            <UserLayout>
              <Dashboard user={userDetails} />
            </UserLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/layout"
        element={
          userDetails ? (
            <UserLayout>
              <LayoutPage />
            </UserLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/logout"
        element={
          userDetails ? (
            <Logout setUser={setUserDetails} />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/register"
        element={
          userDetails ? (
            <Navigate to="/dashboard" />
          ) : (
            <AppLayout>
              <Register setUser={setUserDetails} />
            </AppLayout>
          )
        }
      />


    </Routes>

  );
}

export default App;

// react router dom monitors the change in URL and whatever changes made it renders the same on browser