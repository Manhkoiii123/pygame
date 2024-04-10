import type { Metadata } from "next";
import Image from "next/image";
import AppTheme from "@/components/config/config-theme";
import "../../../globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import Link from "next/link";
import { Button } from "antd";

export const metadata: Metadata = {
  title: "Manager test page",
  description: "Generated by create next app",
};

const ManagerTestLayout = ({ children }: React.PropsWithChildren) => (
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
        <div className="flex items-center justify-center gap-4 font-medium text-[20px] leading-[28px]">
          <Link href="/tests">
            <span className=" underline text-secondary">My assessments</span>
          </Link>
          <Link href="/test-library">
            <span className="text-primary">Test library</span>
          </Link>
        </div>
        <div className="flex items-center justify-center gap-2">
          <span className="text-[20px] leading-[28px] font-medium  text-secondary">
            Username
          </span>
          <Image
            src={"/avatar.png"}
            width={50}
            height={50}
            alt="avatar"
            className="rounded-full"
          />
        </div>
      </div>
      <div className="p-16">{children}</div>
    </AntdRegistry>
  </AppTheme>
);

export default ManagerTestLayout;
