import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

const suppliedPublicKey = process.argv[2];
if (!suppliedPublicKey) {
  throw new Error("Provide a public key to check the balance of!");
}

function isBase58(str: string): boolean {
    const alphabet = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
  
    // Check if string is empty or contains invalid characters
    if (!str || str.split("").some((char) => !alphabet.includes(char))) {
      return false;
    }

    return true
}


function isSolDomain(str: string): boolean {
    return str.toLowerCase().endsWith(".sol");
}

function validateSolAddress(address:string){
    try {
        let pubkey = new PublicKey(address)
        let  isSolana =  PublicKey.isOnCurve(pubkey.toBuffer())
        return isSolana
    } catch (error) {
        return false
    }
} 


const connection = new Connection("https://api.devnet.solana.com", "confirmed");

let message = "";

if (validateSolAddress(suppliedPublicKey) || isSolDomain(suppliedPublicKey)) {
    const publicKey = new PublicKey(suppliedPublicKey);

    const balanceInLamports = await connection.getBalance(publicKey);

    const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;
    message = `✅ Finished! The balance for the wallet at address ${publicKey} is ${balanceInSOL}!`
} else {
    message = `${suppliedPublicKey} is not a valid address`
}

console.log(message);