import { FEATURES } from "../../constants/features";

export default function Hero() {
  return (
    <section className="bg-bg py-16 px-6 md:px-20">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12 text-center">
        {FEATURES.map(({ title, description, icon }, idx) => (
          <div
            key={idx}
            className="bg-white rounded-lg p-8 shadow-lg hover:shadow-2xl transition cursor-default hover:scale-140 duration-350"
          >
            <div>{icon}</div>
            <h3 className="text-xl font-semibold text-primary mb-2">{title}</h3>
            <p className="text-gray-700">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
