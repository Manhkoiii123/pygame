import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import TanstackWrapper from "@/lib/tanstack.wrapper";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppProvider } from "@/lib/context.wrapper";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const RootLayout = ({ children }: React.PropsWithChildren) => (
  <html lang="en">
    <body className={poppins.className}>
      <AppProvider>
        <TanstackWrapper>{children}</TanstackWrapper>
        <ToastContainer />
      </AppProvider>
    </body>
  </html>
);

export default RootLayout;
