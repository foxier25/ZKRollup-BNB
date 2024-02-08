const {ethers} = require("hardhat");
const namehash = require('eth-ens-namehash')
const {getDeployedAddresses, getBNB-ZKRollupProxy} = require("./utils");

async function main() {
    const addrs = getDeployedAddresses('info/addresses.json')
    const BNB-ZKRollup = await getBNB-ZKRollupProxy(addrs.BNB-ZKRollupProxy)

    console.log('FullExit...')
    // full exit
    let fullExitTx = await BNB-ZKRollup.requestFullExit('sher', addrs.LEGToken);
    await fullExitTx.wait();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((err) => {
        console.error('Error:', err.message || err);
        process.exit(1);
    });