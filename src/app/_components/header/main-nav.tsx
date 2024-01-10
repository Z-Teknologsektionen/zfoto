import { orderdHeaderLinks } from "~/utils/links";
import { HeaderNavLink } from "./header-nav-link";

const MainNav = () => {
  return (
    <nav className="hidden md:block">
      <ul className="flex flex-row items-center justify-center gap-4">
        {orderdHeaderLinks.map(({ href, label, newPage }) => (
          <HeaderNavLink
            key={href}
            href={href}
            label={label}
            newPage={newPage}
          />
        ))}
      </ul>
    </nav>
  );
};

export default MainNav;
