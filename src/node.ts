import BlockChain from './blockchain'
import P2pServer from './p2p-server'

export default class Node {
  private blockChain: BlockChain
  private p2pServer: P2pServer
  readonly genesisHash = '0'.repeat(56)
  constructor() {
    this.blockChain = new BlockChain(this.genesisHash)
    this.p2pServer = new P2pServer(console.log)
  }
}
