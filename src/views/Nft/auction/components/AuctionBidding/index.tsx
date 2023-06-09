import React from 'react';
import styled from 'styled-components';
import { darkColors } from 'bubbles-uikit';
import BiddingRow from './components/BiddingRow';
import HeaderRow from './components/HeaderRow';

export interface Bids {
  accAddress: string;
  hash: string;
  auctionPrice: string;
  auctionTime: string;
  profits: number;
  status: number;
}

export interface AuctionBidProps {
  biddingRows: Bids[];
}
const Table = styled.table`
  background: ${darkColors.background};
  border-radius: 32px;
  border-collapse: collapse;
  border-spacing: 0;
  color:${darkColors.text}
  table-layout: fixed;
  width: 100%;
`;

function AuctionBid({ biddingRows }: AuctionBidProps) {
  const titles = ['Address', 'Hash', 'Auction Price (Bubble)', 'Auction Time', 'Profits', 'Status'];
  return (
    <Table>
      <thead>
        <HeaderRow headerTitles={titles} />
      </thead>
      <tbody>
        {biddingRows.map((item) => {
          return <BiddingRow {...item} key={item.hash} />;
        })}
      </tbody>
    </Table>
  );
}

export default AuctionBid;
