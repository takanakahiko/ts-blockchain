import Block from './block'

export default class BlockChain {
  private _blocks: Block[] = []
  constructor(readonly genesisHash: string) {}
  createBlock(data: string) {
    const latestBlockHash =
      this._blocks.length > 0
        ? this._blocks[this._blocks.length - 1].hash
        : this.genesisHash
    const newBlock = new Block(latestBlockHash, data)
    this._blocks.push(newBlock)
  }
  get isValid(): boolean {
    let previousHash = this.genesisHash
    for (let block of this._blocks) {
      if (block.previousHash !== previousHash) return false
      previousHash = block.hash
    }
    return true
  }
  get blocks(): Block[] {
    return this._blocks
  }
}
