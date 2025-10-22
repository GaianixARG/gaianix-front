import Loader from "./Loader";
import { useLoadingStore } from "../../store/loadingStore";

export default function GlobalLoader() {
  const loading = useLoadingStore(state => state.isLoading)
  return <Loader type="primary" size="xl" isLoading={loading} isGlobal />;
}
