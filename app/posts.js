import { readdir, readFile } from "fs/promises";
import matter from "gray-matter";
import { Feed } from "feed";

export const metadata = {
  title: "Hello World",
  description: "A blog template. Edit metadata in app/posts.js.",
  openGraph: {
    title: "Hello World",
  },
  alternates: {
    types: {
      "application/atom+xml": "/atom.xml",
      "application/rss+xml": "/rss.xml",
    },
  },
};

export async function getPosts() {
  const entries = await readdir("./public/", { withFileTypes: true });
  const dirs = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
  const fileContents = await Promise.all(
    dirs.map((dir) => readFile("./public/" + dir + "/index.md", "utf8")),
  );
  const posts = dirs.map((slug, i) => {
    const fileContent = fileContents[i];
    const { data } = matter(fileContent);
    return { slug, ...data };
  });
  posts.sort((a, b) => {
    return Date.parse(a.date) < Date.parse(b.date) ? 1 : -1;
  });
  return posts;
}

export async function generateFeed() {
  const posts = await getPosts();
  const site_url = process.env.SITE_URL || "http://localhost:3000/";

  const feedOptions = {
    description: metadata.description,
    favicon: `/icon.png`,
    feedLinks: { atom: `/atom.xml`, rss: `/rss.xml` },
    generator: "Feed for Node.js",
    id: site_url,
    link: site_url,
    title: metadata.title,
  };

  const feed = new Feed(feedOptions);

  for (const post of posts) {
    feed.addItem({
      date: new Date(post.date),
      description: post.spoiler,
      id: `${site_url}${post.slug}/`,
      link: `${site_url}${post.slug}/`,
      title: post.title,
    });
  }

  return feed;
}
