import { CLASE_X_BOTON } from "../../constants/conversiones";
import type { TBoton } from "../../constants/types";

type Props = {
  children: React.ReactNode;
  tipo?: TBoton | undefined;
  dataDrawerTarget?: string;
  dataDropdownTarget?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
  children,
  tipo,
  dataDrawerTarget,
  dataDropdownTarget,
  className,
  onClick,
  ...props
}: Props) => {
  const handleShowSidebar = () => {
    if (dataDrawerTarget) {
      const sidebar = document.getElementById(dataDrawerTarget);
      if (sidebar) {
        sidebar.classList.toggle("-translate-x-full");
      }
    }
  };

  const handleOpenDropdown = () => {
    if (dataDropdownTarget) {
      const dropdown = document.getElementById(dataDropdownTarget);
      if (dropdown) {
        dropdown.classList.toggle("hidden");
      }
    }
  };

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    handleShowSidebar();
    handleOpenDropdown();
    if (onClick) onClick(event);
  };

  const clasePorTipo = tipo && CLASE_X_BOTON[tipo] + " transition duration-260";

  return (
    <button
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
