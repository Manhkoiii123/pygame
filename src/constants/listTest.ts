import { TTest } from "@/types/listTest";
//1 compelte
//0 in process
// -1 not start
export const listTest: TTest[] = [
  {
    id: 1,
    image: "/test1.png",
    title: "Verbal challenge",
    time: 90,
    cup: 100,
    status: 1,
    question: 32,
  },
  {
    id: 2,
    image: "/test2.png",
    title: "Numerical challenge",
    time: 100,
    cup: 0,
    status: 0,
    question: 31,
  },
  {
    id: 3,
    image: "/test3.png",
    title: "Logical challenge",
    time: 90,
    cup: 0,
    status: -1,
    question: 30,
  },
  {
    id: 4,
    image: "/test4.png",
    title: "Visual challenge",
    time: 90,
    cup: 100,
    status: 1,
    question: 25,
  },
  {
    id: 5,
    image: "/test5.png",
    title: "Memory challenge",
    time: 0,
    cup: 25,
    status: -1,
    question: 11,
  },
  {
    id: 6,
    image: "/test6.png",
    title: "Personality discovery",
    time: 0,
    cup: 0,
    status: 1,
    question: 12,
  },
];
