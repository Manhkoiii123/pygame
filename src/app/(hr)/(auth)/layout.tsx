import type { Metadata } from "next";
import Image from "next/image";
import AppTheme from "@/components/config/config-theme";
import "../../globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Auth page",
  description: "Generated by create next app",
};

const LayoutAuth = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="px-5 pt-3">
      <AppTheme>
        <AntdRegistry>
          <Link href={"/"}>
            <Image alt="logo" width={200} height={100} src={"/logo.png"} />
          </Link>
          <div className="flex items-center justify-center">
            <div className="flex items-center justify-between w-[80%] gap-10">
              <Image
                src={"/loginBanner.png"}
                alt="login banner"
                width={600}
                height={600}
                className="flex-2"
              />
              <div className="flex flex-col items-start justify-center gap-8 flex-1 mb-auto mt-16">
                {children}
              </div>
            </div>
          </div>
        </AntdRegistry>
      </AppTheme>
    </div>
  );
};

export default LayoutAuth;
