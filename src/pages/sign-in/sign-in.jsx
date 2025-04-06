import React, {useState, useEffect} from "react";
import axios from "axios";
import GoogleLogo from "../../assets/images/GoogleLogo.png";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./sign-in.css";
 
export const SignIn = () => {
    const [values, setValues] = useState({
        email: "",
        password: ""
      });
 
      const handleInputChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        setValues((values) => ({
          ...values,
          [name]: value
        }));
      };

     axios.defaults.withCredentials = true;
      useEffect(()=>{
         axios.get("http://localhost:3000/api/auth/signin")
         .then((response) => {
            if(response.data.valid){
                window.location.assign(
                 "http://localhost:3000/api"
                )    
            }
         })
         .catch(err => {
            console.error(err);
         })
      },[]);

      const [submitted, setSubmitted] = useState(false);
      const [valid, setValid] = useState(false);

      const handleSubmit = (e) => {
      e.preventDefault();
      if ( values.email && values.password) {
        setValid(true);
      }
      setSubmitted(true);
      
      axios.post("http://localhost:3000/api/auth/signin", values)
      .then((response) => {
        if(response.data.signin){
             window.location.assign( "/")
        }else{
            alert("Invalid credentials")
        }
      })
      .catch((error) => {
        console.error(error);
      })
     };

    return (
        <>
            <section className="form-container vh-80">
                <div className="container-fluid h-custom"> 
                    <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                    <form className="signin-form" onSubmit={handleSubmit}>
                    {
                        submitted && valid && (
                        <div className="success-message">
                        <h3>Welcome!</h3>
                        </div>
                    )}
                    {
                        !submitted && !valid && (<div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-center">
                                        <p className="lead fw-bold mb-0 me-3">Sign in with</p>
                                          <a href="https://accounts.google.com" target="_blank"> 
                                            <img src={GoogleLogo} alt="" width={28} height={30}/> 
                                            </a>
                                         </div>
                                         )
                     }
                    {
                        !submitted && !valid && (
                            <div className="divider d-flex align-items-center my-4">
                               <p className="text-center fw-bold mx-3 mb-0">Or</p>
                            </div> 
                        )
                    }
                    <div data-mdb-input-init  className="form-input">
                    {!valid && (
                        <input type="email"  className="form-field form-control mb-4"
                                placeholder="Enter email address"  
                                name="email" 
                                value={values.email}
                                onChange={handleInputChange}
                        />
                    )}
                     {submitted && !values.email && (
                        <span id="email-error">Please enter an email address.</span>
                     )}
                     {!valid && (
                        <input type="password"  className="form-field form-control  mb-3"
                                placeholder="Enter password"
                                name="password" 
                                value={values.password}
                                onChange={handleInputChange}
                        />
                    )}
                        {submitted && !values.password && (
                            <span id="email-error">Please enter a password.</span>
                        )}
                    </div>
                    <div className="text-center text-lg-center mt-2">
                        {!valid && (
                            <button  type="submit" data-mdb-button-init   className="form-field"
                            style={{paddingLeft: '24px', paddingRight: '24px'}}>Sign In</button>
                        )} 
                    </div>
                    </form>
                    </div>
                    </div>
               </div> 
           </section> 
        </>
     );
};
