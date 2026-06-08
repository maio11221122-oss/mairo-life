import Link from "next/link";
import clsx from "clsx";

type Props = {
  href?: string;
  variant?: "primary" | "outline";
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

export default function Button({
  href,
  variant = "outline",
  children,
  className,
  onClick,
}: Props) {
  const classes = clsx(
    variant === "primary" ? "btn-primary" : "btn-outline",
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
