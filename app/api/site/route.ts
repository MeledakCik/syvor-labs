import { NextRequest, NextResponse } from "next/server";
function forbid(){ return new NextResponse(`for(;;);{"__ar":1,"error":1357004}`,{status:200,headers:{"Content-Type":"text/javascript"}}); }
export async function GET(req: NextRequest){
  const chain=req.cookies.get("sylvor_chain")?.value;
  const siteCookie=req.cookies.get("sylvor_site_token")?.value;
  const siteHeader=req.headers.get("x-site-token")||req.headers.get("x-sylvor-site-token");
  if(chain!=="f"||!siteCookie) return forbid();
  if(siteHeader&&siteCookie!==siteHeader) return forbid();
  return NextResponse.json({site:"sylvor_labs",status:"active",ts:Date.now()});
}