import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

function HeroSection() {
  const words = ["Fast", "Reliable", "Innovative"];
  const [text, setText] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [blink, setBlink] = useState(true);
  const typingSpeed = 200;
  const deletingSpeed = 100;
  const pauseDuration = 1000;

  useEffect(() => {
    const handleTyping = () => {
      const currentWord = words[currentWordIndex];
      if (!isDeleting) {
        if (text !== currentWord) {
          setText((prev) => currentWord.slice(0, prev.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseDuration); // Pause before deleting
        }
      } else {
        if (text !== "") {
          setText((prev) => prev.slice(0, prev.length - 1));
        } else {
          // Move to next word
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    };

    const timer = setTimeout(
      handleTyping,
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timer);
  }, [text, isDeleting, currentWordIndex]);

  useEffect(() => {
    const cursorBlink = setInterval(() => {
      setBlink((prev) => !prev);
    }, 250);
    return () => clearInterval(cursorBlink);
  }, []);

  return (
    <motion.section
      className="h-screen w-screen flex flex-col justify-center items-start px-10 md:px-40 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      <motion.span
        className="text-4xl sm:text-5xl md:text-7xl mt-10 text-[#FFD700]"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        VrooomAPI - {text}
        <span
          className={`ml-1 ${blink ? "opacity-100" : "opacity-0"} text-white`}
        >
          |
        </span>
      </motion.span>
      <motion.p
        className="mt-5 sm:mt-8 md:mt-10 text-sm sm:text-lg md:text-xl max-w-xl sm:max-w-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        Revolutionize your driving experience with our cutting-edge car API
        solutions. Seamless integration, instant access—start developing right
        after signing up and unlock your API key today!
      </motion.p>
    </motion.section>
  );
}

export default HeroSection;
