import React from "react";
import styled from "styled-components";
import { theme } from "../styles";
import ReactSlider from "react-slider";
const { colors, fontSizes } = theme;

const StyledSlider = styled(ReactSlider)`
  width: 100%;
  height: ${fontSizes.sm};
`;

const StyledThumb = styled.div`
  height: 30px;
  width: 30px;
  text-align: center;
  background-color: ${colors.white};
  color: #fff;
  border-radius: 50%;
  cursor: grab;
  transform: translateY(-8px);
`;

const Thumb = (props, state) => (
  <StyledThumb {...props}>{state.valueNow}</StyledThumb>
);

const StyledTrack = styled.div`
  top: 0;
  bottom: 0;
  background: ${(props) =>
    props.index === 2
      ? `${colors.lightGrey}`
      : props.index === 1
      ? `${colors.green}`
      : `${colors.lightGrey}`};
  border-radius: 999px;
`;

const Track = (props, state) => <StyledTrack {...props} index={state.index} />;

const Slider = ({ min, max, ...delegated }) => {
  return (
    <StyledSlider
      min={0}
      max={100}
      defaultValue={[min, max]}
      renderTrack={Track}
      renderThumb={Thumb}
      {...delegated}
    />
  );
};

export default Slider;
