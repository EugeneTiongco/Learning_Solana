import * as web3 from "@solana/web3.js";
import dotenv from "dotenv";
import { getKeypairFromEnvironment, requestAndConfirmAirdropIfRequired } from "@solana-developers/helpers";
dotenv.config();


const payer = getKeypairFromEnvironment('SECRET_KEY')
const toPubkey = new web3.PublicKey('DVVM6VuurrLLfzJBgYZSRbGV1LZiCqMq3fg1jiA8oqbN')
const connection = new web3.Connection(web3.clusterApiUrl('devnet'))

const transaction = new web3.Transaction();

const LAMPORTS_TO_SEND = 5000;

const sendSolInstruction = web3.SystemProgram.transfer({
    fromPubkey: payer.publicKey,
    toPubkey,
    lamports: LAMPORTS_TO_SEND
});

transaction.add(sendSolInstruction);

const signature = await web3.sendAndConfirmTransaction(connection, transaction, [
  payer,
]);

console.log(
  `💸 Finished! Sent ${LAMPORTS_TO_SEND} to the address ${toPubkey}. `
);
console.log(`Transaction signature is ${signature}!`);