// Single source-of-truth Digol wordmark.
// Renders inline so size/alignment are identical across themes;
// only the color changes (blue in light mode, white in dark mode) via currentColor.
const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <svg
      viewBox="0 0 320 120"
      role="img"
      aria-label="Digol"
      className={`text-[#1565C0] dark:text-white ${className}`}
    >
      <text
        x="50%"
        y="50%"
        dominantBaseline="central"
        textAnchor="middle"
        fontFamily="Poppins, 'Segoe UI', Arial, sans-serif"
        fontSize="78"
        fontWeight="500"
        letterSpacing="-2"
        fill="currentColor"
      >
        Digol
      </text>
    </svg>
  );
};

export default Logo;
