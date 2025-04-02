import styles from './styles.module.scss'
import {Button } from '../components/button/index.js'
import { api } from '@/sevices/api'
import { getCookieServers } from '@/lib/cookieServer' 
import {redirect} from 'next/navigation'


export default function Categorias(){

    async function handleRegisterCategoria(FormData) {
        "use server"
        const name = FormData.get("name")

            if(name === '') return;

            const data = {
                name: name,
            }

            const token = await getCookieServers();

            const response = await api.post('/categorias', data, {
                headers:{
                    Authorization : `Bearer ${token}`
                }
        
            }).catch( (err)=> {
                console.log(err)
                return;
            })

            redirect('/dashboard')

        }
    return(
        <main className={styles.container}>
            <h1 className={styles.h1} >Nova Categoria</h1>

            <form action={handleRegisterCategoria}>
                <input type='text' name='name' placeholder='Nome da categoria, ex: Pizzas' required 
                className={styles.input}>
                
                </input>

                <Button name="Cadastrar"/>
            </form>
        </main>
    )
}