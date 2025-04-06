import React from "react";
import GoogleLogo from "../../assets/images/GoogleLogo.png";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./sign-in.css";
 

export const SignIn = () => {
    return (
        <>
            <section className="vh-80">
                <div className="container-fluid h-custom"> 
               <div className="row d-flex justify-content-center align-items-center h-100">
                 <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                 <form>
                    <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-center">
                        <p className="lead fw-bold mb-0 me-3">Sign in with</p>
                        <a href="https://mdbootstrap.com/wp-login.php?action=wordpress_social_authenticate&mode=login&provider=Google&redirect_to=https%3A%2F%2Fmdbootstrap.com%2Fdocs%2Fstandard%2Fextended%2Flogin%2F%23section-1" target="_blank">
                            <img src={GoogleLogo} alt="" width={28} height={30}/> 
                        </a>
                    </div>

                   <div className="divider d-flex align-items-center my-4">
                       <p className="text-center fw-bold mx-3 mb-0">Or</p>
                   </div>
                    <div data-mdb-input-init  className="form-input">
                        <input type="email"  className="form-control mb-4 "
                               placeholder="Enter email address" />
                    
                        <input type="password"  className="form-control  mb-3 "
                              placeholder="Enter password" />
                    </div>

                    <div className="text-center text-lg-center mt-2">
                        <button  type="button" data-mdb-button-init   className="btn"
                        style={{paddingLeft: '1.5rem', paddingRight: '1.5rem'}}>Sign In</button>
                    </div>

                </form>
            </div>
          </div>
        </div> 
   
   </section>
    
   </>
  );
};

 