const { getUniTVL } = require('../helper/unknownTokens');
const { sumTokensExport } = require('../helper/unwrapLPs');
const { uniV3Export } = require("../helper/uniswapV3");

module.exports = {
  misrepresentedTokens: true,
  klaytn: {
    tvl: getUniTVL({ factory: '0x347E5ce6764DF9DF85487BEA523D3e242762aE88', useDefaultCoreAssets: true }),
    staking: sumTokensExport({ tokensAndOwners: [
      ['0x4836cc1f355bb2a61c210eaa0cd3f729160cd95e', '0x4d55B04AC52b2CA41ad04337FF13CbAefbdC8954'],
    ]})
  },
  avax: {
    tvl: uniV3Export({
      avax: {
        factory: "0xF72f4652785a5186EDF7b93a9cfd246FeFc0ef5c",
        fromBlock: 52760680,
        isAlgebra: false,
      },
    }),
  },
}

