import Block from './block'

const genesis = new Block('0'.repeat(56), 'this is genesis block.')
console.log(genesis.hash, '<-', [genesis.previousHash, genesis.data])

const second = new Block(genesis.hash, 'this is #2 block.')
console.log(second.hash, '<-', [second.previousHash, second.data])

const third = new Block(second.hash, 'this is #3 block.')
console.log(third.hash, '<-', [third.previousHash, third.data])
