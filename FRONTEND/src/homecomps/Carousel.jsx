import React, { useEffect, useRef } from "react";
import './Carousel.css';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const HomeCarousel = () => {
  const carouselRef = useRef(null);
  const sliderRef = useRef(null);
  const prevBtnRef = useRef(null);
  const nextBtnRef = useRef(null);
  const itemsRef = useRef([]);

  const images = [
    "https://i.pinimg.com/736x/bf/7c/34/bf7c34488b5ea4bef4d725d706de0b92.jpg",
    "https://i.pinimg.com/736x/f3/21/07/f32107f833efeb1687557e8400d8419c.jpg",
    "https://i.pinimg.com/474x/77/c5/5e/77c55ea960afac64baa1a1ceaaefc569.jpg",
    "https://i.pinimg.com/474x/1e/fb/17/1efb17fbed67de14fc39e4c5ba8114de.jpg",
    "https://i.pinimg.com/474x/87/12/77/871277c93bed3015c3ce5b6ae4dbe3f0.jpg",
    "https://i.pinimg.com/474x/c3/89/72/c389727463b0bb82a68cf739a79494fc.jpg",
    "https://i.pinimg.com/474x/db/f5/45/dbf54574a0fb6e43de01ffe4c0606bea.jpg",
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
        {/* <div className="carousel__prev" ref={prevBtnRef}>
          <FaAngleLeft className="carousel-icon" />
        </div>
        <div className="carousel__next" ref={nextBtnRef}>
          <FaAngleRight className="carousel-icon" />
        </div> */}
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
