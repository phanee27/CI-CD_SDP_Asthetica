import React, { useEffect, useRef } from "react";
import '../styles/Carousel.css';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const HomeCarousel = () => {
  const carouselRef = useRef(null);
  const sliderRef = useRef(null);
  const prevBtnRef = useRef(null);
  const nextBtnRef = useRef(null);
  const itemsRef = useRef([]);

  const images = [
    "https://i.etsystatic.com/20476529/r/il/2c438e/3089182770/il_fullxfull.3089182770_lbxv.jpg",
    "https://i.etsystatic.com/14292233/r/il/4fc1c1/4672184527/il_1080xN.4672184527_gutp.jpg",
    "https://i.pinimg.com/originals/4e/4d/94/4e4d94c563396ff925c3be53f7067c17.jpg",
    "https://i.etsystatic.com/10944019/r/il/769dca/884655377/il_1588xN.884655377_hm1q.jpg",
    "https://th.bing.com/th/id/OIP.bWGNgWscZO0iYg4TfYeCZwHaKS?rs=1&pid=ImgDetMain",
    "https://th.bing.com/th/id/OIP.r90XDS8qz2kPXriZPHEAqwHaKX?rs=1&pid=ImgDetMain",
    "https://images.saatchiart.com/saatchi/901670/art/5738435/4808237-HSC00923-7.jpg",
  ];

  let width, height, totalWidth, margin = 20;
  let currIndex = 0;
  let intervalTime = 4000;
  let interval;

  const init = () => {
    resize();
    move(Math.floor(images.length / 2));
    bindEvents();
    timer();
  };

  const resize = () => {
    width = Math.max(window.innerWidth * 0.25, 275);
    height = window.innerHeight * 0.5;
    totalWidth = width * images.length;

    if (sliderRef.current) {
      sliderRef.current.style.width = `${totalWidth}px`;
    }
    itemsRef.current.forEach((item) => {
      if (item) {
        item.style.width = `${width - margin * 2}px`;
        item.style.height = `${height}px`;
      }
    });
  };

  const move = (index) => {
    if (index < 1) index = images.length;
    if (index > images.length) index = 1;
    currIndex = index;

    itemsRef.current.forEach((item, i) => {
      if (item) {
        const box = item.getElementsByClassName("item__3d-frame")[0];
        if (i === index - 1) {
          item.classList.add("carousel__slider__item--active");
          box.style.transform = "perspective(1200px)";
        } else {
          item.classList.remove("carousel__slider__item--active");
          box.style.transform = `perspective(1200px) rotateY(${
            i < index - 1 ? 40 : -40
          }deg)`;
        }
      }
    });

    if (sliderRef.current) {
      sliderRef.current.style.transform = `translate3d(${
        index * -width + width / 2 + window.innerWidth / 2
      }px, 0, 0)`;
    }
  };

  const timer = () => {
    clearInterval(interval);
    interval = setInterval(() => {
      move(++currIndex);
    }, intervalTime);
  };

  const prev = () => {
    move(--currIndex);
    timer();
  };

  const next = () => {
    move(++currIndex);
    timer();
  };

  const bindEvents = () => {
    window.addEventListener("resize", resize);
    if (prevBtnRef.current) {
      prevBtnRef.current.addEventListener("click", prev);
    }
    if (nextBtnRef.current) {
      nextBtnRef.current.addEventListener("click", next);
    }
  };

  useEffect(() => {
    // Collect all carousel items after render
    itemsRef.current = Array.from(
      carouselRef.current.getElementsByClassName("carousel__slider__item")
    );
    init();

    // Cleanup on unmount
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resize);
      if (prevBtnRef.current) {
        prevBtnRef.current.removeEventListener("click", prev);
      }
      if (nextBtnRef.current) {
        nextBtnRef.current.removeEventListener("click", next);
      }
    };
  }, []);
  return (
    <div className="carousel" ref={carouselRef}>
      <div className="carousel__body">
        <div className="carousel__prev" ref={prevBtnRef}>
          <FaAngleLeft className="carousel-icon" />
        </div>
        <div className="carousel__next" ref={nextBtnRef}>
          <FaAngleRight className="carousel-icon" />
        </div>
        <div className="carousel__slider" ref={sliderRef}>
          {images.map((src, index) => (
            <div
              className="carousel__slider__item"
              key={index}
              ref={(el) => (itemsRef.current[index] = el)}
            >
              <div className="item__3d-frame">
                <div className="item__3d-frame__box item__3d-frame__box--front">
                  <img src={src} alt="" height="100%" width="100%" />
                </div>
                <div className="item__3d-frame__box item__3d-frame__box--left"></div>
                <div className="item__3d-frame__box item__3d-frame__box--right"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeCarousel;
