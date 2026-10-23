import React from "react";
import { motion } from "framer-motion";

export const LampContainer: React.FC<{
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}> = ({ children, className = "", glowColor = "#e11d48" }) => {
  return (
    <div
      className={className}
      style={{
        position: "relative",
        display: "flex",
        minHeight: "24rem",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        backgroundColor: "#050507",
        width: "100%",
        zIndex: 0,
        paddingTop: "40px",
        paddingBottom: "24px",
      }}
    >
      <div
        style={{
          position: "relative",
          display: "flex",
          width: "100%",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          isolation: "isolate",
          zIndex: 0,
        }}
      >
        {/* Left Glowing Cone */}
        <motion.div
          initial={{ opacity: 0.4, width: "18rem" }}
          whileInView={{ opacity: 1, width: "36rem" }}
          viewport={{ once: true }}
          transition={{
            delay: 0.2,
            duration: 0.9,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            right: "50%",
            top: "20px",
            height: "16rem",
            width: "36rem",
            background: `conic-gradient(from 70deg at center top, ${glowColor}, rgba(225, 29, 72, 0.45) 25%, transparent 65%)`,
            color: "#ffffff",
          }}
        >
          {/* Masking gradients */}
          <div
            style={{
              position: "absolute",
              width: "100%",
              left: 0,
              bottom: 0,
              height: "8rem",
              background: "linear-gradient(to top, #050507 20%, transparent 100%)",
              zIndex: 20,
            }}
          />
          <div
            style={{
              position: "absolute",
              width: "12rem",
              left: 0,
              bottom: 0,
              height: "100%",
              background: "linear-gradient(to right, #050507 20%, transparent 100%)",
              zIndex: 20,
            }}
          />
        </motion.div>

        {/* Right Glowing Cone */}
        <motion.div
          initial={{ opacity: 0.4, width: "18rem" }}
          whileInView={{ opacity: 1, width: "36rem" }}
          viewport={{ once: true }}
          transition={{
            delay: 0.2,
            duration: 0.9,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            left: "50%",
            top: "20px",
            height: "16rem",
            width: "36rem",
            background: `conic-gradient(from 290deg at center top, transparent 35%, rgba(225, 29, 72, 0.45) 75%, ${glowColor} 100%)`,
            color: "#ffffff",
          }}
        >
          {/* Masking gradients */}
          <div
            style={{
              position: "absolute",
              width: "12rem",
              right: 0,
              bottom: 0,
              height: "100%",
              background: "linear-gradient(to left, #050507 20%, transparent 100%)",
              zIndex: 20,
            }}
          />
          <div
            style={{
              position: "absolute",
              width: "100%",
              right: 0,
              bottom: 0,
              height: "8rem",
              background: "linear-gradient(to top, #050507 20%, transparent 100%)",
              zIndex: 20,
            }}
          />
        </motion.div>

        {/* Center Blur Ambient Light */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            height: "10rem",
            width: "100%",
            backgroundColor: "#050507",
            filter: "blur(40px)",
            transform: "translateY(20px)",
          }}
        />

        {/* Core Spotlight Glow Bubble Overhead */}
        <div
          style={{
            position: "absolute",
            top: "40px",
            height: "8rem",
            width: "30rem",
            borderRadius: "50%",
            backgroundColor: glowColor,
            opacity: 0.65,
            filter: "blur(55px)",
            zIndex: 30,
          }}
        />

        {/* Inner Highlight Light Beam */}
        <motion.div
          initial={{ width: "12rem" }}
          whileInView={{ width: "24rem" }}
          viewport={{ once: true }}
          transition={{
            delay: 0.2,
            duration: 0.9,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            top: "22px",
            height: "7rem",
            width: "24rem",
            borderRadius: "50%",
            backgroundColor: "#fda4af",
            opacity: 0.75,
            filter: "blur(35px)",
            zIndex: 35,
          }}
        />

        {/* Top Crisp Illuminating Beam Line (Aceternity Lamp Beam) */}
        <motion.div
          initial={{ width: "18rem" }}
          whileInView={{ width: "42rem" }}
          viewport={{ once: true }}
          transition={{
            delay: 0.2,
            duration: 0.9,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            top: "20px",
            height: "3px",
            width: "42rem",
            background: "linear-gradient(to right, transparent, #fda4af 25%, #ffffff 50%, #fda4af 75%, transparent)",
            boxShadow: `0 0 30px ${glowColor}, 0 0 60px #ffffff`,
            zIndex: 50,
          }}
        />
      </div>

      {/* Children Content placed cleanly BELOW the overhead illuminating lamp */}
      <div
        style={{
          position: "relative",
          zIndex: 50,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "0 24px",
          textAlign: "center",
          marginTop: "30px",
          width: "100%",
        }}
      >
        {children}
      </div>
    </div>
  );
};
