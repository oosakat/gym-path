import { Outlet, useLocation, NavLink } from "react-router";
import { useEffect } from "react";
import { Home, Dumbbell, Sparkles, ClipboardList } from "lucide-react";
import { Navigation } from "./components/Navigation";

const bottomNavItems = [
  { to: "/", label: "ホーム", icon: Home },
  { to: "/machines", label: "マシン", icon: Dumbbell },
  { to: "/menu", label: "AIメニュー", icon: Sparkles },
  { to: "/today", label: "今日のトレ", icon: ClipboardList },
];

export function Root() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div
      className="min-h-screen bg-background text-foreground"
      style={{ fontFamily: "'Noto Sans JP', sans-serif" }}
    >
      <Navigation />
      <main className="pt-14 pb-20 md:pt-16 md:pb-0">
        <Outlet />
      </main>

      {/* Bottom tab bar - mobile only */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden border-t border-border bg-card/95 backdrop-blur-xl">
        <div className="flex items-stretch h-16">
          {bottomNavItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center flex-1 gap-0.5 text-[10px] font-medium transition-all duration-200 ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div
                    className={`flex items-center justify-center w-10 h-6 rounded-full transition-all duration-200 ${
                      isActive ? "bg-primary/15" : ""
                    }`}
                  >
                    <Icon
                      className={`transition-all duration-200 ${isActive ? "w-5 h-5" : "w-[18px] h-[18px]"}`}
                    />
                  </div>
                  <span>{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}
