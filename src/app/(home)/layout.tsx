import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "../globals.css";
import Image from "next/image";
import AppTheme from "@/components/config/config-theme";
import { Button } from "antd";
import Link from "next/link";
import TanstackWrapper from "@/lib/tanstack.wrapper";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Home App",
  description: "Generated by create next app",
};

const RootLayout = ({ children }: React.PropsWithChildren) => (
  <TanstackWrapper>
    <AppTheme>
      <AntdRegistry>
        <div className="flex items-center justify-between px-5 pt-3">
          <Link href={"/"}>
            <Image
              alt="logo"
              width={200}
              height={100}
              src={"/logo.png"}
              className="w-[200px] h-[100px] object-cover"
            />
          </Link>
          <div className="flex items-center justify-center gap-4">
            <Link href="/test-library">
              <Button htmlType="button" className="w-[180px] " type="default">
                <span className="text-secondary">Test Library</span>
              </Button>
            </Link>
            <Link href="/login">
              <Button htmlType="button" className="w-[180px]" type="primary">
                <span>Login</span>
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-center">{children}</div>
      </AntdRegistry>
    </AppTheme>
  </TanstackWrapper>
);

export default RootLayout;
