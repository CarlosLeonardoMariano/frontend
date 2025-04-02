// client-side.js
import { getCookie } from "cookies-next";  // Para o cliente

export function getCookieClient() {
    const token = getCookie("tokens");  // Obtendo o token no cliente
    return token;
}

