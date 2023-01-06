import React, { useEffect, useRef, useState } from "react";

interface CardProps {
  className?: string;
  children?: JSX.Element | JSX.Element[];
  vanta?: (ref: React.MutableRefObject<null>) => any;
}

const Card: React.FC<CardProps> = ({ vanta, children, className }) => {
  const [vantaEffect, setVantaEffect] = useState<any>(null);
  const ref = useRef(null);

  useEffect(() => {
    if (vanta && !vantaEffect) {
      setVantaEffect(vanta(ref));
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vanta, vantaEffect]);

  return (
    <div
      ref={ref}
      className={`w-[64rem] xl:w-[96rem] h-[36rem] xl:h-[54rem] rounded-[3rem] xl:rounded-[4rem] overflow-hidden mx-auto ${className}`}
    >
      {children}
    </div>
  );
};

export { Card };
