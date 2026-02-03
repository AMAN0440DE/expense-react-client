// import { useState } from "react";
// import axios from "axios"; // <-- import axios

// function Login() {
//   const [formData, setFormData] = useState({
//     email: "",        // empty for the first time user sees the page
//     password: ""
//   });

//   const [errors, setErrors] = useState({}); // track validation errors
//   const [message, setMessage] = useState('');

//   const handleChange = (event) => {
//     const name = event.target.name;   // get the field name
//     const value = event.target.value; // get the field value

//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };  
//   // this function will be triggered whenever user types in the input fields

//   const validate = () => {
//     let newErrors = {};
//     let isValid = true;

//     if (formData.email.length === 0) {
//       newErrors.email = "Email is required";
//       isValid = false;
//     }
//     if (formData.password.length === 0) {
//       newErrors.password = "Password is required";
//       isValid = false;
//     }

//     setErrors(newErrors);
//     return isValid;
//   };

//   const handleFormSubmit = async (event) => {
//     event.preventDefault(); // prevent page reload
//     if (validate()) {
//       try {
//         const body = {
//           email: formData.email,
//           password: formData.password,
//         };
//         const config = { withCredentials: true }; // fixed typo
//         const response = await axios.post("http://localhost:5001/auth/login", body, config);
        
//         console.log(response);
//         setMessage("User authenticated");
//       } catch (error) {
//         console.error(error);
//         setMessage("Login failed");
//       }
//     }
//   };

//   return (
//     <div className="container"> 
//       <h3>Login to continue</h3>
//       {message && <p>{message}</p>}

//       <form onSubmit={handleFormSubmit}>
//         <div>
//           <label>Email:</label>
//           <input 
//             className="form-control"
//             type="text"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//           />
//           {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
//         </div>
//         <div>
//           <label>Password:</label>
//           <input 
//             className="form-control"
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//           />
//           {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
//         </div>
//         <div>
//           <button type="submit" className="btn btn-primary">
//             Login
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default Login;

import { useState } from "react";
import axios from "axios";
import {GoogleOAuthProvider, GoogleLogin} from '@react-oauth/google';

function Login({setUser}) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    let newErrors = {};
    let isValid = true;

    if (formData.email.length === 0) {
      newErrors.email = "Email is required";
      isValid = false;
    }
    if (formData.password.length === 0) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault(); // prevent full page reload
    if (validate()) {
      try {
        const body = {
          email: formData.email,
          password: formData.password,
        };
        const config = { withCredentials: true };

        const response = await axios.post(
          "http://localhost:5001/auth/login",
          body,
          config
        );
        setUser(response.data.user); 

        // console.log(response);
        // setMessage("User authenticated");
      } catch (error) {
        console.error(error);
        console.log(error.response?.data);
        setErrors({
          message: error.response?.data?.message || "Server error"
        });

      }
    }
  };

  const handleGoogleSuccess = async (authResponse) => {
    // console.log(JSON.stringify(authResponse, null, 2));
    try{
      const body = {
        idToken: authResponse?.credential,
      };
      const response = await axios.post(
        "http://localhost:5001/auth/google-auth",
        body,
        { withCredentials: true}
      );
      setUser(response.data.user);
    }catch(error){
      console.log(error);
      setErrors({message: 'Unable to process google sso, please try again'});
    }
  };
  const handleGoogleFailure = (error) => {
    console.log(error);
    setErrors({
      message: "Something went wrong while performing google single sign-on",
    })
  };

  return (
    <div className="container">
      <h3>Login to continue</h3>

      {message && <p style={{ color: "green" }}>{message}</p>}
      {errors.message && <p style={{ color: "red" }}>{errors.message}</p>}

      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Email:</label>
          <input
            className="form-control"
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
        </div>
        <div>
          <label>Password:</label>
          <input
            className="form-control"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
        </div>
        <div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </div>
      </form>
      <div className="row justify-content-center">
        <div className="col-6">
            <GoogleOAuthProvider 
            clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
                <GoogleLogin 
                onSuccess={handleGoogleSuccess} 
                onError={handleGoogleFailure}>
                </GoogleLogin>
            </GoogleOAuthProvider>
        </div>
      </div>
    </div>
  );
}

export default Login;


// if two components needs to communicate with each other the parent component must pass is to child and whenever function called it can inform parent component