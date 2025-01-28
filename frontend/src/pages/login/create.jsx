import React from "react";

export default function CreateAccount() {
    return (
        <div className="form-create">
            <img src="cenro image.png" alt="Cenro" className="img-cenro" />
            <form action="#">
                <h1>Create Account</h1>
                <p>Kindly fill out the Form to create an account</p>
                
                <div className="input-label">
                    <label htmlFor="first-name">First Name</label>
                    <input type="text" id="first-name" placeholder="First Name" />
                    
                    <label htmlFor="middle-name">Middle Name</label>
                    <input type="text" id="middle-name" placeholder="Middle Name" />
                    
                    <label htmlFor="last-name">Last Name</label>
                    <input type="text" id="last-name" placeholder="Last Name" />
                </div>

                <div className="input-label">
                    <label htmlFor="birth-date">Birth Date</label>
                    <input type="date" id="birth-date" />
                </div>
                
                <div className="input-label">
                    <label htmlFor="address">Address</label>
                    <input type="text" id="address" placeholder="House No." />
                    <input type="text" id="street" placeholder="Street" />
                    <input type="text" id="barangay" placeholder="Barangay" />
                    <input type="text" id="city" placeholder="San Juan City" />
                </div>
                
                <div className="input-label">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" placeholder="Enter your Email" />
                    
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder="Enter your Password" />
                </div>
    
                <div className="input-label">
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input type="password" id="confirm-password" placeholder="Confirm your Password" />
                </div>
    
                <div className="btn-create">
                    <button type="submit">Create an Account</button>
                </div>
                <div className="a-cancel">
                    <a href="#">Cancel</a>
                </div>
            </form>
        </div>
    );
}