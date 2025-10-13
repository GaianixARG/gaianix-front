import { LoaderCircle } from "lucide-react";
import type { TSize, TColors } from "../../constants/types";
import { SizeMap } from "../../constants/conversiones";

type Props = {
  className?: string;
  type: TColors;
  size: TSize;
  isLoading?: boolean;
  isGlobal?: boolean;
};

const Loader = ({
  className,
  type,
  size,
  isLoading,
  isGlobal = false,
}: Props) => {
  const claseTexto = `text-${type}`;
  const clase = `animate-spin ${className} ${claseTexto}`;

  return (
    (isLoading ?? false) && (
      <div
        role="status"
        className={
          isGlobal
            ? "fixed inset-0 z-10 flex items-center justify-center bg-background/70 backdrop-blur-sm sm:ml-50"
            : ""
        }
      >
        <LoaderCircle size={SizeMap[size]} className={clase} />
      </div>
    )
  );
};

export default Loader;
