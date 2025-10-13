import { useId } from "react";
import { CLASE_X_BOTON } from "../../constants/conversiones";
import type { TBoton, TFunctionToggle } from "../../constants/types";
import useButton from "../../hooks/useButton";

type Props = {
  children: React.ReactNode;
  tipo?: TBoton | undefined;
  dataSidebarTarget?: string;
  dataDrawerTarget?: string;
  dataDropdownTarget?: string;
  functionToggle?: TFunctionToggle;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
  children,
  tipo,
  dataSidebarTarget,
  dataDrawerTarget,
  dataDropdownTarget,
  functionToggle,
  className,
  onClick,
  ...props
}: Props) => {
  const idButton = useId();

  const { handleToggleSidebar, handleToggleDrawer, handleOpenDropdown } =
    useButton({
      idButton,
      dataSidebarTarget,
      dataDrawerTarget,
      dataDropdownTarget,
    });

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (onClick) onClick(event);
    handleToggleSidebar(functionToggle);
    handleToggleDrawer(functionToggle);
    handleOpenDropdown();
  };

  const clasePorTipo = tipo && CLASE_X_BOTON[tipo] + " transition duration-260";

  return (
    <button
      id={idButton}
      onClick={(event) => handleClick(event)}
      type="button"
      className={className + " rounded font-semibold " + clasePorTipo}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
