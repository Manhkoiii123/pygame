import { TDropdown } from "@/types/dropdown";

export const dropdownMenu = (items: TDropdown[]) => {
  return items.map((item) => {
    return {
      key: item.key,
      label: item.label,
      icon: item.icon,
      onClick: item?.onClick,
    };
  });
};
