import TanstackWrapper from "@/lib/tanstack.wrapper";

export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* <TanstackWrapper>{children}</TanstackWrapper> */}
        {children}
      </body>
    </html>
  );
}
