import React from "react";
import styled, { keyframes, css } from "styled-components";

const Marquee = (props) => {
  const {
    images,
    duration = 50,
    gap = "2rem",
    variant = "horizontal",
    reverse = false,
    pauseOnHover = true,
    width,
    height,
    containerStyle,
    itemStyle,
  } = props.config;

  const trackHorizontal = keyframes`
    from {
      transform: translate3d(0, 0, 0);
    }
    to {
      transform: translate3d(-50%, 0, 0);
    }
  `;

  const trackVertical = keyframes`
    from {
      transform: translate3d(0, 0, 0);
    }
    to {
      transform: translate3d(0, -50%, 0);
    }
  `;

  const Container = styled.div`
    width: ${width || "100vw"};
    flex: ${width ? "none" : "1 1 45%"};
    height: ${height || "12vh"};
    overflow: hidden;
    position: relative;
    ${variant === "vertical" &&
    `
      transform:
        rotateX(20deg)
        rotateZ(-20deg)
        skewX(20deg);
    `}
    ${(props) => props.containerStyle && css(props.containerStyle)}
  `;

  const UL = styled.ul`
    display: flex;
    width: fit-content;
    padding: 0;
    margin: 0;
    list-style-type: none;
    height: 100%;
    align-items: center;

    animation-name: ${variant === "vertical" ? trackVertical : trackHorizontal};
    animation-duration: var(--duration, ${duration}s);
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    animation-direction: ${reverse ? "reverse" : "normal"};

    ${variant === "vertical" &&
    `
      flex-direction: column;
      width: 100%;
      height: fit-content;
    `}

    ${pauseOnHover &&
    css`
      &:hover {
        animation-play-state: paused;
      }
    `}
  `;

  const LI = styled.li`
    height: 80%;
    aspect-ratio: 4 / 3;
    display: grid;
    place-items: center;
    margin: 0 var(--gap, ${gap});

    ${variant === "vertical" &&
    `
      margin: var(--gap, ${gap}) 0;
      width: 100%;
      height: auto;
    `}

    img,
    svg {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }
    ${itemStyle && css(itemStyle)}
  `;

  return (
    <Container
      containerStyle={containerStyle}
      style={{
        "--duration": `${duration}s`,
        "--gap": gap,
      }}
    >
      <UL>
        {images.map((image, i) => (
          <LI key={`a-${i}`}>{image}</LI>
        ))}
        {images.map((image, i) => (
          <LI key={`b-${i}`}>{image}</LI>
        ))}
      </UL>
    </Container>
  );
};

export default Marquee;
