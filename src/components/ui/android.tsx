import { SVGProps, useId } from "react";

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
  const uid = useId();
  const clipId = `iosScreenClip-${uid}`;
  const bezelId = `iosBezelGradient-${uid}`;
  const frameId = `iosFrameGradient-${uid}`;
  const buttonId = `iosButtonGradient-${uid}`;
  const shadowId = `iosDropShadow-${uid}`;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <filter id={shadowId} x="-50%" y="-50%" width="200%" height="200%">
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

      <rect
        x="0"
        y="0"
        width="280"
        height="620"
        rx="48"
        ry="48"
        fill={`url(#${bezelId})`}
        stroke="#8E949A"
        strokeWidth="1"
        filter={`url(#${shadowId})`}
      />

      <rect
        x="2"
        y="2"
        width="276"
        height="616"
        rx="46"
        ry="46"
        fill={`url(#${frameId})`}
      />

      <g clipPath={`url(#${clipId})`}>
        <rect
          x="8"
          y="8"
          width="268"
          height="604"
          rx="40"
          ry="40"
          fill="#000000"
        />
      </g>

      <rect
        x="92"
        y="20"
        width="96"
        height="24"
        rx="12"
        fill="#060708"
        opacity="0.95"
      />

      <circle cx="166" cy="32" r="3" fill="#15181B" />
      <circle cx="166" cy="32" r="1.3" fill="#2A3138" />

      <rect
        x="275"
        y="138"
        width="3"
        height="78"
        rx="1.5"
        fill={`url(#${buttonId})`}
      />
      <rect
        x="2"
        y="122"
        width="3"
        height="48"
        rx="1.5"
        fill={`url(#${buttonId})`}
      />
      <rect
        x="2"
        y="180"
        width="3"
        height="48"
        rx="1.5"
        fill={`url(#${buttonId})`}
      />

      <rect
        x="24"
        y="50"
        width="232"
        height="1"
        fill="#BFC5CC"
        opacity="0.55"
      />
      <rect
        x="24"
        y="570"
        width="232"
        height="1"
        fill="#BFC5CC"
        opacity="0.55"
      />

      {src && (
        <image
          href={src}
          x="10"
          y="10"
          width="264"
          height="600"
          preserveAspectRatio="xMidYMid slice"
          clipPath={`url(#${clipId})`}
        />
      )}
      {videoSrc && (
        <foreignObject
          x="10"
          y="10"
          width="264"
          height="600"
          clipPath={`url(#${clipId})`}
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

      <defs>
        <clipPath id={clipId}>
          <rect
            x="8"
            y="8"
            width="268"
            height="604"
            rx="40"
            ry="40"
            fill="#FFFFFF"
          />
        </clipPath>
        <linearGradient id={bezelId} x1="0" y1="0" x2="280" y2="620">
          <stop offset="0%" stopColor="#AFB4BA" />
          <stop offset="45%" stopColor="#808790" />
          <stop offset="100%" stopColor="#5E656D" />
        </linearGradient>
        <linearGradient id={frameId} x1="0" y1="0" x2="0" y2="620">
          <stop offset="0%" stopColor="#E6E8EB" />
          <stop offset="30%" stopColor="#A8AEB5" />
          <stop offset="100%" stopColor="#7D858D" />
        </linearGradient>
        <linearGradient id={buttonId} x1="0" y1="0" x2="0" y2="80">
          <stop offset="0%" stopColor="#BFC5CC" />
          <stop offset="100%" stopColor="#76808A" />
        </linearGradient>
      </defs>
    </svg>
  );
}