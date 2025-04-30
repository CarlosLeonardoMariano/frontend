'use client'

import styles from './financeiro.module.scss';  
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';



export default function Financeiro() {
  const [pedidos, setPedidos] = useState([]);

  const router = useRouter();

  // Cálculos dinâmicos baseados nas movimentações
  const entradas = pedidos
    .filter(pedido => pedido.tipo === 'Entrada')
    .reduce((total, pedido) => total + pedido.valor, 0);

  const saidas = pedidos
    .filter(pedido => pedido.tipo === 'Saída')
    .reduce((total, pedido) => total + pedido.valor, 0);

  const saldoAtual = entradas - saidas;






  useEffect(() => {
    const movimentacoesStorage = localStorage.getItem('movimentacoes');
    if (movimentacoesStorage) {
      setPedidos(JSON.parse(movimentacoesStorage));
    }
  }, []);








  // FUNÇÃO PARA ADICIONAR DINHEIRO NO CAIXA

  function handleADDfinanceiro() {
    const valorPositivo = parseFloat(prompt('Digite um valor para adicionar ao seu caixa:'));
    if (isNaN(valorPositivo) || valorPositivo <= 0) {
 
      toast.warning('Por favor, insira um valor numérico válido antes de continuar.',{
        style:{
          backgroundColor:'red',
          color:'white',
          border:'none'
        },
        duration:1500
      })
      return;
    } else{
      toast.success('Valor adicionado ao seu caixa com sucessos !',{
        style:{
          backgroundColor:'green',
          color:'white',
          border:'none'
        },
        duration:1500
      })

    }

    const novaMovimentacao = {
      id: Date.now(),
      descricao: 'Entrada do Proprietário',
      valor: valorPositivo,
      tipo: 'Entrada',
      origem: 'manual',
      hora: new Date().toLocaleTimeString(),
    };

    const novasMovimentacoes = [...pedidos, novaMovimentacao];
    setPedidos(novasMovimentacoes);
    localStorage.setItem('movimentacoes', JSON.stringify(novasMovimentacoes));
  }


















    // FUNÇÃO PARA TIRAR DINHEIRO NO CAIXA


  function handleRemoverfinanceiro() {
    const valorNegativo = parseFloat(prompt('Digite um valor para tirar do seu caixa:'));
    if (isNaN(valorNegativo) || valorNegativo <= 0) {
      toast.warning('Por favor, insira um valor numérico válido antes de continuar.',{
        style:{
          backgroundColor:'red',
          color:'white',
          border:'none'
        },
        duration:1500
      })
      return;
    }

    if (valorNegativo > saldoAtual) {
      toast.error('Você não tem esse valor disponível no seu caixa!',{
        style:{
          background:'red',
          fontWeight:'bold'
        }
      });
      return;
    }

    const novaMovimentacaoNegativo = {
      id: Date.now(),
      descricao: 'Retirada do Proprietário',
      valor: valorNegativo,
      tipo: 'Saída',
      origem: 'manual',
      hora: new Date().toLocaleTimeString(),
    };

    const novasMovimentacoes = [...pedidos, novaMovimentacaoNegativo];
    setPedidos(novasMovimentacoes);
    localStorage.setItem('movimentacoes', JSON.stringify(novasMovimentacoes));
  }

  function handleRemoverlocalStorage(req){

  const movimentacoes = localStorage.getItem('movimentacoes')

  if(!movimentacoes || JSON.parse(movimentacoes).length === 0){
    toast.info('Não há dados para remover.', {
      style: {
        backgroundColor: 'red',
        color: 'white',
        border: 'none'
      },
      duration: 1500
    });
    return;
  }


    localStorage.clear();

    Swal.fire({
      title: 'Deseja realmente excluir essa tabela ?',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#e74c3c',
      cancelButtonColor: '#7f8c8d',
    }).then( (result)=>{
      if(result.isConfirmed){
        localStorage.removeItem('movimentacoes');
        setPedidos([]);

        toast.success('Tabela de movimentações limpa com sucesso!', {
          style: {
            backgroundColor: '#27ae60',
            color: '#fff',
            border: 'none'
          },
          duration: 1500
        });
        router.refresh()

      }
    });
  }

  return (
    <div className={styles.financeiroContainer}>
      <h1 className={styles.title}>Controle Financeiro</h1>

      <div className={styles.gridContainer}>
        <div className={`${styles.card} ${styles.saldo}`}>
          <h2>Saldo Atual</h2>
          <p>R$ {saldoAtual.toFixed(2)}</p>
        </div>

        <div className={`${styles.card} ${styles.entradas}`}>
          <h2>Entradas Hoje</h2>
          <p>R$ {entradas.toFixed(2)}</p>
        </div>

        <div className={`${styles.card} ${styles.saidas}`}>
          <h2>Saídas Hoje</h2>
          <p>R$ {saidas.toFixed(2)}</p>
        </div>
      </div>

      <div className={styles.movimentacoes}>
        <h2 className={styles.h2Movimentaçoes}>Movimentações do dia</h2>
        
        <div className={styles.tableWrapper}>
        <table >
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Valor</th>
              <th>Tipo</th>
              <th>Hora</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((pedido,index) => (
              <tr key={pedido.id}>
                
                <td>
                {pedido.origem === 'manual' ? pedido.descricao : `Pedido #${String(index + 1).padStart(3, '0')}`}
                 </td>

                <td style={{ color: pedido.tipo === 'Entrada' ? 'green' : 'red'}}>
                  R$ {pedido.valor.toFixed(2)}
                </td>

                <td style={{ color: pedido.tipo === 'Entrada' ? 'green' : 'red' }}>
                  {pedido.tipo}
                </td>

                <td>{pedido.hora}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>

      <div className={styles.buttons}>
        <div className={styles.divgap}>
        <button className={`${styles.btn} ${styles.btnEntrada}`} onClick={handleADDfinanceiro}>
          Nova Entrada
        </button>
        <button className={`${styles.btn} ${styles.btnSaida}`} onClick={handleRemoverfinanceiro}>
          Nova Saída
        </button>

        </div>
      

        <div>
<button className={`${styles.btn} ${styles.btnDel}`} onClick={handleRemoverlocalStorage}>
          Limpar Tabela
        </button>
</div>

        
      </div>

      
    </div>
  );
}
