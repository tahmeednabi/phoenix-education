import { useMergedRef, useWindowScroll } from "@mantine/hooks";
import { throttle } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

interface CardProps {
  className?: string;
  children?: JSX.Element | JSX.Element[];
  vanta?: (ref: React.MutableRefObject<HTMLDivElement | null>) => any;
}

const Card: React.FC<CardProps> = ({ vanta, children, className }) => {
  const [vantaEffect, setVantaEffect] = useState<any>(null);
  const [scroll] = useWindowScroll();
  const [throttledScale, setThrottledScale] = useState("1");

  const vantaRef = useRef<HTMLDivElement>(null);
  const {
    ref: intersectionRef,
    inView,
    entry,
  } = useInView({
    threshold: 0.2,
  });
  const ref = useMergedRef(vantaRef, intersectionRef);

  useEffect(() => {
    if (!inView && vantaEffect) {
      vantaEffect.destroy();
      setVantaEffect(null);
    }

    if (inView && vanta && !vantaEffect) {
      setVantaEffect(vanta(vantaRef));
    }

    return () => {
      if (vantaEffect) {
        vantaEffect.destroy();
        setVantaEffect(null);
      }
    };
  }, [vanta, vantaEffect, inView]);

  const diff = (entry?.target as any)?.offsetTop - scroll.y;
  const scale = (0.9 + 0.1 / (1 + (diff / 300) ** 2)).toFixed(3);

  const throttled = useRef(
    throttle((diff) => {
      setThrottledScale((0.9 + 0.1 / (1 + (diff / 300) ** 2)).toFixed(3));
    }, 200)
  );

  useEffect(
    () => throttled.current((entry?.target as any)?.offsetTop - scroll.y),
    [entry, scroll]
  );

  return (
    <div
      ref={ref}
      className={`w-[64rem] xl:w-[96rem] h-[36rem] xl:h-[54rem] rounded-[3rem] xl:rounded-[4rem] overflow-hidden mx-auto transition-transform ease-linear duration-200 ${className}`}
      style={{
        transform: `scale(${scale})`,
      }}
    >
      {children}
    </div>
  );
};

export { Card };
