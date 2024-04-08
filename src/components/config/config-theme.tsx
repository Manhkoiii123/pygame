import { ConfigProvider } from "antd";
import React from "react";

const AppTheme = ({ children }: { children: React.ReactNode }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#009DBE",
          borderRadius: 8,
        },
        components: {
          Input: {
            hoverBorderColor: "#009DBE",
            activeBorderColor: "#009DBE",
          },
          Button: {
            colorBgBase: "#009DBE",
            // defaultHoverBg: "#009DBE",
            defaultBg: "#CCEBF2",
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default AppTheme;
