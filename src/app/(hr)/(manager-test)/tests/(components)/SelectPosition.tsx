// import React from "react";
// import {
//   AppstoreOutlined,
//   MailOutlined,
//   SettingOutlined,
// } from "@ant-design/icons";
// import type { MenuProps } from "antd";
// import { Form, Menu, Select } from "antd";

// type MenuItem = Required<MenuProps>["items"][number];

// function getItem(
//   label: React.ReactNode,
//   key?: React.Key | null,
//   icon?: React.ReactNode,
//   children?: MenuItem[],
//   type?: "group"
// ): MenuItem {
//   return {
//     key,
//     icon,
//     children,
//     label,
//     type,
//   } as MenuItem;
// }

// const items: MenuItem[] = [
//   getItem("Developer", "developer", null, [
//     getItem("Junior", "developerJunior"),
//     getItem("Senior", "developerSenior"),
//     getItem("Lead", "developerLead"),
//     getItem("Manager", "developerManager"),
//   ]),
//   getItem("Quanlity control", "quanlityControl", null, [
//     getItem("Junior", "quanlityControlJunior"),
//     getItem("Senior", "quanlityControlSenior"),
//     getItem("Lead", "quanlityControlLead"),
//     getItem("Manager", "quanlityControlManager"),
//   ]),
//   getItem("Accounting", "accounting", null, [
//     getItem("Junior", "accountingJunior"),
//     getItem("Senior", "accountingSenior"),
//     getItem("Lead", "accountingLead"),
//     getItem("Manager", "accountingManager"),
//   ]),
//   getItem("Product Owner", "productOwner", null, [
//     getItem("Junior", "productOwnerJunior"),
//     getItem("Senior", "productOwnerSenior"),
//     getItem("Lead", "productOwnerLead"),
//     getItem("Manager", "productOwnerManager"),
//   ]),
//   getItem("Talent Acquisition", "talentAcquisition", null, [
//     getItem("Junior", "talentAcquisitionJunior"),
//     getItem("Senior", "talentAcquisitionSenior"),
//     getItem("Lead", "talentAcquisitionLead"),
//     getItem("Manager", "talentAcquisitionLanager"),
//   ]),
//   getItem("Other", "other", null),
// ];

// const onClick: MenuProps["onClick"] = (e) => {
//   const position = e.keyPath[0]

// };

// const SelectPosition: React.FC = () => (
//   <Form.Item
//     label="Position recruiting"
//     name="positionRecruiting"
//     rules={[{ required: true, message: "Please select positions!" }]}
//   >
//     <Select
//       placeholder="Please select positions"
//       style={{ width: "100%" }}
//       dropdownRender={() => {
//         return (
//           <Menu
//             onClick={onClick}
//             style={{ width: "100%" }}
//             mode="vertical"
//             items={items}
//           />
//         );
//       }}
//     />
//   </Form.Item>
// );

// export default SelectPosition;

import React, { useState } from "react";
import { Cascader, Form, Input } from "antd";
import type { SingleCascaderProps } from "antd/es/cascader";
import { Span } from "next/dist/trace";

interface Option {
  value: string;
  label: string;
  children?: Option[];
}

const options: Option[] = [
  {
    value: "developer",
    label: "Developer",
    children: [
      {
        value: "developerJunior",
        label: "Junior",
      },
      {
        value: "developerSenior",
        label: "Senior",
      },
      {
        value: "developerLead",
        label: "Lead",
      },
      {
        value: "developerManager",
        label: "Manager",
      },
    ],
  },
  {
    value: "quanlityControl",
    label: "Quanlity control",
    children: [
      {
        value: "quanlityControlJunior",
        label: "Junior",
      },
      {
        value: "quanlityControlSenior",
        label: "Senior",
      },
      {
        value: "quanlityControlLead",
        label: "Lead",
      },
      {
        value: "quanlityControlManager",
        label: "Manager",
      },
    ],
  },
  {
    value: "accounting",
    label: "Accounting",
    children: [
      {
        value: "accountingJunior",
        label: "Junior",
      },
      {
        value: "accountingSenior",
        label: "Senior",
      },
      {
        value: "accountingLead",
        label: "Lead",
      },
      {
        value: "accountingManager",
        label: "Manager",
      },
    ],
  },
  {
    value: "productOwner",
    label: "Product Owner",
    children: [
      {
        value: "productOwnerJunior",
        label: "Junior",
      },
      {
        value: "productOwnerSenior",
        label: "Senior",
      },
      {
        value: "productOwnerLead",
        label: "Lead",
      },
      {
        value: "productOwnerManager",
        label: "Manager",
      },
    ],
  },
  {
    value: "talentAcquisition",
    label: "Talent Acquisition",
    children: [
      {
        value: "talentAcquisitionJunior",
        label: "Junior",
      },
      {
        value: "talentAcquisitionSenior",
        label: "Senior",
      },
      {
        value: "talentAcquisitionLead",
        label: "Lead",
      },
      {
        value: "talentAcquisitionManager",
        label: "Manager",
      },
    ],
  },
  {
    value: "other",
    label: "Other",
  },
];

const displayRender = (labels: string[]) => {
  return (
    <span>
      {labels.map((item, index) => {
        return (
          <>
            <span key={index}>{item}</span>
            <span>{index === labels.length - 1 ? "" : " - "}</span>
          </>
        );
      })}
    </span>
  );
};

const SelectPosition: React.FC = () => {
  const [otherCheck, setOtherCheck] = useState<boolean>(false);
  console.log("🚀 ~ otherCheck:", otherCheck);
  const onChange: SingleCascaderProps<Option>["onChange"] = (value) => {
    // console.log(value);
    if (value.length === 1) {
      setOtherCheck(true);
    } else {
      setOtherCheck(false);
    }
  };
  return (
    <>
      <Form.Item
        label="Position recruiting"
        name="positionRecruiting"
        rules={[{ required: true, message: "Please select positions!" }]}
      >
        <Cascader
          placeholder="please select positions"
          options={options}
          expandTrigger="click"
          displayRender={displayRender}
          onChange={onChange}
        />
      </Form.Item>
      {otherCheck && (
        <Form.Item
          label="Specify “Other” position"
          className="mt-4"
          name="otherPosition"
          rules={[{ required: false }]}
        >
          <Input placeholder="Please input other position" className="w-full" />
        </Form.Item>
      )}
    </>
  );
};

export default SelectPosition;
