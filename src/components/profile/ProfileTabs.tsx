import { NavLink } from "react-router-dom";

const tabs = [
  { label: "Home", to: "/" },
  { label: "Projects", to: "/projects" },
  { label: "Awards", to: "/awards" },
  { label: "Certs", to: "/certifications" },
  { label: "Homelab", to: "/homelab" },
];

export function ProfileTabs() {
  return (
    <nav className="mb-4 flex flex-wrap gap-2">
      {tabs.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end={tab.to === "/"}
          className={({ isActive }) =>
            `rounded-full border px-3 py-1 text-xs font-semibold transition-colors ${
              isActive
                ? "border-foreground bg-foreground text-background"
                : "border-border bg-card text-foreground hover:bg-muted"
            }`
          }
        >
          {tab.label}
        </NavLink>
      ))}
    </nav>
  );
}
