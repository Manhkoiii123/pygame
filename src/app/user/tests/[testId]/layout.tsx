import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../../../globals.css";
import Image from "next/image";
import AppTheme from "@/components/config/config-theme";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
        <AppTheme>
          <Image alt="logo" width={200} height={100} src={"/logo.png"} />
          <div className="flex  items-center justify-center">{children}</div>
          <ToastContainer />
        </AppTheme>
      </body>
    </html>
  );
}
