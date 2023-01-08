import { Carousel } from "@mantine/carousel";
import { createStyles } from "@mantine/core";
import React from "react";

interface ProjectBoxProps {
  logo: React.ReactNode;
  slides: Array<{
    title: string;
    icon: React.ReactNode;
    body: string;
  }>;
}

const useStyles = createStyles((_theme, _params, getRef) => ({
  controls: {
    ref: getRef("controls"),
    transition: "opacity 150ms ease",
    opacity: 0,
  },

  root: {
    "&:hover": {
      [`& .${getRef("controls")}`]: {
        opacity: 1,
      },
    },
  },
}));

const ProjectBox: React.FC<ProjectBoxProps> = ({ logo, slides }) => {
  const { classes } = useStyles();

  return (
    <div className="w-[40%] ml-auto pt-24 flex flex-col gap-10">
      {logo}

      <div className="-mx-12">
        <Carousel
          withIndicators
          classNames={{ indicator: "w-2 h-2", ...classes }}
          slideSize="100%"
          height={200}
        >
          {slides.map((slide, index) => (
            <Carousel.Slide key={index}>
              <div className="flex flex-col gap-4 px-12">
                <h2 className="flex items-center gap-3">
                  {slide.icon}
                  {slide.title}
                </h2>

                <p className="text-lg">{slide.body}</p>
              </div>
            </Carousel.Slide>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export { ProjectBox };
