export function BrandMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-md bg-mist text-teal ${className}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 64 64" className="h-3/4 w-3/4" fill="none">
        <path
          d="M14 35C22 22 29 16 35 16C43 16 49 24 56 31"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M14 47C23 35 30 30 36 30C44 30 49 37 56 43"
          stroke="#23463F"
          strokeWidth="6"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}
