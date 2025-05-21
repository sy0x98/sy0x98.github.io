import PlausibleProvider from "next-plausible";
import Link from "./Link";
import HomeLink from "./HomeLink";
import { serif } from "./fonts";
import "./global.css";

export const metadata = {
  title: "Shubham's Blog",
  description: "A simple blog template.",
};

const Activity = Symbol.for("react.activity");

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={serif.className}>
      <body className="mx-auto max-w-2xl bg-[--bg] px-5 py-12 text-[--text]">
        <header className="mb-14 flex flex-row place-content-between">
  <HomeLink />
</header>
<main>
  <Activity mode="visible">{children}</Activity>
</main>
      </body>
    </html>
  );
}
