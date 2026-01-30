import Student from "../examples/Student";
import Student1 from "../examples/Student1";
import Student2 from "../examples/Student2";
import UserCard from "../examples/practice/UserCard";
import ProductList from "../examples/practice/ProductList";
import EngineeringTeam from "../examples/practice/EngineeringTeam";
import { useState } from "react";

export default function HomePage({ onLoginClick }) {
  const [visible, setVisible] = useState(true);
  
  const studentList = [
    { rollNumber: 1, name: "Alice" },
    { rollNumber: 2, name: "Bob" },
    { rollNumber: 3, name: "Charlie" }
  ];

  const handleClick = () => {
    setVisible(!visible);
  };

  const products = [
    { id: 1, name: "Laptop", price: 89999, category: "Electronics" },
    { id: 2, name: "Coffee Maker", price: 5049, category: "Home" },
    { id: 3, name: "Smartphone", price: 68899, category: "Electronics" }
  ];

  const employees = [
    { id: 101, name: "Alice", department: "Engineering", active: true },
    { id: 102, name: "Bob", department: "Design", active: false },
    { id: 103, name: "Charlie", department: "Engineering", active: true },
    { id: 104, name: "David", department: "HR", active: true }
  ];

  return (
    <div className="container mt-5">
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4 rounded">
        <div className="container-fluid">
          <a className="navbar-brand fw-bold" href="#">💰 Expense App</a>
          <button className="btn btn-primary" onClick={onLoginClick}>
            Login
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <h1 className="mb-4">Welcome to Expense App</h1>    
      <Student />
      <Student1 />
      <Student1 name="John" rollNumber={20} />
      <Student2 />

      <h2 className="mt-4 mb-3">User Cards</h2>   
      <div className="row mb-4">
        <div className="col-md-4">
          <UserCard name="Aman" age={28} location="Boston" isPremium={true} />
        </div>
        <div className="col-md-4">
          <UserCard name="Bob" age={35} location="Chennai" isPremium={false} />
        </div>
        <div className="col-md-4">
          <UserCard name="John" age={24} location="Singapore" isPremium={true} />
        </div>
      </div>

      <ProductList products={products} />

      <EngineeringTeam employees={employees} />

      {/* Hide Student Section */}
      <div className="card mt-4 p-3">
        <button className="btn btn-success mb-3" onClick={handleClick}>
          {visible ? "Hide Students" : "Show Students"}
        </button>

        {visible && (
          <div>
            {studentList.map((s) => (
              <div key={s.rollNumber} className="alert alert-info">
                Roll Number: {s.rollNumber}
                <br/>
                Name: {s.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
