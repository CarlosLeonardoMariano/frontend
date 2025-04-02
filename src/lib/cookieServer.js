// lib/cookieServer.js
import { cookies } from "next/headers";

export async function getCookieServers() {

    const cookiesStorage = await cookies();

    const token = cookiesStorage.get("tokens")?.value;
    
    return token || null; // Retorna o valor do token ou null
}
