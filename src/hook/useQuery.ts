"use client";
import { useQuery } from "@tanstack/react-query";

export const useServerQuery = ({
  key,
  callback,
}: {
  key: any;
  callback: any;
}) => {
  const { data } = useQuery({
    queryKey: [key],
    queryFn: () => {
      return callback();
    },
  });
  return data;
};
