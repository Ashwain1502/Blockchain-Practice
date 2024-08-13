const SHA256 = require('crypto-js/sha256');

class Block{
    constructor(index, timestamp, data, previousHash=''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock(){
        return new Block(0, '01/01/2001', 'First', '0');
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isChainValid(){
        for(let i=1; this.chain.length; i++){
            const currBlock = this.chain[i];
            const prevBlock = this.chain[i-1];

            if(currBlock.hash !== currBlock.calculateHash()){
                return false;
            }

            if(prevBlock.hash !== currBlock.previousHash){
                return false;
            }
        }
        return true;
    }
}

let ashwinCoin = new Blockchain();
ashwinCoin.addBlock(new Block(1,'10/02/2002',{amount:4}));
ashwinCoin.addBlock(new Block(2,'10/18/2002',{amount:6}));

console.log(JSON.stringify(ashwinCoin, null, 4));
