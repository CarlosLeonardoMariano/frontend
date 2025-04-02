"use client"
import styles from './styles.module.scss'
import { useFormStatus } from 'react-dom'


export function Button({name}){

    const {pending} = useFormStatus();

      return(
        <button type='submit' disabled={pending} className={styles.button}>
            { pending ? "CARREGANDO..." : name}
        </button>
      )
}