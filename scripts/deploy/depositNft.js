const {ethers} = require("hardhat");
const namehash = require('eth-ens-namehash')
const {getDeployedAddresses, getBNB-ZKRollupProxy} = require("./utils");

async function main() {
    const addrs = getDeployedAddresses('info/addresses.json')
    const BNB-ZKRollup = await getBNB-ZKRollupProxy(addrs.BNB-ZKRollupProxy)

    // tokens
    const ERC721Factory = await ethers.getContractFactory('BNB-ZKRollupRelatedERC721')
    const ERC721 = await ERC721Factory.attach(addrs.ERC721)

    // deposit bnb
    console.log('Approve Nft...')
    // set allowance
    let approveTx = await ERC721.approve(BNB-ZKRollup.address, '0');
    await approveTx.wait();
    // deposit nft
    console.log('Deposit Nft...');
    let depositERC721Tx = await BNB-ZKRollup.depositNft('sher', addrs.ERC721, '0');
    await depositERC721Tx.wait();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((err) => {
        console.error('Error:', err.message || err);
        process.exit(1);
    });