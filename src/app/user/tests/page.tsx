import { userRequest } from "@/apiRequest/user";
import EndTestWelcome from "@/app/user/tests/(component)/EndTestWelcome";
import NotStartedWelcome from "@/app/user/tests/(component)/NotStartedWelcome";
import Welcome from "@/app/user/tests/(component)/Welcome";
import dayjs from "dayjs";
import { Metadata } from "next";
import { cookies } from "next/headers";
import Image from "next/image";
import React from "react";
type TProps = {};

export const metadata: Metadata = {
  title: "User Test",
  description: "Generated by create next app",
};

async function fetchDetailAssUser(token: string) {
  const data = {
    token: token,
  };
  const res = await userRequest.userFetchDetailAss(data);
  return res.data.data;
}

const Page = async (props: any) => {
  const token = props.searchParams.token;
  const res = await fetchDetailAssUser(token);
  const { end_date, start_date } = res.company;
  const cookie = cookies().get("candicate_access_token")?.value;
  return (
    <>
      <Image alt="logo" width={200} height={100} src={"/logo.png"} />
      <div className="flex items-center justify-center">
        {!dayjs(new Date().toLocaleDateString()).isBefore(dayjs(end_date)) && (
          <EndTestWelcome token={token} cookie={cookie} />
        )}
        {dayjs(new Date().toLocaleDateString()).isBefore(dayjs(end_date)) &&
          !dayjs(new Date().toLocaleDateString()).isBefore(
            dayjs(start_date)
          ) && <Welcome token={token} cookie={cookie} />}
        {dayjs(new Date().toLocaleDateString()).isBefore(dayjs(start_date)) && (
          <NotStartedWelcome
            startDate={start_date}
            token={token}
            cookie={cookie}
          />
        )}
      </div>
    </>
  );
};

export default Page;
