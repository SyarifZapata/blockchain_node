/**
 * Created by Arkad on 12/18/2018.
 */
const crypto = require('crypto');

class Block{
    constructor(index, timestamp, data, previousHash =''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash(){
        return crypto.createHash('sha256').update(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).digest('base64');
    }

    mineBlock(difficulty){
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('3')){
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log(this.nonce);
        console.log("Block mined: " + this.hash)
    }
}



class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.diffculty = 3;
    }

    createGenesisBlock(){
        return new Block(0, Date(), 'Genesis block', '0');
    }

    getLatestBlock(){
        return this.chain[this.chain.length -1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.diffculty);
        this.chain.push(newBlock);

    }

    isChainValid(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];

            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }

        return true;
    }
}

let zapataCoin = new Blockchain();

console.log('Mining block 1..');
zapataCoin.addBlock(new Block(1, Date(),{amount: 4}));
console.log('Mining block 2..');
zapataCoin.addBlock(new Block(2, Date(),{amount: 10} ));

// console.log(JSON.stringify(zapataCoin, null, 4));
// console.log('is blockchain valid? ' + zapataCoin.isChainValid());
//
// zapataCoin.chain[1].data = {amaount: 20};
// zapataCoin.chain[1].hash = zapataCoin.chain[1].calculateHash();
//
// console.log('is blockchain valid? ' + zapataCoin.isChainValid());




