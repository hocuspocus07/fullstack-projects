import React,{useState,useEffect} from "react";

function HeroSection() {
  const words = ["Fast", "Reliable", "Innovative"];
  const [text, setText] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [blink, setBlink] = useState(true);
  const typingSpeed = 200; // Speed of typing in ms
  const deletingSpeed = 100; // Speed of deleting in ms
  const pauseDuration = 1000; // Pause between words in ms

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
      <section className="h-screen w-screen flex flex-col justify-center items-start px-40 text-white">
        <span className="text-7xl text-[#FFD700]">VrooomAPI - {text}
        <span className={`ml-1 ${blink ? "opacity-100" : "opacity-0"} text-white`}>|</span></span>
        <p className="mt-3 text-xl max-w-2xl">
          Revolutionize your driving experience with our cutting-edge car API
          solutions. Seamless integration, instant access—start developing right
          after signing up and unlock your API key today!
        </p>
      </section>
  );
}

export default HeroSection;
