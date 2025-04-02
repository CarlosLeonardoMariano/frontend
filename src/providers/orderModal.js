"use client"
import { createContext, ReactNode, useState } from "react";
import { api } from "@/sevices/api";
import { getCookieClient } from "@/lib/cookieClient";
import { toast } from "sonner";
import {useRouter} from "next/navigation"


export const OrderContent = createContext({})

export function OrderProvider({children}){


    const [isOpen, setIsOpen] = useState(false)
    const [order, setOrder] = useState([])
    const router = useRouter();



   async function onRequstOpen(item_id){

    const token = await getCookieClient();

    const response = await api.get('/ordem/detalhes',{
        params:{
            item_id: item_id
        },

        headers:{
            Authorization: `Bearer ${token}`
        }
    })

        console.log(response.data)
        setOrder(response.data)
        setIsOpen(true)
    }

    function onRequstClose(){
        setIsOpen(false)
    }

    
    async function finalizarPedido(id) {

        const token = await getCookieClient();
        
        const data = {
            id: id
        }

        try{
            const response = await api.put("/order/finalizado", data, {
                headers:{
                   Authorization: `Bearer ${token}`
                }
            })
            console.log(response.data)

        }catch(err){
            console.log(err)
            toast.error("FALHA AO FINALIZAR ESSE PEDIDO!",{

                style:{backgroundColor: "red"}
            })
            return;
        };

        toast.success('PEDIDO FINALIZADO COM SUCESSO!',{

            style:{ backgroundColor: "green" }
        });
        router.refresh();
        setIsOpen(false);        
        
    }


    return(
        <OrderContent  value={{isOpen, onRequstOpen, onRequstClose, order, finalizarPedido}}>
           
            {children}
        </OrderContent>
    )
}