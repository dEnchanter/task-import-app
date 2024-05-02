import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Todo App",
  description: "Developed by Daiki",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={cn(
        'min-h-screen font-sans antialiased grainy',
        inter.className
      )}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
