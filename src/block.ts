import { createHash } from 'crypto'

export default class Block {
  constructor(readonly previousHash: string, readonly data: string) {}
  get hash(): string {
    const serialized = JSON.stringify([this.previousHash, this.data])
    return createHash('sha224')
      .update(serialized)
      .digest()
      .toString('hex')
  }
}
