import { NextRequest, NextResponse } from "next/server";
function forbid(){ return new NextResponse(`for(;;);{"__ar":1,"error":1357004}`,{status:200,headers:{"Content-Type":"text/javascript","x-security-policy":"enforced"}}); }
export async function GET(req: NextRequest){
  const chain=req.cookies.get("sylvor_chain")?.value;
  if(chain!=="c") return forbid(); // harus habis attest
  const isProd=process.env.NODE_ENV==="production";
  const res=NextResponse.json({identity:{available:true},market:{available:true},vault:{available:true}});
  res.cookies.set("sylvor_chain","d",{httpOnly:true,secure:isProd,sameSite:"lax",path:"/",maxAge:600});
  return res;
}