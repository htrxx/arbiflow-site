"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.92, 1] : [1.05, 1];
  };

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  // Small lift, always less than the gap above the title, so it never rides up into the content above it.
  const translate = useTransform(scrollYProgress, [0, 1], isMobile ? [0, -16] : [0, -40]);

  return (
    <div
      className="relative flex items-start justify-center px-3 pb-10 pt-2 sm:px-6 lg:px-12 lg:pb-28"
      ref={containerRef}
    >
      <div
        className="py-6 lg:py-8 w-full relative"
        style={{
          perspective: "1000px",
        }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({
  translate,
  titleComponent,
}: {
  translate: MotionValue<number>;
  titleComponent: string | React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="div relative z-10 max-w-5xl mx-auto text-center"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003, 0 40px 140px -40px rgba(31,107,255,0.55)",
      }}
      className="relative z-0 max-w-6xl mt-6 lg:mt-14 mx-auto w-full border-2 md:border-4 border-line p-1.5 sm:p-3 md:p-4 bg-surface-2 rounded-[18px] sm:rounded-[24px] md:rounded-[30px] shadow-2xl"
    >
      <div className="w-full overflow-hidden rounded-[12px] bg-ink sm:rounded-[16px] md:rounded-2xl">
        {children}
      </div>
    </motion.div>
  );
};
