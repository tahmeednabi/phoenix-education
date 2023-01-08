import React from "react";
import { Card } from "../components/Card";
import TOPOLOGY from "vanta/dist/vanta.topology.min";
import * as p5 from "p5";
import AtIcon from "@res/svgs/AtIcon.svg";
import LinkedInIcon from "@res/svgs/LinkedInIcon.svg";
import GithubIcon from "@res/svgs/GithubIcon.svg";
import { motion, Variants } from "framer-motion";

const Title: React.FC = () => {
  const buttonVariants: Variants = {
    hidden: { opacity: 0, scale: 0 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  };

  const titleVariants: Variants = {
    hidden: { opacity: 0, translateY: 10 },
    show: { opacity: 1, translateY: 0, transition: { delay: 0.5 } },
  };

  const subtitleVariants: Variants = {
    hidden: { opacity: 0, translateY: 10 },
    show: { opacity: 1, translateY: 0, transition: { delay: 1 } },
  };

  return (
    <Card
      className="relative animate-opacity flex flex-col justify-center bg-[#1e0d59] p-24 xl:p-36"
      vanta={(ref) =>
        TOPOLOGY({
          p5,
          el: ref.current,
          color: "#a32abe",
          backgroundColor: "#1e0d59",
        })
      }
    >
      <motion.h1
        initial="hidden"
        animate="show"
        variants={titleVariants}
        className="text-[6rem] mt-10 xl:text-[9rem] leading-[0.9]"
      >
        Tahmeed
        <br />
        Nabi
      </motion.h1>

      <motion.h2
        initial="hidden"
        animate="show"
        variants={subtitleVariants}
        className="
        font-bold text-right mr-[24rem] xl:mr-[36rem] text-[3rem] xl:text-[4.5rem] mt-8 leading-[1]
        text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-blue-300"
      >
        FULL-STACK <br />
        <span className="text-[2.8rem] xl:text-[4.2rem]">DEVELOPER</span>
      </motion.h2>

      <motion.div
        className="absolute right-24 bottom-32 flex gap-6 items-center"
        variants={{
          show: {
            transition: {
              staggerChildren: 0.2,
              delayChildren: 1.5,
            },
          },
        }}
        initial="hidden"
        animate="show"
      >
        <motion.a
          className="cursor-pointer hover:-translate-y-1 transition duration-300"
          variants={buttonVariants}
          href="mailto:tahmeednabi1998@gmail.com"
        >
          <AtIcon />
        </motion.a>

        <motion.a
          className="cursor-pointer hover:-translate-y-1 transition duration-300"
          variants={buttonVariants}
          href="https://www.linkedin.com/in/tahmeed-nabi/"
        >
          <LinkedInIcon />
        </motion.a>

        <motion.a
          className="cursor-pointer hover:-translate-y-1 transition duration-300"
          variants={buttonVariants}
          href="https://github.com/tahmeednabi"
        >
          <GithubIcon />
        </motion.a>
      </motion.div>
    </Card>
  );
};

export { Title };
