import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../../../../globals.css";
import Image from "next/image";
import AppTheme from "@/components/config/config-theme";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AxiosInterceptor } from "@/lib/axios/axios.wrapper";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "User Test",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <AxiosInterceptor>
          <AppTheme>
            <div className="p-10">{children}</div>
          </AppTheme>
        </AxiosInterceptor>
      </body>
    </html>
  );
}