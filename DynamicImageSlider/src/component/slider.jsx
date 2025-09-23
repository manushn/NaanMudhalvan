import { useEffect, useRef } from "react";
import "../css/slider.css";

const images = [
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
  const carouselRef = useRef(null);
  const runningTimeRef = useRef(null);

  const timeRunning = 3000;
  const timeAutoNext = 7000;
  let runTimeOut = useRef(null);
  let runNextAuto = useRef(null);

  const resetTimeAnimation = () => {
    if (runningTimeRef.current) {
      runningTimeRef.current.style.animation = "none";
      runningTimeRef.current.offsetHeight; // trigger reflow
      runningTimeRef.current.style.animation = null;
      runningTimeRef.current.style.animation =
        "runningTime 7s linear 1 forwards";
    }
  };

  const showSlider = (type) => {
    const list = listRef.current;
    if (!list) return;
    const items = list.querySelectorAll(".item");

    if (type === "next") {
      list.appendChild(items[0]);
    } else {
      list.prepend(items[items.length - 1]);
    }

    if (carouselRef.current) {
      carouselRef.current.classList.add(type);
    }

    clearTimeout(runTimeOut.current);
    runTimeOut.current = setTimeout(() => {
      if (carouselRef.current) {
        carouselRef.current.classList.remove("next");
        carouselRef.current.classList.remove("prev");
      }
    }, timeRunning);

    clearTimeout(runNextAuto.current);
    runNextAuto.current = setTimeout(() => {
      showSlider("next");
    }, timeAutoNext);

    resetTimeAnimation();
  };

  useEffect(() => {
    resetTimeAnimation();
    runNextAuto.current = setTimeout(() => {
      showSlider("next");
    }, timeAutoNext);

    return () => {
      clearTimeout(runTimeOut.current);
      clearTimeout(runNextAuto.current);
    };
  }, []);

  return (
    <div className="carousel" ref={carouselRef}>
      <div className="list" ref={listRef}>
        {images.map((img, i) => (
          <div
            className="item"
            key={i}
            style={{ backgroundImage: `url(${img.src})` }}
          >
            <div className="content">
              <div className="title">{img.title}</div>
              <div className="name">{img.name}</div>
              <div className="des">
                This is a test text for dynamic image slider project on Naan mudhalvan course.
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
        <button onClick={() => showSlider("prev")}>&lt;</button>
        <button onClick={() => showSlider("next")}>&gt;</button>
      </div>

      
      <div className="timeRunning" ref={runningTimeRef}></div>
    </div>
  );
}
