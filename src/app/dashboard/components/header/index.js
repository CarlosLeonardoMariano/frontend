"use client";

import Link from 'next/link';
import styles from './styles.module.scss'; 
import { LogOutIcon } from 'lucide-react'; 
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function Header() {
    const router = useRouter();

    async function handleLogout() {
        deleteCookie("tokens", { path: "/" });
        toast.success('Sua sessão foi encerrada com sucesso. Agradecemos pelo seu tempo. Caso precise de ajuda, não hesite em nos contactar.', {
            style: {
                backgroundColor: '#f44336',
                color: 'white',
            }
        });

        router.replace('/');
    }

    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContante}>
                <Link href={'/dashboard'}>
                    <div className={styles.logoTotal}>
                        Atende<p className={styles.p}>Pro</p>
                    </div>
                </Link>

                <nav className={styles.nav}>
                    <div className={styles.menuLinks}>
                        <Link href={'/dashboard/categorias'}>Categorias</Link>
                        <Link href={'/dashboard/produtos'}>Produtos</Link>
                        <Link href={'/dashboard/financeiro'}>Caixa</Link>
                        <form action={handleLogout}>
                            <button type='submit'>
                                <LogOutIcon size={22} color='white' />
                            </button>
                        </form>
                    </div>
                </nav>
            </div>
        </header>
    );
}
