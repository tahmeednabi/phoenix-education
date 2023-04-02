import React from "react";
import { useSpring, animated, easings, SpringConfig } from "@react-spring/web";

export const AnimatedPhoenix: React.FC = () => {
  const leftTail = [
    "m44.282 276.34 15.046-17.857 4.903-16.696-12.008 12.594z",
    "m38.788 272.76 17.918-14.973 7.7278-15.591-14.012 10.318z",
  ];
  const rightTail = [
    "m87.998 276.26-15.046-17.857-4.903-16.696 12.008 12.594z",
    "m93.38 272.65-17.918-14.973-7.7277-15.591 14.012 10.318z",
  ];
  const wings = [
    "m191.78 144.62-53.537 170.62 69.877-109.57 41.416 3.3086 0.46289 0.0918 41.879-3.4023 69.877 109.57-55.51-170.61c-5.7435 21.944-33.563 33.253-56.246 33.268-22.678-0.0289-52.485-11.346-58.219-33.287z",
    "m191.78 136.62-141.54 110.62 121.88-49.572 77.416 11.309 0.46289 0.0918 77.879-11.402 121.88 49.574-143.51-110.61c-5.7435 21.944-33.563 37.253-56.246 37.268-22.678-0.0289-52.485-15.346-58.219-37.287z",
  ];
  const upperWings = [
    "m52.942 46.99-9.8063 7.6249-12.518 21.218 17.192-15.01z",
    "m79.631 47.356 9.8063 7.6249 12.518 21.218-17.192-15.01z",
  ];

  const config: SpringConfig = {
    duration: 3500,
    easing: easings.easeInOutQuad,
  };

  const containerSpring = useSpring({
    from: { transform: "translateY(4rem)" },
    to: { transform: "translateY(0)" },
    config,
  });

  const upperWingSprings1 = useSpring({
    from: { transform: "matrix(1.0 0 0 1.0, -3.44, 0.0706)" },
    to: { transform: "matrix(0 1.7826 -1.5517 0 126.15 -47.231)" },
    config,
  });

  const upperWingSprings2 = useSpring({
    from: { transform: "matrix(1.0 0 0 1.0 -2.043 -0.1797)" },
    to: { transform: "matrix(0 -1.7826 1.5841 0 4.318 189.46)" },
    config,
  });

  const wingSprings = useSpring({
    from: { d: wings[0] },
    to: { d: wings[1] },
    config,
  });

  const leftTailSpring = useSpring({
    from: { d: leftTail[0] },
    to: { d: leftTail[1] },
    config,
  });

  const rightTailSpring = useSpring({
    from: { d: rightTail[0] },
    to: { d: rightTail[1] },
    config,
  });

  return (
    <animated.div style={containerSpring} className="animate-opacity">
      <svg
        version="1.1"
        viewBox="0 0 132.29 132.29"
        xmlns="http://www.w3.org/2000/svg"
      >
        <animated.g transform={upperWingSprings1.transform}>
          <path d={upperWings[0]} fill={"#8f1c1c"} />
        </animated.g>

        <animated.g transform={upperWingSprings2.transform}>
          <path d={upperWings[1]} fill={"#8f1c1c"} />
        </animated.g>

        <g transform="translate(0 -164.71)">
          {/* WINGS */}

          <animated.path
            d={wingSprings.d}
            fill={"#d03535"}
            transform="matrix(.26458 0 0 .26458 0 164.71)"
          />

          <path
            d="m66.146 197.93 4.3526-5.9695-4.3526-12.277-4.3526 12.277z"
            fill={"#d03535"}
          />
          <path
            d="m66.146 207.08 3.9159-12.06-3.9159-8.8718-3.9159 8.8718z"
            fill={"#efca35"}
          />
          <path
            d="m72.76 219.71-6.6146-11.261-6.6146 11.261 6.6146 21.844z"
            fill={"#8f1c1c"}
          />
          <g fill={"#efca35"}>
            <path d="m66.146 283.04 4.102-22.988-4.102-16.911-4.102 16.911z" />

            {/* TAILS */}

            <animated.path d={leftTailSpring.d} />

            <animated.path d={rightTailSpring.d} />
          </g>
        </g>
      </svg>
    </animated.div>
  );
};
