import styled from 'styled-components';
import style from '../../assets/global-style';

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  background: ${style['background-color']};
  transform-origin: right bottom;

  &.fly-appear {
    transform: rotateZ(30deg) translate3d(100%, 0, 0);
  }

  &.fly-appear.fly-appear-active, &.fly-appear-done.fly-enter-done {
    transition: transform 0.3s;
    transform: rotateZ(0deg) translate3d(0, 0, 0);
  }

  &.fly-exit.fly-exit-active {
    transition: transform 0.3s;
    transform: rotateZ(30deg) translate3d(100%, 0, 0);
  }
`;