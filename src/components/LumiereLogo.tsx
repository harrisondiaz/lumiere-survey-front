interface LumiereLogoProps {
  size?: number;
  className?: string;
}

export function LumiereLogo({ size = 48, className = "" }: LumiereLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Lumière logo"
    >
      <rect
        x="4"
        y="4"
        width="56"
        height="56"
        rx="12"
        stroke="#C9A84C"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M22 16 L22 48 M22 16 L42 16 L32 32 L42 48 L22 48"
        stroke="#C9A84C"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
