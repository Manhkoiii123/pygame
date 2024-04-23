export const covertStatus = (status: string) => {
  if (status === "Completed") {
    return {
      bgColor: "#A9F5AB",
      text: "Completed",
    };
  } else if (status === "In process") {
    return {
      bgColor: "#FFAC9F",
      text: "In Process",
    };
  } else if (status === "Not started") {
    return {
      bgColor: "#FFD0A5",
      text: "Not Started",
    };
  } else {
    throw new Error("Invalid index");
  }
};
 