import Image from "next/image";

type Props = {
  title: string;
  subtitle?: string;
  image: string;
};

export default function PageHero({ title, subtitle, image }: Props) {
  return (
    <section className="relative h-56 md:h-80 overflow-hidden">
      <Image
        src={image}
        alt={title}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-white/10" />
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <h1 className="font-serif text-4xl md:text-6xl tracking-[0.2em] text-white drop-shadow-sm">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-2 text-xs md:text-sm tracking-[0.25em] text-white/90 font-sans">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
