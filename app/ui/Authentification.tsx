import React from "react";
import '@/app/ui/styles/homeAuthentification.css';
import Button from "@/app/ui/Button";
import Logo from "@/app/ui/Logo";
const Authentification: React.FC = () => {
    return (
        <div className="auth">
        <div className="auth-container">
            <div className="auth-vector">
                <img src="/png/auth.jpg" />
            </div>
            <div className="auth-card">
                <div className="header">
                    <Logo />
                    <hr />
                </div>
                <h2>Welcome Back!</h2>  
                <form className="auth-form">
                <input type="email" placeholder="Email" required />
                <input type="password" placeholder="Password" required />
                <Button type="submit" variant="primary" className="button">Login</Button>
            </form>
            <p className="auth-footer">
                Don&apos;t have an account? <a href="/signup">Sign Up</a>
            </p>
            </div>
            
        </div>
        <div className="auth-vector">
            
        </div>
        </div>
    );
}
export default Authentification;
