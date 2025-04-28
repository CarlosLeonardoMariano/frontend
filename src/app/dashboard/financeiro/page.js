'use client'

import styles from './financeiro.module.scss';  
import { useEffect, useState } from 'react';




export default function Financeiro() {
  const [entradas, setEntradas] = useState(0);

  useEffect(()=>{
    const entradasStorage = localStorage.getItem('entradas');
    if (!entradasStorage || isNaN(parseFloat(entradasStorage))) {
      setEntradas(0);
    } else {
      setEntradas(parseFloat(entradasStorage));
    }
  },[])
  
  return (
    <div className={styles.financeiroContainer}>
      <h1 className={styles.title}>Controle Financeiro</h1>

      <div className={styles.gridContainer}>
        <div className={`${styles.card} ${styles.saldo}`}>
          <h2>Saldo Atual</h2>
          <p>R$ </p>
        </div>

        <div className={`${styles.card} ${styles.entradas}`}>
          <h2>Entradas Hoje </h2>
          <p>R$ {entradas.toFixed(2)}</p>
        </div>

        <div className={`${styles.card} ${styles.saidas}`}>
          <h2>Saídas Hoje</h2>
          <p>R$</p>
        </div>
      </div>

      <div className={styles.movimentacoes}>
        <h2 className={styles.h2Movimentaçoes}>Movimentações do dia</h2>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Valor</th>
              <th>Tipo</th>
              <th>Hora</th>
            </tr>
          </thead>
          <tbody>
            <tr>
                <td>
                Pedido #001
                </td>

                <td>
                R$ 92.00
                </td>

                <td>
                Entrada
                </td>

                <td>
                18:05
                </td>
                
            </tr>
            
          </tbody>
        </table>
      </div>

      <div className={styles.buttons}>
        <button className={`${styles.btn} ${styles.btnEntrada}`}>Nova Entrada</button>
        <button className={`${styles.btn} ${styles.btnSaida}`}>Nova Saída</button>
      </div>
    </div>
  );
}
