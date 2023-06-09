import { serializeTokens } from './tokens';
import { SerializedFarmConfig } from './types';

const serializedTokens = serializeTokens();

const farms: SerializedFarmConfig[] = [
  /**
   * These 3 farms (PID 0, 251, 252) should always be at the top of the file.
   */
  {
    pid: 1,
    lpSymbol: 'BUBBLE-BNB LP',
    lpAddresses: {
      97: '0xC8f328Ca0bDC971F4cC1c86c850D07695c121c5B',
      56: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
    },
    token: serializedTokens.syrup,
    quoteToken: serializedTokens.wbnb,
  },
  {
    pid: 2,
    lpSymbol: 'MKT-BNB LP',
    lpAddresses: {
      97: '0xBe480dBc3736517e1017F81171Fb1F1b1918FB36',
      56: '0x0eD7e52944161450477ee417DE9Cd3a859b14fD0',
    },
    token: serializedTokens.cake,
    quoteToken: serializedTokens.wbnb,
  },
  // {
  //   pid: 2,
  //   lpSymbol: 'BUSD-BNB LP',
  //   lpAddresses: {
  //     97: '',
  //     56: '0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16',
  //   },
  //   token: serializedTokens.busd,
  //   quoteToken: serializedTokens.wbnb,
  // },
];

export default farms;
