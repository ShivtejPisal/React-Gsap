import "./index.css";
import Canvas from "./Canvas";
import data from "./data";
import LocomotiveScroll from "locomotive-scroll";
import { useEffect, useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Circ, Expo } from "gsap/all";

function App() {
  const [showCanvas, setShowCanvas] = useState(false);
  const headingref = useRef(null);
  const growingSpan = useRef(null);

  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll();
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      setShowCanvas((prevShowCanvas) => {
        if (!prevShowCanvas) {
          gsap.set(growingSpan.current, {
            top: e.clientY,
            left: e.clientX,
          });

          gsap.to("body", {
            color: "#000",
            backgroundColor: "#fd2c2a",
            duration: 1.2,
            ease: "power2.inOut",
          });

          gsap.to(growingSpan.current, {
            scale: 1000,
            duration: 2,
            ease: "power2.inOut",
            onComplete: () => {
              gsap.set(growingSpan.current, {
                scale: 0,
                clearProps: "all",
              });
            },
          });
        } else {
          gsap.to("body", {
            color: "#fff",
            backgroundColor: "#000",
            duration: 1.2,
            ease: "power2.inOut",
          });
        }

        return !prevShowCanvas;
      });
    };

    const headingElement = headingref.current;
    headingElement.addEventListener("click", handleClick);

    // Clean up event listener on unmount
    return () => headingElement.removeEventListener("click", handleClick);
  }, []);

  return (
    <>
      <span
        ref={growingSpan}
        className="growing rounded-full block fixed top-[-20px] left-[-20px] w-5 h-5"
      ></span>
      <div className="w-full relative min-h-screen font-['Helvetica_Now_Display']">
        {showCanvas &&
          data[0].map((canvasdets, index) => <Canvas details={canvasdets} />)}
        <div className="w-full relative z-[1] h-screen ">
          <nav className="w-full p-8 flex justify-between z-50">
            <div className="brand text-2xl font-md">Shivtej Pisal</div>
            {/* <div className="links flex gap-10">
              {[
                "What we do",
                "Who we are",
                "How we give back",
                "Talk to us",
              ].map((link, index) => (
                <a
                  key={index}
                  href={`#${link.toLowerCase()}`}
                  className="text-md hover:text-gray-300"
                >
                  {link}
                </a>
              ))}
            </div> */}
          </nav>
          <div className="textcontainer  w-full px-[20%]">
            <div className="text w-[50%]">
              <h3 className="text-4xl leading-[1.2]">
              Driven by passion, ready to innovate, and eager to grow.
              </h3>
              <p className="text-lg w-[80%] mt-10 font-normal">
              I am enthusiastic about crafting meaningful digital experiences through innovative solutions. With a strong foundation in development and design, 
              I am eager to contribute to impactful projects while learning and evolving in a collaborative environment.
              </p>
            </div>
          </div>
          <div className="w-full absolute bottom-0 left-0">
            <h1
              ref={headingref}
              className="text-[17rem] font-normal tracking-tight leading-none pl-5"
            >
              Clickrighthere
            </h1>
          </div>
        </div>
      </div>
      <div className="w-full relative h-screen  mt-32 px-10 font-['Helvetica_Now_Display']">
        {showCanvas &&
          data[1].map((canvasdets, index) => <Canvas details={canvasdets} />)}
        <h1 className="text-8xl tracking-tighter">About the Project</h1>
<p className="text-2xl leading-[1.8] w-[80%] mt-10 font-light">
  The above project is a React-based web application utilizing GSAP (GreenSock Animation Platform) 
  for smooth animations and interactive effects. It features dynamic sections, a custom scrolling experience, 
  and an interactive portfolio grid, demonstrating expertise in frontend development and modern animation libraries.
</p>
<p className="text-2xl leading-[1.8] w-[80%] mt-6 font-light">
  The application employs a responsive design, ensuring seamless performance across devices of all sizes. 
  The integration of Locomotive Scroll enhances the user's experience with smooth and intuitive navigation. 
  Each section of the application is crafted with attention to detail, blending functionality with aesthetics.
</p>
<p className="text-2xl leading-[1.8] w-[80%] mt-6 font-light">
  Additional features include a custom-built carousel to showcase key highlights, 
  advanced CSS animations, and a modular component structure for scalability and ease of maintenance. 
  This project exemplifies modern web development practices, combining creativity and technical skills to deliver an engaging user experience.
</p>
      </div>
    </>
  );
}

export default App;