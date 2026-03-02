import { redirect } from 'next/navigation';
import { createClient } from '../lib/supabase/server';
import LogoutButton from "@/app/ui/LogoutButton";
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
     const role = user.user_metadata.role;
     if(role!=="student"){
        redirect("/");
     }
    return (<div>
        <p>students page </p>
        <LogoutButton />
    </div>
    );
}
