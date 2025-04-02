"use client"

import { use, useEffect } from 'react'
import styled from './style.module.scss'
import {RefreshCw} from 'lucide-react'
import {ModalOrder} from '@/app/dashboard/components/modal/modal'
import { OrderContent } from '@/providers/orderModal'
import {useRouter} from 'next/navigation'
import { toast } from 'sonner'


export default function Orders({ ordens }){
    const {isOpen, onRequstOpen} = use(OrderContent);
    const router = useRouter()


    async function HandleOpen(item_id){
      await onRequstOpen(item_id)

    }

   

    function handleRefresh(){
        router.refresh()
        toast.success('PEDIDOS ATUALIZADO COM SUCESSO!',{
            style:{
                backgroundColor:'green'
            }
        })
    }

    useEffect( ()=> {

        const atualizarCarregamento = setInterval( ()=> {
            handleRefresh();
                },60000)

        return ()=> clearInterval(atualizarCarregamento)

    }, [])

    

    return(
        
        <>
        
        <main className={styled.container}>


            <section className={styled.OrderscontainerHeader}>

                <h1 className={styled.h1}>Últimos Pedidos</h1>
                <button className={styled.button} onClick={handleRefresh}>
                    <RefreshCw size={24} color='#3fffa3'/>
                </button>
                
            </section>

            <section className={styled.listaOrder}>
                {ordens.length === 0 && (
                  <div className={styled.noOrdersMessage}>
                  <span>NENHUM PEDIDO ABERTO NO MOMENTO</span>
                </div>
                )}

                {ordens.map( order => (

                     <button key={order.id} className={styled.OrderItem} onClick={ ()=> HandleOpen(order.id)}>
                     <div className={styled.tag}></div>
                     <span className={styled.mesa}>Mesa {order.numero_mesa} </span>
                     </button>
     
                ))}



             
            </section>


       

        </main>
       {isOpen && <ModalOrder/> } 
        </>
    )
}