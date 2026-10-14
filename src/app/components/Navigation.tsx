import { useState, useEffect } from "react";
import { NavLink } from "react-router";
import { Home, Dumbbell, Sparkles, ClipboardList, Zap } from "lucide-react";

const navItems = [
  { to: "/", label: "ホーム", icon: Home },
  { to: "/machines", label: "マシン", icon: Dumbbell },
  { to: "/menu", label: "AIメニュー", icon: Sparkles },
  { to: "/today", label: "今日のトレ", icon: ClipboardList },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(12,12,12,0.9)" : "rgba(12,12,12,0.7)",
        backdropFilter: "blur(16px)",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
      }}
    >
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: "#C1FF4D" }}
          >
            <Zap className="w-4 h-4 text-black fill-black" />
          </div>
          <span
            className="text-sm font-black tracking-widest uppercase"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "#F0F0F0", letterSpacing: "0.15em" }}
          >
            GYM NAVI
          </span>
        </NavLink>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                  isActive
                    ? "text-black bg-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`
              }
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
