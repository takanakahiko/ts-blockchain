import Block from './block'
import BlockChain from './blockchain'

const printBlock = (block: Block) =>
  console.log(block.hash.substr(0, 10), '<-', [
    block.previousHash.substr(0, 10),
    genesis.data,
  ])

//case1
const genesis = new Block('0'.repeat(56), 'this is genesis block.')
const second = new Block(genesis.hash, 'this is #2 block.')
const third = new Block(second.hash, 'this is #3 block.')
const blocks = [genesis, second, third]
blocks.forEach(printBlock)

/*
6c683b338f <- [ '0000000000', 'this is genesis block.' ]
a319ac90b9 <- [ '6c683b338f', 'this is genesis block.' ]
9241536c06 <- [ 'a319ac90b9', 'this is genesis block.' ]
*/

console.log('-'.repeat(50))

//case2
const blockchain = new BlockChain('0'.repeat(56))
blockchain.createBlock('this is genesis block.')
blockchain.createBlock('this is #2 block.')
blockchain.createBlock('this is #3 block.')
blockchain.blocks.forEach(printBlock)

/*
6c683b338f <- [ '0000000000', 'this is genesis block.' ]
a319ac90b9 <- [ '6c683b338f', 'this is genesis block.' ]
9241536c06 <- [ 'a319ac90b9', 'this is genesis block.' ]
*/
