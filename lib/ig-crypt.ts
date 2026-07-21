// lib/ig-crypt.ts - bikin response kayak IG aa-encrypted
export function encryptHTML(html: string): string {
  const encoded = html
    .split("")
    .map(c => "\\u" + c.charCodeAt(0).toString(16).padStart(4, "0"))
    .join("");
  return `for(;;);{"__sylvor":1,"type":"vault_payload","payload":"${encoded}","decrypt":"sylvor_vault_decrypt"}<script>!function(){var e=document.documentElement;if(e){var t=e.innerHTML;try{var o=JSON.parse(t.match(/"payload":"(.*?)"/)[1].replace(/\\\\u/g,"\\u")); /* fallback */}catch{}} }();/* REAL DECRYPT DI CLIENT */</script>`;
}
export function aaEncode(html: string) {
  const b64 = Buffer.from(html).toString("base64");
  return `<script>ﾟωﾟﾉ=/｀ｍ´）ﾉ~┻━┻//*´∇｀*/['_'];o=(ﾟｰﾟ)=_=3;c=(ﾟΘﾟ)=(ﾟｰﾟ)- (ﾟｰﾟ);(ﾟДﾟ)=(ﾟΘﾟ)=(o^_^o)/(o^_^o);(ﾟДﾟ)={ﾟΘﾟ:'_',ﾟωﾟﾉ:((ﾟωﾟﾉ==3)+'_')[ﾟΘﾟ],ﾟｰﾟﾉ:(ﾟωﾟﾉ+'_')[o^_^o-(ﾟΘﾟ)],ﾟДﾟﾉ:((ﾟｰﾟ==3)+'_')[ﾟｰﾟ]};(ﾟДﾟ)[ﾟΘﾟ]=((ﾟωﾟﾉ==3)+'_')[c^_^o];(ﾟДﾟ)['c']=((ﾟДﾟ)+'_')[(ﾟｰﾟ)+(ﾟｰﾟ)+(ﾟΘﾟ)];(ﾟДﾟ)['o']=((ﾟДﾟ)+'_')[ﾟΘﾟ];(ﾟoﾟ)=(ﾟДﾟ)['c']+(ﾟДﾟ)['o']+(ﾟωﾟﾉ+'_')[ﾟΘﾟ]+((ﾟωﾟﾉ==3)+'_')[ﾟΘﾟ]+(ﾟДﾟ)['o']+((ﾟｰﾟ==3)+'_')[(ﾟｰﾟ)- (ﾟΘﾟ)]+(ﾟДﾟ)['c']+(ﾟДﾟ)['o']+(ﾟωﾟﾉ+'_')[ﾟΘﾟ]+(ﾟДﾟ)['o']+((ﾟｰﾟ==3)+'_')[ﾟΘﾟ];(ﾟДﾟ)['x']=o^_^o;eval(atob("${b64}"));/* Sylvor Vault Encrypted */</script>`;
}