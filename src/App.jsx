import { useState } from "react";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import About from "./sections/About";
import Contact from "./sections/Contact";
// import Experience from "./sections/Experience";
import Footer from "./sections/Footer";
import Home from "./sections/Home";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
// import Testimonials from "./sections/Testimonials";
import IntroAnimation from "./components/IntroAnimation";
import MusicPlayer from "./components/MusicPlayer";

export default function App(){
  const [introDone, setIntroDone] = useState(false);

  return(
    <div className="relative gradient text-white">
      <CustomCursor/>
      <Navbar/>
      <MusicPlayer />

      {/* Intro always on top until it finishes */}
      {!introDone && <IntroAnimation onFinish={() => setIntroDone(true)} />}

      {/* Homepage always present (masked reveal) */}
      <Home introDone={introDone} />

      <About/>
      <Skills/>
      <Projects/>
      {/* <Experience/> */}
      {/* <Testimonials/> */}
      <Contact/>
      <Footer/>
      
    </div>
  )
}