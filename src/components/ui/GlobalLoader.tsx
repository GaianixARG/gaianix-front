import { useLoading } from "../../hooks/context/useLoading";
import Loader from "./Loader";

export default function GlobalLoader() {
  const { isLoading } = useLoading();
  return <Loader type="primary" size="xl" isLoading={isLoading} isGlobal />;
}
