// middleware.js
import { NextResponse } from "next/server";
import { getCookieServers } from "./lib/cookieServer";
import { api } from "./sevices/api";






export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Ignorando caminhos do Next.js como "/_next" ou a rota raiz "/"
  if (pathname.startsWith("/_next") || pathname === "/") {
    return NextResponse.next();
  }


  const token = await getCookieServers();
  console.log(token);

    if(pathname.startsWith("/dashboard")){

        if(!token){
            return NextResponse.redirect(new URL("/", req.url))
        }

        const isValidate =  await validateToken(token);

    if(!isValidate){
        return NextResponse.redirect(new URL("/", req.url))
    }
        return NextResponse.next();
    }

}


async function validateToken(token) {
    if(!token) return false;

    try{
        await api.get('/info',{

            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        return true;

    } catch(err){
        console.log(err)
        return false;
    }
    
}