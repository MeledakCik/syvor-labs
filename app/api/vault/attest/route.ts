import { NextRequest, NextResponse } from "next/server";
function forbid(){ return new NextResponse(`for(;;);{"__ar":1,"error":1357004}`,{status:200,headers:{"Content-Type":"text/javascript","x-security-policy":"enforced"}}); }
export async function GET(req: NextRequest){
  if(req.cookies.get("sylvor_chain")?.value!=="b") return forbid();
  const isProd=process.env.NODE_ENV==="production";
  const res=NextResponse.json({ok:1});
  res.cookies.set("sylvor_chain","c",{httpOnly:true,secure:isProd,sameSite:"lax",path:"/",maxAge:600});
  return res;
}