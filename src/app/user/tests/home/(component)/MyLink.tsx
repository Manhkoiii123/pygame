// app/_link.tsx

import Link, { LinkProps } from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
interface MyLinkProps extends LinkProps {
  children: React.ReactNode;
}
const MyLink: React.FC<MyLinkProps> = ({ children, href, ...props }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    setLoading(true);
  };

  router.events.on("routeChangeStart", () => {
    setLoading(true);
  });

  router.events.on("routeChangeComplete", () => {
    setLoading(false);
  });

  router.events.on("routeChangeError", () => {
    setLoading(false);
  });

  return (
    <>
      <Link href={href} {...props} passHref={true}>
        <a onClick={handleClick}>{children}</a>
      </Link>
      {loading && <div>Loading...</div>}
    </>
  );
};

export default MyLink;
