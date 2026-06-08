type Props = {
  en: string;
  ja?: string;
  center?: boolean;
};

export default function SectionTitle({ en, ja, center = false }: Props) {
  return (
    <div className={center ? "text-center" : ""}>
      <h2 className="font-serif text-3xl md:text-4xl tracking-[0.15em] text-text-main">
        {en}
      </h2>
      {ja && (
        <p className="mt-2 text-xs tracking-[0.2em] text-text-sub font-sans">{ja}</p>
      )}
      <div
        className={`mt-4 h-px w-12 bg-primary ${center ? "mx-auto" : ""}`}
      />
    </div>
  );
}
