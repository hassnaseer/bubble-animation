import React from 'react';
import BlindBoxItem, { BlindBoxItemProps } from '../BlindBoxItem';
import BlindBoxInfo from '../BlindBoxInfo';

const BlindboxItemData: BlindBoxItemProps = {
  title: 'Ranger Girl',
  iconUrl: '	https://dl0d5jadwbp9c.cloudfront.net/cdn/img/35737edafdd527f024bdd1aaf7fe2058.png',
  imgUrl: 'https://dl0d5jadwbp9c.cloudfront.net/cdn/img/12e630fda585d8f2758ae780baab5b78.png',
  hoverImgUrl: 'https://dl0d5jadwbp9c.cloudfront.net/cdn/img/67c670aff8692b481b1f133e62392656.gif',
  stats: [
    {
      title: 'Probablity',
      value: '12.69%',
    },
    {
      title: 'Supply',
      value: '1800',
    },
    {
      title: 'HashRate',
      value: 'x150',
      color: '#f15f61',
    },
  ],
};

const BlindBoxBuy = ({ id }: { id: number }) => {
  return (
    <>
      <BlindBoxItem {...BlindboxItemData} />
      <BlindBoxInfo title="info box" stock={4} creationTime={undefined} />
    </>
  );
};

export default BlindBoxBuy;
