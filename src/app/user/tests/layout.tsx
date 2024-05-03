import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../../globals.css";
import Image from "next/image";
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
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Image alt="logo" width={200} height={100} src={"/logo.png"} />
      {children}
    </>
  );
}
