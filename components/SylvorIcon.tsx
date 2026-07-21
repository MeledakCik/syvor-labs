type LogoProps = {
  size?: number;
  className?: string;
  rounded?: string;
};

/**
 * Sylvor Labs mark — renders the brand favicon/profile icon.
 * Kept the old component name so every existing import site
 * (Navbar, Hero, Footer, etc.) keeps working unchanged.
 */
export default function SylvorIcon({ size = 40, className = "", rounded = "22%" }: LogoProps) {
  return (
    <img
      src="/favicon.ico"
      alt="Sylvor Labs"
      width={size}
      height={size}
      draggable={false}
      className={`shrink-0 select-none object-cover ${className}`}
      style={{ width: size, height: size, borderRadius: rounded }}
    />
  );
}

// Kept as a no-op for backward compatibility with existing imports.
export function ChromeGradientDefs() {
  return null;
}
