import type { LucideIcon } from "lucide-react";

type Props = {
  path: string;
  label: string;
  icon: LucideIcon;
  enabled: boolean;
  onClick?: () => void;
};

const NavTab = ({ path, label, icon: Icon, enabled, onClick }: Props) => {
  return (
    <a
      href={path}
      className={`flex items-center p-2 text-white rounded-lg hover:bg-gray-700 group ${
        enabled ? "" : "opacity-50 pointer-events-none"
      }`}
      onClick={onClick}
    >
      <Icon
        size={22}
        className="shrink-0 mr-4 text-gray-400 transition duration-75 group-hover:text-white"
        aria-hidden="true"
      />
      <span className="flex-1 ms-3 whitespace-nowrap">{label}</span>
    </a>
  );
};

export default NavTab;
