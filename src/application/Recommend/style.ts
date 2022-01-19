import styled from 'styled-components';

interface CustomStyleProps {
  play?: any;
}

export const Content = styled.div<CustomStyleProps>`
  position: fixed;
  top: 90px;
  bottom: ${props => props.play > 0 ? '60px' : 0};
  width: 100%;
`;
