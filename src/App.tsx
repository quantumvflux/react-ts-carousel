import { useState } from "react";
import styled from "styled-components";

import "./App.css";

const CarouselImg = styled.img`
  max-width: 500px;
  width: 100%;
  height: auto;
  opacity: 0;
  transition: 0.6s;
  &.loaded {
    opacity: 1;
  }
`;

export const App = () => {
  const images = ["img-1.jpg", "img-2.jpg", "img-3.jpg"];

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [loaded, setLoaded] = useState(false);

  const selectNewImage = (
    index: number,
    images: string[],
    next: boolean = true
  ) => {
    setLoaded(false);

    setTimeout(() => {
      const condition = next
        ? selectedIndex < images.length - 1
        : selectedIndex > 0;
      const nextIndex = next
        ? condition
          ? selectedIndex + 1
          : 0
        : condition
        ? selectedIndex - 1
        : images.length - 1;
      setSelectedImage(images[nextIndex]);
      setSelectedIndex(nextIndex);
    }, 600);
  };
  const prev = () => selectNewImage(selectedIndex, images, false);
  const next = () => selectNewImage(selectedIndex, images);
  return (
    <div className="carousel-container">
      <CarouselImg
        src={`./src/img/${selectedImage}`}
        alt=""
        loading="lazy"
        className={loaded ? "loaded" : ""}
        onLoad={() => setLoaded(true)}
      />
      <button onClick={prev}>{"<"}</button>
      <button onClick={next}>{">"}</button>
    </div>
  );
};
