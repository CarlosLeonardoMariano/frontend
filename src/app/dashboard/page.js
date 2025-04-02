import Orders from "./components/ordens/ordem";
import { api } from "@/sevices/api";
import { getCookieServers } from "@/lib/cookieServer";

async function getOrders() {
    const token = await getCookieServers();
    try {
        const response = await api.get("/ordems", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
   
        return response.data || [];
    } catch (err) {
        console.error("Erro ao buscar ordens:", err);
        return [];
    }
}


export default async function Dashboard() {
    const ordem = await getOrders();
    //console.log(ordem); 

    
    
    
    

    return (
        <>
            <main>
                <Orders ordens={ordem} />
                
            </main>
        </>
    );
}