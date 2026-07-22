import { NextRequest, NextResponse } from "next/server";
function forbid(){ return new NextResponse(`for(;;);{"__ar":1,"error":1357004}`,{status:200,headers:{"Content-Type":"text/javascript"}}); }
export async function GET(req: NextRequest){
  if(req.cookies.get("sylvor_chain")?.value!=="d") return forbid();
  const isProd=process.env.NODE_ENV==="production";
  const res=NextResponse.json({ok:1});
  res.cookies.set("sylvor_chain","e",{httpOnly:true,secure:isProd,sameSite:"lax",path:"/",maxAge:600});
  return res;
}