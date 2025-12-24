const HeaderEditingLote = ({ idInput, codigo }: { idInput: string, codigo: string }) => {
  return (
    <input
      id={idInput}
      autoFocus
      defaultValue={codigo}
      placeholder="Nombre de lote"
      onClick={(e) => e.stopPropagation()}
      className="bg-white/50 rounded px-2 py-1 font-bold text-sm grow mr-2 outline-none text-accent/70"
    />
  )
}

export default HeaderEditingLote