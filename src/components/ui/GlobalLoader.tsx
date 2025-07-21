import Loader from "./Loader";
import { useLoading } from "../../context/LoadingContext";

export default function GlobalLoader() {
  const { isLoading } = useLoading();
  return <Loader type="primary" size="xl" isLoading={isLoading} isGlobal />;
}
