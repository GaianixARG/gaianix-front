import type { LucideIcon } from "lucide-react";
import type { TSize, TColors } from "../../constants/types";
import {
  BG_ICON_ROUNDED,
  SizeMap,
  TEXT_PER_STATUS_COLOR,
} from "../../constants/conversiones";

type Props = {
  tipo: TColors;
  icon: LucideIcon;
  size: TSize;
} & React.HTMLAttributes<HTMLDivElement>;

const IconRounded = ({ icon: Icon, tipo, size, className }: Props) => {
  const clase = `${BG_ICON_ROUNDED[tipo]} p-3 rounded-full ${className}`;
  const textColor = TEXT_PER_STATUS_COLOR[tipo];

  return (
    <div className={clase}>
      <Icon className={textColor} size={SizeMap[size]} />
    </div>
  );
};

export default IconRounded;
