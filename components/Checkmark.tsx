import Lottie from "lottie-react";
import React from "react";
import CheckmarkJson from "@res/animations/checkmark.json";
import LoaderJson from "@res/animations/loader.json";

interface CheckmarkProps {
  loading?: boolean;
  className?: string;
}

const Checkmark: React.FC<CheckmarkProps> = ({ loading, className }) => {
  return (
    <div className="flex justify-center">
      {loading ? (
        <Lottie
          className={`w-14 h-14 scale-[1.8] ${className}`}
          animationData={LoaderJson}
          loop
        />
      ) : (
        <Lottie
          className={`w-14 h-14 ${className}`}
          loop={false}
          animationData={CheckmarkJson}
        />
      )}
    </div>
  );
};

export { Checkmark };
