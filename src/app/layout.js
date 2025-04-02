import { Geist, Geist_Mono } from "next/font/google";
import "./globals.scss";
import {Toaster} from 'sonner'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Sistema Garçom",
  description: "O melhor sistema de pedidos do Brasil",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Toaster 
        position="top-center"

        toastOptions={{style:{
          color: 'white'
        }}}/>

        {children}
      </body>
    </html>
  );
}
