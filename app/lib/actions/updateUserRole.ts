'user server';
import { createClient } from "../supabase/server";
import { getRole } from "../auth/getRole";
import{ createClient as createAdminClient} from "@supabase/supabase-js";

export async function updateUserRole(
    targetUserId:string,
    newRole:"student"|"teacher"|"admin"
){
    const supabase = await createClient();
    const{data:{user}}= await supabase.auth.getUser();
    if(!user){
        throw new Error("not authorized");
    }
    const role=getRole(user);
    if(role!=="admin"){
        throw new Error("not authorized");
    }
    const adminClient = createAdminClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const{error}=await adminClient.auth.admin.updateUserById(
        targetUserId,{app_metadata:{role:newRole},}
    );
    if(error){
        throw error;
    }

    await supabase.from("AuditLog").insert({
        actorId:user.id,
        actorRole:role,
        action:"PROMOTE_ROLE",
        targetId:targetUserId,
        targetRole:newRole,
        createdAt:new Date()
    });
    return {sucess:true};
}