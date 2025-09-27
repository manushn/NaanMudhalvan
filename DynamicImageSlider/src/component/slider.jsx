
import { useEffect, useRef } from "react";
import "../css/slider.css";

const birdImages = [
  { src: "image/eagel1.jpg", title: "SLIDER", name: "EAGLE" },
  { src: "image/owl1.jpg", title: "SLIDER", name: "OWL" },
  { src: "image/crow.jpg", title: "SLIDER", name: "CROW" },
  { src: "image/butterfly1.jpeg", title: "SLIDER", name: "BUTTERFLY" },
  { src: "image/owl2.jpg", title: "SLIDER", name: "OWL" },
  { src: "image/eagel3.jpg", title: "SLIDER", name: "EAGLE" },
  { src: "image/kingfirser2.jpeg", title: "SLIDER", name: "KINGFISHER" },
  { src: "image/parrot2.jpg", title: "SLIDER", name: "PARROT" },
  { src: "image/heron.jpeg", title: "SLIDER", name: "HERON" },
  { src: "image/butterfly2.jpg", title: "SLIDER", name: "BUTTERFLY" },
  { src: "image/parrot2.jpg", title: "SLIDER", name: "PARROT" },
];

export default function Slider() {
  const listRef = useRef(null);
  const wrapperRef = useRef(null);
  const barRef = useRef(null);

  
  const transitionDelay = 3000;
  const autoPlayDelay = 7000;

  let timeoutHandler = useRef(null);
  let autoNextHandler = useRef(null);

 
  const restartTimerBar = () => {
    if (!barRef.current) return;

    
    barRef.current.style.animation = "none";
    barRef.current.offsetHeight; 
    barRef.current.style.animation = null;
    barRef.current.style.animation = "runningTime 7s linear 1 forwards";
  };

  
  const moveSlide = (direction) => {
    const list = listRef.current;
    if (!list) return;

    const slides = list.querySelectorAll(".item");

    if (direction === "next") {
      list.appendChild(slides[0]); 
    } else {
      list.prepend(slides[slides.length - 1]); 
    }

    if (wrapperRef.current) {
      wrapperRef.current.classList.add(direction);
    }

    
    clearTimeout(timeoutHandler.current);
    timeoutHandler.current = setTimeout(() => {
      if (wrapperRef.current) {
        wrapperRef.current.classList.remove("next");
        wrapperRef.current.classList.remove("prev");
      }
    }, transitionDelay);

    
    clearTimeout(autoNextHandler.current);
    autoNextHandler.current = setTimeout(() => {
      moveSlide("next");
    }, autoPlayDelay);

    restartTimerBar();
  };

  useEffect(() => {
    restartTimerBar();

   
    autoNextHandler.current = setTimeout(() => {
      moveSlide("next");
    }, autoPlayDelay);

    
    return () => {
      clearTimeout(timeoutHandler.current);
      clearTimeout(autoNextHandler.current);
    };
  }, []);

  return (
    <div className="carousel" ref={wrapperRef}>
      <div className="list" ref={listRef}>
        {birdImages.map((img, idx) => (
          <div
            className="item"
            key={idx} 
            style={{ backgroundImage: `url(${img.src})` }}
          >
            <div className="content">
              <div className="title">{img.title}</div>
              <div className="name">{img.name}</div>
              <div className="des">
                
                This is some dummy description text for the Naan Mudhalvan project by Manush N.
              </div>
              <div className="btn">
                <button>See More</button>
                <button>Subscribe</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      
      <div className="arrows">
        <button onClick={() => moveSlide("prev")}>&lt;</button>
        <button onClick={() => moveSlide("next")}>&gt;</button>
      </div>

      
      <div className="timeRunning" ref={barRef}></div>
    </div>
  );
}
