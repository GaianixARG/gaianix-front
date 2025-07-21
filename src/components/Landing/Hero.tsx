export default function Hero() {
  return (
    <section className="relative w-full flex items-center justify-center text-white p-10">
      <div className="bg-accent bg-opacity-40 p-8 rounded-lg max-w-4xl text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">
          Revolucioná tu campo con{" "}
          <span className="text-secondary">Gaianix</span>
        </h1>
        <p className="text-lg md:text-xl mb-8">
          La plataforma inteligente para el manejo de cultivos. Simple, moderna
          y eficiente.
        </p>
        <a
          href="/login"
          className="inline-block bg-tertiary-light text-accent hover:bg-primary-light rounded transition hover:scale-125 text-dark py-3 px-8 shadow-lg"
        >
          Empezá Ahora
        </a>
      </div>
    </section>
  );
}
