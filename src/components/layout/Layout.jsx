import { Outlet, useLocation, Link } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import TwinklingStars from "./TwinklingStars.jsx";
import { cn } from "../../lib/utils";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb.jsx";

const routeLabels = {
  about: "About",
  academics: "Academics",
  admissions: "Admissions",
  contact: "Contact",
  events: "Events",
  faculty: "Faculty",
  gallery: "Gallery",
};

const Layout = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const isHome = pathSegments.length === 0;
  const isContact = location.pathname === '/contact';

  return (
    <div className="min-h-screen flex flex-col relative">
      <TwinklingStars />
      <Navbar />
      <main className={cn("flex-1", isHome ? "pt-0" : isContact ? "pt-14 md:pt-[82px]" : "pt-14 md:pt-[70px]")}>
        {!isHome && (
          <div className={cn("max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-[5px]", isContact ? "py-3" : "py-1.5")}>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {pathSegments.map((segment, i) => {
                  const isLast = i === pathSegments.length - 1;
                  const path = "/" + pathSegments.slice(0, i + 1).join("/");
                  const label = routeLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);

                  return (
                    <span key={path} className="flex items-center gap-1">
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        {isLast ? (
                          <BreadcrumbPage>{label}</BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink asChild>
                            <Link to={path}>{label}</Link>
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                    </span>
                  );
                })}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        )}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
