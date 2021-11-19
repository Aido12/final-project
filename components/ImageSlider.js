import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import { useState } from 'react';
import { SliderData } from './SliderData';

const slider = css`
  .slider {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .image {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 45vw;
    border-radius: 25px;
  }

  .right-arrow {
    position: absolute;
    top: 60%;
    right: 20%;
    font-size: 3rem;
    color: #000;
    z-index: 10;
    cursor: pointer;
    user-select: none;
    opacity: 50%;
  }

  .left-arrow {
    position: absolute;
    top: 60%;
    left: 20%;
    font-size: 3rem;
    color: #000;
    z-index: 10;
    cursor: pointer;
    user-select: none;
    opacity: 50%;
  }

  .slide {
    opacity: 0;
    transition-duration: 1s ease;
  }

  .slide.active {
    opacity: 1;
    transition-duration: 1s;
  }
`;
const ImageSlider = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  return (
    <section css={slider} className="slider">
      <LeftCircleOutlined className="left-arrow" onClick={prevSlide} />
      <RightCircleOutlined className="right-arrow" onClick={nextSlide} />
      {SliderData.map((slide, index) => {
        return (
          <div
            className={index === current ? 'slide active' : 'slide'}
            key={index}
          >
            {index === current && (
              <img src={slide.image} alt="pub" className="image" />
            )}
          </div>
        );
      })}
    </section>
  );
};

export default ImageSlider;
