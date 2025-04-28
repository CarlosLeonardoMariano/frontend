import { use } from 'react'
import styled from './styled.module.scss'
import { X } from 'lucide-react'
import { OrderContent } from '@/providers/orderModal'



export function ModalOrder(id){

    const {onRequstClose,order, finalizarPedido} = use(OrderContent);



    function HandleClose(){
        onRequstClose()
    }

    async function finalizarPedidoOrder() {
        const total = calculateTotalOrder(); // Calcula o valor total do pedido
        console.log('TOTAL:', total);
      
        // Pega o valor atual de entradas
        let entradasAtual = localStorage.getItem('entradas');
      
        if (!entradasAtual || isNaN(parseFloat(entradasAtual))) {
          entradasAtual = '0'; // Força ser '0' se não existir ou for inválido
        }
      
        const entradaNova = parseFloat(entradasAtual) + total;
        localStorage.setItem('entradas', entradaNova.toString());
      
        // Finaliza o pedido
        await finalizarPedido(order[0].ordem.id);
      }

        function calculateTotalOrder(){
            return order.reduce((total, item) => {
                const itemPrice = parseFloat(item.produts.price.replace('R$', '').replace('.', '').replace(',','.'));
                const itemTotal = itemPrice * (item.quantidade || 1);
                return total + itemTotal;
            }, 0); // Começa a soma com 0
        }

    return(
        <dialog className={styled.dialogContainer}>


            <section className={styled.dialogContent}>

                <div className={styled.flex}>

                        <button className={styled.button} onClick={HandleClose}>
                        <X size={40} color='red'/>
                        </button>

                <h2> Detalhes dos Pedidos</h2>

                        </div>
                        <span className={styled.cliente}> <b>Cliente:</b> {order[0].ordem.name || 'Nome não informado...'}  </span>

                <article className={styled.container}>
                    

                    <span className={styled.mesa}>
                    <b>  Mesa: { order[0].ordem.numero_mesa }</b>
                    </span>

                      
                    {order.map( (item, index)=> (
                        
                    <section className={styled.item} key={item.id}>
<div className={styled.alinha}>


    <span className={styled.title}> {index + 1} - <b> {item.produts.name} </b> </span>
    
    <span className={styled.title2}>Quantidade: <b> {item.quantidade} </b> </span>
   
     </div>
     <span className={styled.description}>{item.produts.descricao}</span>


                    </section>


                    ))}
                   
                    
                    <h3 className={styled.valorTotal}>
                        <b>Valor total:</b>  R$ {calculateTotalOrder().toFixed(2)}
                    </h3>

                    <button className={styled.concluirPedido} onClick={finalizarPedidoOrder} >
                        Concluir Pedido
                    </button>
                   
                </article>
            </section>
        </dialog>

    )
}