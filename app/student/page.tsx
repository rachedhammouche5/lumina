import { redirect } from 'next/navigation';
import { createClient } from '../lib/supabase/server';
import LogoutButton from "@/app/ui/LogoutButton";
import { getRole } from "@/app/lib/auth/getRole";


export default async function studentPage() {
    const supabase = await createClient();
   
    const{ data:{user},error}=await supabase.auth.getUser();
    if(error){
        console.error("Auth error :",error.message);
        redirect("/");
    }
    if(!user){
        redirect("/");
    }
    
    const role = getRole(user);
     if(role!=="student"){
        redirect("/");
     }
    return (<div>
        <p>students page </p>
        <LogoutButton />
    </div>
    );
}
