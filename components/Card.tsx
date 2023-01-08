import { useMergedRef } from "@mantine/hooks";
import React, { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

interface CardProps {
  className?: string;
  children?: JSX.Element | JSX.Element[];
  vanta?: (ref: React.MutableRefObject<HTMLDivElement | null>) => any;
}

const Card: React.FC<CardProps> = ({ vanta, children, className }) => {
  const [vantaEffect, setVantaEffect] = useState<any>(null);
  const vantaRef = useRef<HTMLDivElement>(null);
  const { ref: intersectionRef, inView } = useInView({ threshold: 0.2 });
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

  return (
    <div
      ref={ref}
      className={`w-[64rem] xl:w-[96rem] h-[36rem] xl:h-[54rem] rounded-[3rem] xl:rounded-[4rem] overflow-hidden mx-auto transition-transform duration-500 ${className}`}
      style={{
        transform: inView ? "scale(1)" : "scale(0.95)",
      }}
    >
      {children}
    </div>
  );
};

export { Card };
