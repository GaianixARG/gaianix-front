import Loader from "./Loader";

type Props = {
  isLoading: boolean;
  text?: string;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const ButtonLoading = ({
  isLoading,
  text,
  className = "",
  ...props
}: Props) => {
  return (
    <button
      type="button"
      disabled={isLoading}
      className={`flex items-center justify-center px-4 py-2 bg-primary text-white rounded hover:bg-primary-light transition duration-200 ${className}`}
      {...props}
    >
      <>
        <Loader
          className="mr-2 animate-spin"
          type="tertiary"
          size="sm"
          isLoading={isLoading}
        />
        <span className="text-sm font-medium">{text ?? "Cargando..."}</span>
      </>
    </button>
  );
};
export default ButtonLoading;
