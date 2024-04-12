"use client";
import { TDropdown } from "@/types/dropdown";
import { MenuProps } from "antd";

export const dropdownInvite: TDropdown[] = [
  {
    key: "1",
    label: "Invite applications",
    onClick: () => {
      console.log("Dropdown 1 clicked");
    },
  },
  {
    key: "2",
    label: "Invite employees",
    onClick: () => {
      console.log("Dropdown 2 clicked");
    },
  },
];
export const dropdownMore: MenuProps["items"] = [
  {
    key: "1",
    label: "Edit assessment",
    onClick: () => {
      console.log("Edit clicked");
    },
  },
  {
    key: "2",
    label: "Delete assessment",
    onClick: () => {
      console.log("Delete clicked");
    },
  },
  {
    key: "3",
    label: "Archive assessment",
    onClick: () => {
      console.log("Archive clicked");
    },
  },
];
