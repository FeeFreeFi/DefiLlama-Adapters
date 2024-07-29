const { getLogs2 } = require('../helper/cache/getLogs')
const { sumTokens2 } = require('../helper/unwrapLPs')

const LEGACY_EVENT_ABI = 'event Initialize(bytes32 id, address indexed currency0, address indexed currency1, uint24 fee, int24 tickSpacing, address hooks)'
const EVENT_ABI = 'event Initialize(bytes32 id, address indexed currency0, address indexed currency1, uint24 fee, int24 tickSpacing, address hooks, uint160 sqrtPriceX96, int24 tick)'

const config = {
  zora: {
    pool: "0xB43287b2106BC044F07aE674794f5492E851d3dC",
    router: "0x0Fee97363deEFBE4De038D437D805A98dbEbA400",
    fromBlock: 13704184,
    eventAbi: LEGACY_EVENT_ABI,
  },
  base: {
    pool: "0xcdE68374C7AB5cf1DB8673D3Fc80937CC499E3a0",
    router: "0x0Fee2fd9EBFD6B0f803FcDeF0230d53dEF910900",
    fromBlock: 17713836,
    eventAbi: EVENT_ABI,
  }
}

module.exports = {
  start: 1714060800, // Apr 26 2024
}

Object.keys(config).forEach(chain => {
  const { pool, fromBlock, eventAbi } = config[chain]
  module.exports[chain] = {
    tvl: async (api) => {
      const logs = await getLogs2({ api, factory: pool, eventAbi, fromBlock, })
      const tokens = logs.map(i => [i.currency0, i.currency1]).flat()
      return sumTokens2({ api, owner: pool, tokens, })
    }
  }
})