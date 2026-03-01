'use client';
import { useState } from "react";
import { createClient } from "../lib/supabase/client";
import React from "react";
import '@/app/ui/styles/homeAuthentification.css';
import Button from "@/app/ui/Button";
import Logo from "@/app/ui/Logo";
interface AuthentificationProps{
    onSuccess?:()=>void;
}
const Authentification: React.FC <AuthentificationProps>= ({onSuccess}) => {
    async function handleSubmit(e:React.FormEvent){
        e.preventDefault();
        const { error}=await supabase.auth.signInWithPassword({email,password});

        
        if(!error){
            onSuccess?.();
        }else{
            const invalidCredentialsError = error.message.toLowerCase().includes('invalid email or password');
            setError(invalidCredentialsError?'the email or password is incorrect. Please try again.'
               : 'the email or password is incorrect. Please try again.'
            );
            return;
        }
    }
    const supabase=createClient();
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const[error,setError]=useState('');
    
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
            <form onSubmit={handleSubmit} className="auth-form">
                <input type="email" placeholder="Email" required  value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" required   value={password} onChange={(e) => setPassword(e.target.value)}/>
                <Button type="submit" variant="primary" className="button">Login</Button>
                {error && <p> {error}</p>}
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
