import type { SVGProps } from "react";

export interface MacbookProProps extends SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  src?: string;
}

export function MacbookPro({
  width = 800,
  height = 400,
  src,
  ...props
}: MacbookProProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fill="#a4a5a7"
        d="M97.54,13.18h603.92c8.88,0,16.08,5.87,16.08,13.1v336.61H81.46V26.28c0-7.23,5.87-13.1,16.08-13.1Z"
      />

      <path
        fill="#222"
        d="M97.96,14.24h602.45c8.38,0,15.18,5.54,15.18,12.37v336.28H82.59V26.6c0-6.83,5.54-12.37,15.37-12.37Z"
      />

      <rect
        fill="currentColor"
        x="91.52"
        y="21.32"
        width="618.22"
        rx="5"
        ry="5"
        height="323.85"
      />
      {src && (
        <image
          href={src}
          x="91.52"
          y="21.32"
          width="618.22"
          height="323.85"
          preserveAspectRatio="xMidYMid slice"
          clipPath="url(#roundedCorners)"
        />
      )}
      <rect fill="#1d1d1d" x="84.09" y="350.51" width="640.11" height="12.48" />

      {/* // Laptop Camera Area Top */}
      <path
        fill="#000"
        d="M366.14,21.02h66.07v6.5c0,1.56-1.27,2.82-2.82,2.82h-59.42c-1.56,0-2.82-1.27-2.82-2.82v-6.5h0Z"
      />
      <path
        fill="#acadaf"
        d="M23.04,362.77h751.92v10.39c0,5.95-4.83,10.79-10.79,10.79H33.83c-5.95,0-10.79-4.83-10.79-10.79v-10.39h0Z"
      />

      {/* // Camera */}
      <path
        fill="#080d4c"
        d="M399.11,25.14c-1.99.03-1.99-3.09,0-3.06,1.99-.03,1.99,3.09,0,3.06Z"
      />

      <polygon
        fill="#b9b9bb"
        points="737.06 385.39 697.29 385.39 695.84 383.95 738.82 383.95 737.06 385.39"
      />
      <polygon
        fill="#292929"
        points="735.73 386.82 698.64 386.82 697.32 385.39 737.35 385.39 735.73 386.82"
      />
      <polygon
        fill="#b9b9bb"
        points="101.64 385.39 61.87 385.39 60.43 383.95 103.41 383.95 101.64 385.39"
      />
      <polygon
        fill="#292929"
        points="100.31 386.82 63.23 386.82 61.9 385.39 101.93 385.39 100.31 386.82"
      />
      <path
        fill="#8f9091"
        d="M341.11,362.6h115.05c0,3.63-2.95,6.58-6.58,6.58h-99.89c-3.63,0-6.58-2.95-6.58-6.58h0Z"
      />

      <defs>
        <clipPath id="roundedCorners">
          <rect
            fill="#ffffff"
            x="91.52"
            y="21.32"
            width="618.22"
            height="323.85"
            rx="5"
            ry="5"
          />
        </clipPath>
      </defs>
    </svg>
  );
}