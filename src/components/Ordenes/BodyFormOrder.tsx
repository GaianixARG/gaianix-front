import type { TFormDetailsOrder } from "../../constants/types";

const BodyFormOrder = ({ order, onChangeValue }: TFormDetailsOrder) => {
  return (
    <>
      <div className="mb-3">
        <label
          htmlFor="title"
          className="block mb-2 text-sm font-medium text-accent-light"
        >
          Título
        </label>
        <input
          type="text"
          id="title"
          className="text-sm rounded-lg block w-full p-2.5 border bg-gray-700 border-gray-600 placeholder-accent-light text-white focus-visible:ring-1 focus-visible:ring-primary-light focus-visible:outline-none"
          placeholder="Ej: Cosecha de maiz"
          required
          defaultValue={order.title}
          onChange={(e) => onChangeValue("title", e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label
          htmlFor="lot"
          className="block mb-2 text-sm font-medium text-accent-light"
        >
          Lote
        </label>
        <input
          type="text"
          id="lot"
          className="text-sm rounded-lg block w-full p-2.5 border bg-gray-700 border-gray-600 placeholder-accent-light text-white focus-visible:ring-1 focus-visible:ring-primary-light focus-visible:outline-none"
          placeholder="Ej: Lote 1"
          required
          defaultValue={order.lote}
          onChange={(e) => onChangeValue("lote", e.target.value)}
        />
      </div>
    </>
  );
};

export default BodyFormOrder;
