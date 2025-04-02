import {Formulario} from '@/app/dashboard/produtos/components/formulario/formulario'
import { api } from '@/sevices/api';
import { getCookieServers } from '@/lib/cookieServer';
import { headers } from 'next/headers';


export default async function Produtos(){


    const token = await getCookieServers();

    const response = await api.get('/categorias',{

        headers:{
            Authorization: `Bearer ${token}`
        }
        
    })
    return(
     <Formulario categorias={response.data}/>  
    )
}