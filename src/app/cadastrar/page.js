import styles from "../page.module.scss";
import Link from "next/link";
import { api } from "@/sevices/api";
import { redirect} from "next/navigation";

export default function Cadastrar() {
  
  async function handlerRegister(FormData){
    "use server"
    
    const name = FormData.get('name')
    const email = FormData.get('email')
    const senha = FormData.get('senha')

      if(email === '' || senha === ''){
        return;
      }

      try{
      const response = await api.post("/usuarios",{
          name:name,
          email: email,
          senha: senha,
        })
        console.log(response.data)

      }catch(erro){

        if(erro.response && erro.response.status === 400){
          console.log('EMAIL JÁ CADASTRADO')
          return;
        }
      
        console.log('Erro ao cadastrar:', erro)
        return;
      }

      redirect('/')

    }
  

  return (
    <>
      <div className={styles.containerCenter}>

        <div className={styles.logoTotal}>
          Atende<p className={styles.p}>Pro</p>
        </div>

        <section className={styles.login}>

          <h1 className={styles.h1}>Criando sua conta</h1>

          <form className={styles.formulario} action={handlerRegister}> 
            
            
            <input
              type="text"
              required
              name="name"
              placeholder="Digite seu nome"
              className={styles.input}
        
            />

            <input
              type="email"
              required
              name="email"
              placeholder="Digite seu email"
              className={styles.input}
            />

            <input
              type="password"
              required
              name="senha"
              placeholder="***********"
              className={styles.input}
            />

            <button type="submit" className={styles.acessar}>
              Criar Conta
            </button>

          </form>

          <div className={styles.link}>
            <p>Já possui uma conta?</p>
            <Link href="/" className={styles.links}>Login</Link>
          </div>

        </section>
      </div>
    </>
  );
}
