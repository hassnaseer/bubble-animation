import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useWeb3React } from '@web3-react/core';
import { Box, Flex } from 'bubbles-uikit';
import sum from 'lodash/sum';
import Page from 'components/Layout/Page';
import { getNftApi, getNftsMarketData } from 'state/nftMarket/helpers';
import { NftLocation, NftToken, UserNftInitializationState } from 'state/nftMarket/types';
import PageLoader from 'components/Loader/PageLoader';
import { useUserNfts } from 'state/nftMarket/hooks';
import MainNFTCard from './MainNFTCard';
// import ManageNFTsCard from './ManageNFTsCard';
import useFetchUserNfts from '../../../Profile/hooks/useFetchUserNfts';
import { TwoColumnsContainer } from '../shared/styles';
import PropertiesCard from '../shared/PropertiesCard';
import DetailsCard from '../shared/DetailsCard';
import useGetCollectionDistribution from '../../../hooks/useGetCollectionDistribution';
// import OwnerCard from './OwnerCard';
// import MoreFromThisCollection from '../shared/MoreFromThisCollection';
import AuctionBid from '../../../../auction/components/AuctionBidding';
// import ActivityCard from './ActivityCard';

interface IndividualNFTPageProps {
  collectionAddress: string;
  tokenId: string;
}

const OwnerActivityContainer = styled(Flex)`
  gap: 22px;
`;

const IndividualNFTPage: React.FC<IndividualNFTPageProps> = ({ collectionAddress, tokenId }) => {
  const [nft, setNft] = useState<NftToken>(null);
  const [isOwnNft, setIsOwnNft] = useState(false);

  const { data: distributionData, isFetching: isFetchingDistribution } =
    useGetCollectionDistribution(collectionAddress);

  const { account } = useWeb3React();
  const { userNftsInitializationState, nfts: userNfts } = useUserNfts();
  useFetchUserNfts();

  useEffect(() => {
    const fetchNftData = async () => {
      setIsOwnNft(false);
      const metadata = await getNftApi(collectionAddress, tokenId);
      const [marketData] = await getNftsMarketData({ collection: collectionAddress.toLowerCase(), tokenId }, 1);
      setNft({
        tokenId,
        collectionAddress,
        collectionName: metadata.collection.name,
        name: metadata.name,
        description: metadata.description,
        image: metadata.image,
        attributes: metadata.attributes,
        marketData,
      });
    };
    if (!account) {
      fetchNftData();
    } else if (userNftsInitializationState === UserNftInitializationState.INITIALIZED) {
      const nftOwnedByConnectedUser = userNfts.find(
        (userNft) =>
          userNft.collectionAddress.toLowerCase() === collectionAddress.toLowerCase() && userNft.tokenId === tokenId,
      );
      if (nftOwnedByConnectedUser) {
        // If user is the owner we already have all needed data available
        setNft(nftOwnedByConnectedUser);
        setIsOwnNft(true);
      } else {
        // Get metadata and market data separately if connected user is not the owner
        fetchNftData();
      }
    }
  }, [userNfts, collectionAddress, tokenId, userNftsInitializationState, account]);

  if (!nft) {
    // TODO redirect to nft market page if collection or bunny id does not exist (came here from some bad url)
    // That would require tracking loading states and stuff...

    // For now this if is used to show loading spinner while we're getting the data
    return <PageLoader />;
  }

  const properties = nft.attributes;

  const userProfilePicture = userNfts.find((userNft) => userNft.location === NftLocation.PROFILE);
  const nftIsProfilePic = userProfilePicture
    ? nft.tokenId === userProfilePicture.tokenId && nft.collectionAddress === userProfilePicture.collectionAddress
    : false;

  const getAttributesRarity = () => {
    if (distributionData && !isFetchingDistribution) {
      return Object.keys(distributionData).reduce((rarityMap, traitType) => {
        const total = sum(Object.values(distributionData[traitType]));
        const nftAttributeValue = nft.attributes.find((attribute) => attribute.traitType === traitType)?.value;
        const count = distributionData[traitType][nftAttributeValue];
        const rarity = (count / total) * 100;
        return {
          ...rarityMap,
          [traitType]: rarity,
        };
      }, {});
    }
    return {};
  };
  const AuctionBidData = {
    biddingRows: [
      {
        accAddress: '0x67B14E1b6A249Ae5251004906eA7Eda0112e1AdE',
        hash: '0x68fd84c0131f72f12a9a26f422cbe1c34ad862a52013a33a813be5fe610b8223',
        auctionPrice: '1,000',
        auctionTime: 'Jan 5, 2022, 15:52',
        profits: 69.6,
        status: 2,
      },
      {
        accAddress: '0x67B14E1b6A249Ae5251004906eA7Eda0112e1AdE',
        hash: '0x68fd84c0131f72f12a9a26f422cbe1c34ad862a52013a33a813be5fe610b8223',
        auctionPrice: '1,000',
        auctionTime: 'Jan 5, 2022, 15:52',
        profits: 69.6,
        status: 2,
      },
      {
        accAddress: '0x67B14E1b6A249Ae5251004906eA7Eda0112e1AdE',
        hash: '0x68fd84c0131f72f12a9a26f422cbe1c34ad862a52013a33a813be5fe610b8223',
        auctionPrice: '1,000',
        auctionTime: 'Jan 5, 2022, 15:52',
        profits: 69.6,
        status: 2,
      },
      {
        accAddress: '0x67B14E1b6A249Ae5251004906eA7Eda0112e1AdE',
        hash: '0x68fd84c0131f72f12a9a26f422cbe1c34ad862a52013a33a813be5fe610b8223',
        auctionPrice: '1,000',
        auctionTime: 'Jan 5, 2022, 15:52',
        profits: 69.6,
        status: 2,
      },
    ],
  };

  return (
    <Page>
      <MainNFTCard nft={nft} isOwnNft={isOwnNft} nftIsProfilePic={nftIsProfilePic} />
      <Flex justifyContent="space-between" flexDirection={['column', 'column', 'column', 'row']}>
        <Box marginLeft="10px" marginRight="10px" marginBottom="10px" marginTop="10px">
          <PropertiesCard properties={properties} rarity={getAttributesRarity()} />
        </Box>
        {/* <ManageNFTsCard
            nft={nft}
            isOwnNft={isOwnNft}
            isLoading={userNftsInitializationState !== UserNftInitializationState.INITIALIZED}
            
          /> */}
        {/* <OwnerCard nft={nft} isOwnNft={isOwnNft} nftIsProfilePic={nftIsProfilePic} /> */}
        <Box
          style={{ minWidth: '350px', maxWidth: '550px' }}
          marginLeft="10px"
          marginRight="10px"
          marginBottom="10px"
          marginTop="10px"
        >
          <DetailsCard
            contractAddress={collectionAddress}
            ipfsJson={nft?.marketData?.metadataUrl}
            nft={nft}
            isOwnNft={isOwnNft}
            nftIsProfilePic={nftIsProfilePic}
          />
        </Box>
      </Flex>

      <TwoColumnsContainer flexDirection={['column', 'column', 'row']}>
        {/* <Flex flexDirection="column" width="100%">
        </Flex> */}
        <OwnerActivityContainer flexDirection="column" width="100%">
          {/* <ActivityCard nft={nft} /> */}
          <div style={{ width: '100%' }}>
            <AuctionBid {...AuctionBidData} />{' '}
          </div>
        </OwnerActivityContainer>
      </TwoColumnsContainer>
    </Page>
  );
};

export default IndividualNFTPage;
