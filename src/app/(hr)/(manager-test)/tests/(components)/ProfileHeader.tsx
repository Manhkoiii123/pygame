"use client";
import { authHrRequest } from "@/apiRequest/hr/auth";
import { authRequest } from "@/apiRequest/hrAuth";
import MenuDropdown from "@/app/(hr)/(manager-test)/tests/[testId]/(components)/MenuDropdown";
import { AppContext } from "@/lib/context.wrapper";

import { TDropdown } from "@/types/dropdown";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";

const ProfileHeader = () => {
  const router = useRouter();
  const { profile, reset } = useContext(AppContext);
  const [open, setOpen] = useState<boolean>(false);
  const logoutMutation = useMutation({
    mutationFn: () => authHrRequest.logout(),
    onSuccess: async () => {
      reset();
      await authRequest.logoutDeleteCookie();
      router.push("/login");
    },
  });
  const handleLogout = () => {
    logoutMutation.mutate();
  };
  const dropdownInvite: TDropdown[] = [
    {
      key: "1",
      label: "Logout",
      onClick: () => {
        handleLogout();
      },
    },
    {
      key: "2",
      label: "Change password",
      onClick: () => {
        setOpen(true);
      },
    },
  ];
  return (
    <div className="flex items-center justify-center gap-2">
      <span className="text-[20px] leading-[28px] font-medium  text-secondary">
        {profile?.email}
      </span>

      <MenuDropdown items={dropdownInvite}>
        <Image
          src={"/avatar.png"}
          width={50}
          height={50}
          alt="avatar"
          className="rounded-full cursor-pointer"
        />
      </MenuDropdown>
    </div>
  );
};

export default ProfileHeader;
