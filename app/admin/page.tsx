import { createClient } from "../lib/supabase/server";
import { redirect } from "next/navigation";
import { getRole } from "../lib/auth/getRole";
import LogoutButton from "@/app/ui/LogoutButton";
export default async function adminPage(){
    const supabase = await createClient();

    const{data:{user}}=await supabase.auth.getUser();
    if(!user){
        redirect("/");
    }

    const role=getRole(user);

    if(role!=="admin"){
        redirect("/");
    }

    return(
        <div>
        <h1>Admin Dashboard</h1>
        <LogoutButton />
        </div>
    
    )
}