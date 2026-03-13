import { NextResponse } from "next/server";
import {createClient} from "@/lib/supabase/server";


export async function GET(request: Request) {
    const supabase = await createClient();
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") ?? "").toLowerCase();

  let query=supabase
  .from("Skill")
  .select("skl_id,skl_title,skl_dscrptn,skl_duration")
  .order("skl_title",{ascending:true});
  if(q){
    query=query.or(
        `skl_title.ilike.%${q}%,skl_dscrptn.ilike.%${q}%`,
    );
  }
  const {data,error}=await query;
  if(error){
    console.error("[api/skills] Supabase error:",error.message);
    return NextResponse.json({error:"failed to load skills"},{
        status: 500
    });
  }
  const mapped=
  data?.map((row)=>({
    id:row.skl_id,
    title:row.skl_title,
    description:row.skl_dscrptn ?? "no description",
  })) ?? [];
  return NextResponse.json({data:mapped});
}
