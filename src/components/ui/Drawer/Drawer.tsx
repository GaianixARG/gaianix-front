import { X } from "lucide-react";
import Button from "../Button";

type Props = {
  id: string;
  closeButton?: boolean;
  children?: React.ReactNode;
} & React.RefAttributes<HTMLDivElement>;

const Drawer = ({ id, closeButton = false, children, ref }: Props) => {
  return (
    <div
      id={id}
      className="fixed top-0 right-0 z-1001 h-screen p-4 overflow-y-auto transition-transform duration-400 translate-x-full w-full sm:w-100 bg-accent border-t border-gray-600 shadow-lime-300"
      tabIndex={-1}
      aria-labelledby="drawer-form-label"
      ref={ref}
    >
      {closeButton && (
        <Button
          tipo="accent"
          className="text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center"
          dataDrawerTarget={id}
          title="Close drawer"
        >
          <X className="w-4 h-4" />
        </Button>
      )}
      {children != null ? <div className="flex flex-col gap-4">{children}</div> : null}
    </div>
  );
};

export default Drawer;
