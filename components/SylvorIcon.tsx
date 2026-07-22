type LogoProps = {
  size?: number;
  className?: string;
  rounded?: string;
};
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

export function ChromeGradientDefs() {
  return null;
}
