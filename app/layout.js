import { Poppins } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
