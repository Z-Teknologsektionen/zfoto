import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import { useLinks } from "~/utils/links";
import { HeaderNavLink } from "./header-nav-link";

const MobileNav = () => {
  const [open, setOpen] = useState(false);
  const { orderdHeaderLinks } = useLinks();
  const pathname = usePathname();

  return (
    <nav className="dark leading-none md:hidden">
      <Sheet open={open} defaultOpen={false} onOpenChange={setOpen}>
        <SheetTrigger>
          <Menu className="h-6 w-6" />
        </SheetTrigger>
        <SheetContent className="bg-[#333333] text-[#a7a7a7]">
          <ul className="mt-8 flex flex-col items-center justify-center gap-4">
            {orderdHeaderLinks.map(({ href, label, newPage }) => (
              <HeaderNavLink
                key={href}
                href={href}
                label={label}
                newPage={newPage}
                pathname={pathname}
              />
            ))}
          </ul>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default MobileNav;