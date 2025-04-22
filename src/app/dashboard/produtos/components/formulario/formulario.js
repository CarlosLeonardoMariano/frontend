"use client"
import styles from'@/app/dashboard/produtos/components/formulario/styles.module.scss'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/app/dashboard/components/button'
import { api } from '@/sevices/api'
import {getCookieClient} from '@/lib/cookieClient'
import { toast, Toaster } from 'sonner'
import { useRouter } from 'next/navigation'


export function Formulario({categorias}){
    const router = useRouter();

    const [image, setImage] = useState()
    const [preview, setPreview] = useState("")
    const [price, setPrice] = useState("");

// Função para formatar o preço e armazená-lo
const handlePriceChange = (e) => {
    let value = e.target.value;

    // Remove tudo que não for número
    value = value.replace(/[^\d]/g, '');

    // Se estiver vazio, atualiza com valor limpo
    if (value === '') {
        setPrice('');
        return;
    }

    // Converte para número e divide por 100 para simular as casas decimais
    const numberValue = parseFloat(value) / 100;

    // Converte para string com 2 casas, troca ponto por vírgula
    let formatted = numberValue
        .toFixed(2)                 // "1234.00"
        .replace('.', ',');         // "1234,00"

    // Adiciona pontos como separadores de milhar
    formatted = formatted.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    // Adiciona o prefixo R$
    formatted = 'R$ ' + formatted;

    setPrice(formatted);
};




    async function handleRegisterProdutos(formData) { // Renomeado para evitar conflito com a API FormData
        const categoriaIndex = formData.get("categoria")
        const name = formData.get("name")
        const price = formData.get("price")
        const descricao = formData.get("descricao")

            if(!categoriaIndex || !name || !price || !descricao || !image){
              toast.warning('Por favor, preencha todos os campos obrigatórios..');

                return;
            }

            const data = new FormData();

            data.append("name", name);
            data.append("price", price);
            data.append("descricao", descricao);
            data.append("category", categorias[categoriaIndex].id); // ID da categoria
            data.append("file", image); // Enviando o arquivo


                const token = await getCookieClient();

                try {  const response = await api.post('/produtos', data ,{
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
        } catch (error) {
        toast.warning("ERRO AO CADASTRAR PRODUTOS...",{
            style:{backgroundColor:'red'}
        })
        return;
    }
            router.push('/dashboard');

            toast.success("PRODUTO CADASTRADO COM SUCESSO..",{
                style:{
                    backgroundColor:'green'
                }
            })
            setPreview('')
           setPrice('')

}




    function handleFile(evento){
        if(evento.target.files && evento.target.files[0]){
            const image = evento.target.files[0]

        if(image.type !== "image/jpeg" && image.type !== "image/png"){
        toast.warning('Formato de Imagem Inválido..');
            return;
        }
        setImage(image)
        setPreview(URL.createObjectURL(image))
    }

    
}




    return(
        <main className={styles.container}>
            <h1 className={styles.h1}>Novo Produto</h1>

            <form className={styles.form} action={handleRegisterProdutos}>
                <label className={styles.labelImg}>
                    <span>
                    <Plus size={55} color='white'/>
                    </span>

                    <input type='file'
                    accept='image/png, image/jpeg'
                    required 
                    onChange={handleFile}/>
                
                    {preview && (
                        <Image
                        alt="Imagens dos Produtos"
                        src={preview}
                        className={styles.preview}
                        fill={true}
                        quality={100}
                        priority={true}
                        />
                    )}
                </label>

<select name='categoria'>
                    {categorias.map( (category, index) => {
                        return(
                            <option key={category.id} value={index}>
                                {category.name}
                            
                            </option>
                           
                        )
})}
</select>

    <input type='text' name='name'
    placeholder='Digite o Nome do Produto...'
    required className={styles.input}/>

<input type='text' name='price'
    placeholder="R$ 0,00"
    value={price}
    onChange={handlePriceChange} // Atualiza o preço ao digitar
    required className={styles.input}/>



    <textarea className={styles.input} 
    placeholder='Digite a Descrição do Produto...'
    required
    name='descricao'>
    </textarea>

            <Button name='Cadastrar Produtos'/>
            </form>
        </main>
    )
}
