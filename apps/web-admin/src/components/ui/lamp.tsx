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
        minHeight: "44rem",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        backgroundColor: "#050507",
        width: "100%",
        zIndex: 0,
        paddingTop: "60px",
        paddingBottom: "80px",
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
          initial={{ opacity: 0.5, width: "16rem" }}
          whileInView={{ opacity: 1, width: "32rem" }}
          viewport={{ once: true }}
          transition={{
            delay: 0.2,
            duration: 0.9,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            right: "50%",
            top: "80px",
            height: "15rem",
            width: "32rem",
            background: `conic-gradient(from 70deg at center top, ${glowColor}, rgba(225, 29, 72, 0.4) 20%, transparent 60%)`,
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
              height: "10rem",
              background: "linear-gradient(to top, #050507 20%, transparent 100%)",
              zIndex: 20,
            }}
          />
          <div
            style={{
              position: "absolute",
              width: "10rem",
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
          initial={{ opacity: 0.5, width: "16rem" }}
          whileInView={{ opacity: 1, width: "32rem" }}
          viewport={{ once: true }}
          transition={{
            delay: 0.2,
            duration: 0.9,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            left: "50%",
            top: "80px",
            height: "15rem",
            width: "32rem",
            background: `conic-gradient(from 290deg at center top, transparent 40%, rgba(225, 29, 72, 0.4) 80%, ${glowColor} 100%)`,
            color: "#ffffff",
          }}
        >
          {/* Masking gradients */}
          <div
            style={{
              position: "absolute",
              width: "10rem",
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
              height: "10rem",
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
            height: "12rem",
            width: "100%",
            backgroundColor: "#050507",
            filter: "blur(40px)",
            transform: "translateY(40px)",
          }}
        />

        {/* Core Spotlight Glow Bubble */}
        <div
          style={{
            position: "absolute",
            top: "130px",
            height: "9rem",
            width: "30rem",
            borderRadius: "50%",
            backgroundColor: glowColor,
            opacity: 0.65,
            filter: "blur(60px)",
            zIndex: 30,
          }}
        />

        {/* Inner Highlight Light Beam */}
        <motion.div
          initial={{ width: "10rem" }}
          whileInView={{ width: "20rem" }}
          viewport={{ once: true }}
          transition={{
            delay: 0.2,
            duration: 0.9,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            top: "90px",
            height: "9rem",
            width: "20rem",
            borderRadius: "50%",
            backgroundColor: "#fda4af",
            opacity: 0.7,
            filter: "blur(35px)",
            zIndex: 35,
          }}
        />

        {/* Top Crisp Illuminating Beam Line */}
        <motion.div
          initial={{ width: "16rem" }}
          whileInView={{ width: "38rem" }}
          viewport={{ once: true }}
          transition={{
            delay: 0.2,
            duration: 0.9,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            top: "80px",
            height: "3px",
            width: "38rem",
            background: "linear-gradient(to right, transparent, #fda4af 25%, #ffffff 50%, #fda4af 75%, transparent)",
            boxShadow: `0 0 25px ${glowColor}, 0 0 45px #ffffff`,
            zIndex: 50,
          }}
        />
      </div>

      {/* Children Content placed directly underneath the illuminating lamp */}
      <div
        style={{
          position: "relative",
          zIndex: 50,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "0 24px",
          textAlign: "center",
          marginTop: "-110px",
          width: "100%",
        }}
      >
        {children}
      </div>
    </div>
  );
};
