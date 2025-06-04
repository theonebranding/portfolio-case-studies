import { SVGProps } from "react";

export interface AndroidProps extends SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  src?: string;
  videoSrc?: string;
}

export function Android({
  width = 280,
  height = 620,
  src,
  videoSrc,
  ...props
}: AndroidProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* Drop Shadow for 3D Effect */}
      <filter id="dropShadow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="5" />
        <feOffset dx="2" dy="4" result="offsetblur" />
        <feComponentTransfer>
          <feFuncA type="linear" slope="0.5" />
        </feComponentTransfer>
        <feMerge>
          <feMergeNode />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      {/* Outer Bezel with Glass-like Gradient */}
      <rect
        x="0"
        y="0"
        width="280"
        height="620"
        rx="25"
        ry="25"
        fill="url(#bezelGradient)"
        stroke="#C0C0C0"
        strokeWidth="1"
        filter="url(#dropShadow)"
        className="dark:stroke-[#404040]"
      />

      {/* Side Frame with Metallic Texture */}
      <rect
        x="2"
        y="2"
        width="276"
        height="616"
        rx="23"
        ry="23"
        fill="url(#frameGradient)"
      />

      {/* Screen Area */}
      <g clipPath="url(#screenClip)">
        <rect
          x="6"
          y="10"
          width="268"
          height="600"
          rx="20"
          ry="20"
          fill="#000000"
        />
      </g>

      {/* Punch-Hole Camera */}
      <circle
        cx="30"
        cy="25"
        r="8"
        fill="#000000"
      />
      <circle
        cx="30"
        cy="25"
        r="4"
        fill="#1A1A1A"
      />

      {/* Back Camera Module */}
      <rect
        x="210"
        y="10"
        width="60"
        height="40"
        rx="8"
        ry="8"
        fill="#1A1A1A"
        className="dark:fill-[#303030]"
      />
      <circle
        cx="230"
        cy="30"
        r="8"
        fill="#000000"
      />
      <circle
        cx="250"
        cy="30"
        r="8"
        fill="#000000"
      />
      <circle
        cx="250"
        cy="30"
        r="3"
        fill="#FFFFFF"
        opacity="0.2"
      />

      {/* Power Button */}
      <rect
        x="274"
        y="140"
        width="4"
        height="50"
        rx="2"
        fill="url(#buttonGradient)"
        className="dark:fill-[#404040]"
      />

      {/* Volume Buttons */}
      <rect
        x="2"
        y="120"
        width="4"
        height="40"
        rx="2"
        fill="url(#buttonGradient)"
        className="dark:fill-[#404040]"
      />
      <rect
        x="2"
        y="170"
        width="4"
        height="40"
        rx="2"
        fill="url(#buttonGradient)"
        className="dark:fill-[#404040]"
      />

      {/* Antenna Lines */}
      <rect
        x="2"
        y="50"
        width="276"
        height="2"
        fill="#C0C0C0"
        className="dark:fill-[#404040]"
      />
      <rect
        x="2"
        y="568"
        width="276"
        height="2"
        fill="#C0C0C0"
        className="dark:fill-[#404040]"
      />

      {/* Image or Video Content */}
      {src && (
        <image
          href={src}
          x="8"
          y="12"
          width="264"
          height="596"
          preserveAspectRatio="xMidYMid meet"
          clipPath="url(#screenClip)"
        />
      )}
      {videoSrc && (
        <foreignObject
          x="8"
          y="12"
          width="264"
          height="596"
          clipPath="url(#screenClip)"
        >
          <video
            className="size-full object-cover"
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
          />
        </foreignObject>
      )}

      {/* Definitions */}
      <defs>
        <clipPath id="screenClip">
          <rect
            x="6"
            y="10"
            width="268"
            height="600"
            rx="20"
            ry="20"
            fill="#FFFFFF"
            className="dark:fill-[#262626]"
          />
        </clipPath>
        <linearGradient id="bezelGradient" x1="0" y1="0" x2="280" y2="620">
          <stop offset="0%" stopColor="#2A2A2A" className="dark:stop-color-[#4A4A4A]" />
          <stop offset="100%" stopColor="#1A1A1A" className="dark:stop-color-[#303030]" />
        </linearGradient>
        <linearGradient id="frameGradient" x1="0" y1="0" x2="0" y2="620">
          <stop offset="0%" stopColor="#C0C0C0" className="dark:stop-color-[#404040]" />
          <stop offset="100%" stopColor="#A0A0A0" className="dark:stop-color-[#303030]" />
        </linearGradient>
        <linearGradient id="buttonGradient" x1="0" y1="0" x2="0" y2="50">
          <stop offset="0%" stopColor="#C0C0C0" className="dark:stop-color-[#404040]" />
          <stop offset="100%" stopColor="#A0A0A0" className="dark:stop-color-[#303030]" />
        </linearGradient>
      </defs>
    </svg>
  );
}