"use client";
import { userRequest } from "@/apiRequest/user";
import DoneAllTest from "@/app/user/tests/home/(component)/DoneAllTest";
import Info from "@/app/user/tests/home/(component)/Info";
import ListTest from "@/app/user/tests/home/(component)/ListTest";
import Loading from "@/components/views/Loading";
import { useQuery } from "@tanstack/react-query";
import { Button } from "antd";
import Image from "next/image";
import { useEffect, useState } from "react";

const HomeComponent = () => {
  const [doneAllTest, setDoneAllTest] = useState(false);
  const [showMobileTest, setShowMobileTest] = useState(false);
  const handleFetchListTestUser = async () => {
    const res = await userRequest.userListTest();
    return res.data.data.games;
  };
  const { data: listTest, isLoading } = useQuery({
    queryKey: ["listTestUser"],
    queryFn: handleFetchListTestUser,
    staleTime: 0,
  });
  useEffect(() => {
    const tmp = listTest?.every((item) => {
      return item.status === 2;
    });
    setDoneAllTest(tmp!);
  }, [listTest]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {doneAllTest ? (
            <>
              <Image
                alt="logo"
                width={200}
                height={100}
                src={"/logo.png"}
                className="hidden sm:block"
              />
              <DoneAllTest />
            </>
          ) : (
            <>
              {!showMobileTest ? (
                <>
                  <Image
                    alt="logo"
                    width={200}
                    height={100}
                    src={"/logo.png"}
                    className="hidden sm:block"
                  />
                  <div className="flex items-center justify-center">
                    <Image
                      src={"/welcome.png"}
                      alt="welcome"
                      width={240}
                      height={240}
                      className="block sm:hidden"
                    ></Image>
                  </div>
                </>
              ) : (
                <>
                  <Image
                    alt="logo"
                    width={200}
                    height={100}
                    src={"/logo.png"}
                    className="hidden sm:block"
                  />
                  <div className="flex items-center justify-center">
                    <Image
                      src={"/welcome.png"}
                      alt="welcome"
                      width={240}
                      height={240}
                      className="hidden sm:hidden"
                    ></Image>
                  </div>
                </>
              )}
              <div
                className={`${
                  showMobileTest
                    ? "hidden sm:flex items-center justify-center"
                    : "flex items-center justify-center"
                }`}
              >
                <div className="w-[1200px] pb-4">
                  <div className="w-full flex flex-col gap-1">
                    <span className="font-semibold text-xl block">
                      Welcome to our assessment,
                    </span>
                    <span className="text-base font-normal mt-4 block">
                      These are not traditional assessment tests but fun &
                      engaging gamified challenges for you to discover yourself
                      and explore if you are the most SUITABLE for the applying
                      position.
                    </span>
                    <span className="text-base font-normal mt-4 block">
                      Are you up for the challenge?
                    </span>
                    <div className="py-2 px-5 flex flex-col gap-2">
                      <Info listTest={listTest} />
                    </div>
                    <span className="text-base font-normal  block">
                      Have fun and good luck.
                    </span>
                  </div>
                  <div className="mt-3 hidden sm:block">
                    <h4 className="font-semibold text-primary text-4xl">
                      Choose a test
                    </h4>
                    <ListTest listTest={listTest} />
                  </div>
                  <Button
                    onClick={() => {
                      setShowMobileTest(true);
                    }}
                    type="primary"
                    className="w-full mt-4 block sm:hidden"
                  >
                    View assessment
                  </Button>
                </div>
              </div>
            </>
          )}
        </>
      )}
      {showMobileTest && (
        <div className="block sm:hidden">
          <div className="flex items-center justify-center gap-4">
            <div
              onClick={() => {
                setShowMobileTest(false);
              }}
              className="p-2 rounded-full border-gray-100 cursor-pointer border-2"
            >
              <Image
                src="/left.png"
                alt="logo"
                width={24}
                height={24}
                className="w-[16px] h-[16px] sm:w-[24px] sm:h-[24px]"
              />
            </div>
            <h4 className="font-semibold text-primary text-3xl flex items-center justify-center">
              Select test
            </h4>
          </div>

          <ListTest listTest={listTest} />
        </div>
      )}
    </>
  );
};

export default HomeComponent;
