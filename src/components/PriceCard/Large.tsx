import { CardProps, darkColors } from 'bubbles-uikit';
import React from 'react';
import styled from 'styled-components';
import { PriceCardProps } from './Normal';

const StyledPriceCardLarge = styled.div<CardProps>`
  -webkit-box-flex: 1;
  flex: 1;
  min-width: 250px;
  /* margin-top: 24px;
  margin-right: 12px;
  margin-bottom: 0px;
  margin-left: 12px; */
  box-shadow: 0 10px 15px -3px ${darkColors.cardShadow}, 0 4px 6px -2px ${darkColors.cardShadow};
  background: ${darkColors.background};
  border: 1px solid ${darkColors.cardBorder};
  border-radius: 24px;
  padding: 24px;
`;

const PriceCardLargeTitle = styled.div<CardProps>`
  font-size: 18px;
  color: ${darkColors.text};
  display: block;
  align-items: center;
  justify-content: center;
  display: flex;
`;
const PriceCardLargeBody = styled.div<CardProps>`
  justify-content: center;
  font-size: 36px;
  font-weight: 700;
  color: ${darkColors.text};
  display: flex;
  align-items: center;
  margin-top: 10px;
  line-height: 1.1;
  margin-left: 4px;
`;
const PriceCardLargeValue = styled.div<CardProps>`
  font-size: 18px;
  margin-top: 6px;
  color: ${darkColors.text};
  align-items: center;
  justify-content: center;
  display: flex;
`;
const PriceCardLagreIcon = styled.div<CardProps>`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export type PriceCardLargeProps = PriceCardProps;

export const PriceCardLarge: React.FC<PriceCardProps> = ({ title, amount, coinUrl, usd, ...props }) => {
  return (
    <StyledPriceCardLarge {...props}>
      <PriceCardLargeTitle {...props}>{title}</PriceCardLargeTitle>
      <PriceCardLagreIcon {...props}>
        {coinUrl && <img style={{ height: '24px', width: '24px', marginTop: '10px' }} alt="nothing" src={coinUrl} />}
        <PriceCardLargeBody {...props}>{amount}</PriceCardLargeBody>
      </PriceCardLagreIcon>
      {usd && <PriceCardLargeValue {...props}>≈ ${usd}</PriceCardLargeValue>}
    </StyledPriceCardLarge>
  );
};

export default PriceCardLarge;
