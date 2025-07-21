import { BADGESTYLE_X_STATUS } from "../../constants/conversiones";
import type { TColors } from "../../constants/types";

type Props = {
  color: TColors;
  label: string;
};

const Badge = ({ label, color }: Props) => {
  const styleBadge = BADGESTYLE_X_STATUS[color];
  const className = `text-xs px-2 py-1 rounded-full w-fit ${styleBadge}`;

  return <p className={className}>{label}</p>;
};

export default Badge;
