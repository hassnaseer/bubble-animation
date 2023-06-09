import styled from 'styled-components';
import { darkColors } from 'bubbles-uikit';

export const Tabs = styled.div`
  width: 25%;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  border-top-left-radius: 32px;
  border-bottom-left-radius: 32px;
  height: 100%;
  background-color: ${darkColors.transparentColors.transBlue};
  /* background-color: rgba(0, 0, 0, 0); */
  @media screen and (max-width: 760px) {
    width: 20%;
  }
`;
