"use client";
import { Dropdown, MenuProps } from "antd";
import React from "react";

const MenuDropdown = ({
  items,
  children,
}: {
  items: MenuProps["items"];
  children: React.ReactNode;
}) => {
  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <a onClick={(e) => e.preventDefault()}>{children}</a>
    </Dropdown>
  );
};

export default MenuDropdown;
