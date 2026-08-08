/** StackClash mark — two clashing wedges in a rounded tile. */
let markSeq = 0;

export default function BrandMark({
  className = 'h-8 w-8',
  title = 'StackClash',
}: {
  className?: string;
  title?: string;
}) {
  markSeq += 1;
  const uid = `sc${markSeq}`;
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={title}
    >
      <defs>
        <linearGradient id={`${uid}-bg`} x1="8" y1="4" x2="56" y2="60" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FB923C" />
          <stop offset="1" stopColor="#EA580C" />
        </linearGradient>
        <linearGradient id={`${uid}-shine`} x1="20" y1="10" x2="44" y2="54" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" stopOpacity="0.35" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" fill={`url(#${uid}-bg)`} />
      <rect width="64" height="64" rx="16" fill={`url(#${uid}-shine)`} />
      {/* Left wedge */}
      <path
        d="M14 40 L30 18 L30 28 L18 44 Z"
        fill="white"
        fillOpacity="0.95"
      />
      {/* Right wedge — clash */}
      <path
        d="M50 24 L34 46 L34 36 L46 20 Z"
        fill="white"
        fillOpacity="0.85"
      />
      {/* Impact spark */}
      <circle cx="32" cy="32" r="3.5" fill="#FFF7ED" />
    </svg>
  );
}
