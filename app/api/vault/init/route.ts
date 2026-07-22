import { NextRequest, NextResponse } from "next/server";
function forbid(){ return new NextResponse(`for(;;);{"__ar":1,"error":1357004}`,{status:200,headers:{"Content-Type":"text/javascript","x-security-policy":"enforced"}}); }
export async function GET(req: NextRequest){
  const chain = req.cookies.get("sylvor_chain")?.value || "0";
  const siteToken = req.cookies.get("sylvor_site_token")?.value;
  const code = req.nextUrl.searchParams.get("code")||"";
  if(chain!=="0"||!siteToken) return forbid();
  try{ const d=atob(code); if(!d.includes(siteToken.slice(0,8))) throw new Error(); }catch{ return forbid(); }
  const sid=Math.random().toString(36).slice(2);
  const isProd=process.env.NODE_ENV==="production";
  const res=NextResponse.json({ok:1});
  res.cookies.set("sylvor_vault","1",{httpOnly:true,secure:isProd,sameSite:"lax",path:"/",maxAge:600});
  res.cookies.set("sylvor_sid",sid,{httpOnly:true,secure:isProd,sameSite:"lax",path:"/",maxAge:600});
  res.cookies.set("sylvor_chain","a",{httpOnly:true,secure:isProd,sameSite:"lax",path:"/",maxAge:600});
  return res;
}