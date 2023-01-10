import { useMergedRef } from "@mantine/hooks";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

interface CardProps {
  className?: string;
  children?: any | any[];
  vanta?: (ref: React.MutableRefObject<HTMLDivElement | null>) => any;
}

const Card: React.FC<CardProps> = ({ vanta, children, className }) => {
  const [vantaEffect, setVantaEffect] = useState<any>(null);

  const vantaRef = useRef<HTMLDivElement>(null);
  const { ref: intersectionRef, inView, entry } = useInView();
  const ref = useMergedRef(vantaRef, intersectionRef);

  const { scrollY } = useScroll();
  const cardY = useMotionValue(0);
  const scale = useTransform(scrollY, (value) => {
    const diff = cardY.get() - value;
    return 0.9 + 0.1 / (1 + (diff / 500) ** 2);
  });
  const springScale = useSpring(scale, {
    duration: 0.2,
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

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

  useEffect(() => {
    if (entry?.target) {
      return cardY.set((entry?.target as any)?.offsetTop);
    }
  }, [entry]);

  return (
    <motion.div
      ref={ref}
      className={`w-[64rem] xl:w-[96rem] h-[36rem] xl:h-[54rem] rounded-[3rem] xl:rounded-[4rem] overflow-hidden mx-auto transition ease-linear duration-200 ${className}`}
      style={{
        scale: springScale,
      }}
    >
      {children}
    </motion.div>
  );
};

export { Card };
