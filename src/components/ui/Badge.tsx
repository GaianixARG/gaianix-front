import { BADGESTYLE_X_STATUS } from "../../constants/conversiones";
import type { TColors } from "../../constants/types";

type Props = {
  color: TColors;
  label: string;
  className?: string;
};

const Badge = ({ label, color, className }: Props) => {
  const styleBadge = BADGESTYLE_X_STATUS[color];
  const badgeClassName = `text-xs px-2 rounded-full w-fit ${styleBadge} ${
    className || ""
  }`;

  return <p className={badgeClassName}>{label}</p>;
};

export default Badge;
