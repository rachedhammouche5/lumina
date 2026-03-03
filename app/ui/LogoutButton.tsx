'use client';
import { useRouter } from "next/navigation";
import { createClient } from "../lib/supabase/client";
import Button from "./Button";
import { useState } from "react";

export default function LogoutButton(){
    const router= useRouter();
    const [loading,setLoading]=useState(false);
    const[errorMsg,setErrorMsg]=useState<string | null>(null);

    const handleLogout = async()=>{
        setLoading(true);
        setErrorMsg(null);
        const supabase = createClient();
       const{error}= await supabase.auth.signOut({scope:'global'});
       if(error){
        console.error("logout failed :",error.message);
        setErrorMsg("logout failed. Please try again...");
        setLoading(false);
        return;
       }
        router.replace('/');
        router.refresh();
    };
    return(
        <>
        <Button variant="ghost" onClick={handleLogout} disabled={loading}>
            {loading ? "logging out...": "Logout"}
            
        </Button>
        {errorMsg && <p style={{color:"red"}}>{errorMsg}</p>}
        </>
        
    )
} 