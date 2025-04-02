import styles from "./page.module.scss";
import Link from "next/link";
import { api } from "@/sevices/api";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getMaxAge } from "next/dist/server/image-optimizer";

export default function login() {

 async function handleLogin(FormData){
  "use server"
    
    const email = FormData.get('email')
    const senha = FormData.get('senha')

      if(email === '' || senha === ''){
        return;
      }

      try{
      const response = await api.post("/login",{
          email: email,
          senha: senha,
        })
        
        if(!response.data.token){
          return;
        }

        const expiraToken = 60*60*24*30*1000;
        const cookiesStorage = await cookies()
        cookiesStorage.set('tokens', response.data.token,{
          getMaxAge: expiraToken,
          path: '/',
          httpOnly:false,
          secure: process.env.NODE_ENV === 'production',
        })


        console.log(response.data)
        

      }catch(erro){
        
        console.log(Error)
        console.log('EMAIL OU SENHA INCORRETO')

        return;
      }

      redirect('/dashboard')

    }
  
  return (
    <>
    <div className={styles.containerCenter}>

              <div className={styles.logoTotal}> 
                      Atende<p className={styles.p}>Pro</p>
              </div>
      <section className={styles.login}>
        
        <form className={styles.formulario} action={handleLogin}>
          <input type="email"
          required
          name="email"
          placeholder="Digite seu email"
          className={styles.input}/>



          <input type="password"
          required
          name="senha"
          placeholder="***********"
          className={styles.input}/>


          <button type="submit" className={styles.acessar}>
          Acessar Conta
          </button>

        </form>
    
        <div className={styles.link}>
    <p>Não possui uma conta?</p>
    <Link href="/cadastrar" className={styles.links}>Cadastre-se</Link>
    </div>

           






      </section>
    </div>
      

  
</>
  );
}
