import {
  RiFacebookBoxLine,
  RiGithubLine,
  RiInstagramLine,
  RiTwitterXLine,
  RiYoutubeLine,
} from "@remixicon/react";
import Link from "next/link";

const SOCIAL_LINKS = [
  { icon: RiYoutubeLine, href: "https://youtube.com", label: "Youtube" },
  { icon: RiInstagramLine, href: "https://instagram.com", label: "Instagram" },
  { icon: RiFacebookBoxLine, href: "https://facebook.com", label: "Facebook" },
  { icon: RiGithubLine, href: "https://github.com", label: "Github" },
  { icon: RiTwitterXLine, href: "https://twitter.com", label: "Twitter" },
];

function Footer() {
  return (
    <footer className="flex flex-col md:flex-row gap-2 items-center justify-between p-4 md:p-8 xl:py-8 xl:px-28">
      <div className="text-sm font-normal text-secondary-foreground">
        © Pinsplash, Inc. All rights reserved.
      </div>
      <div className="flex gap-6">
        {SOCIAL_LINKS.map(({ href, icon: Icon, label }) => (
          <Link
            key={href}
            className="text-neutral-400"
            href={href}
            aria-label={label}
          >
            <Icon />
          </Link>
        ))}
      </div>
    </footer>
  );
}

export { Footer };
