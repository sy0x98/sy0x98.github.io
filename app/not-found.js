import { sans } from "./fonts";
import Link from "./Link";
import "./[slug]/markdown.css";

export default function NotFound() {
  return (
    <article className="markdown">
      <h1
        className={[
          sans.className,
          "text-[40px] font-black leading-[44px] text-[--title]",
        ].join(" ")}
      >
        Not found
      </h1>
      <div className="markdown mt-10">
        <p>This page doesn't exist (yet?)</p>
        <p>
          I recently rewrote the site so maybe something broke. Please{" "}
          <Link href="https://github.com/shubhamyadav/blog-template/issues">
            report an issue.
          </Link>
        </p>
        <p>
          If you're looking for translated posts, they're not on the site
          anymore but you can find{" "}

        </p>
        <p>Hope you'll find what you're looking for.</p>
      </div>
    </article>
  );
}
