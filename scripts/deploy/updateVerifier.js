const {ethers} = require("hardhat");
const namehash = require('eth-ens-namehash')
const {getDeployedAddresses, getBNB-ZKRollupProxy} = require("./utils");

async function main() {
    const addrs = getDeployedAddresses('info/addresses.json')
    const BNB-ZKRollup = await getBNB-ZKRollupProxy(addrs.BNB-ZKRollupProxy)

    console.log('Prepare new BNB-ZKRollupVerifier')
    // new verifier
    const NewVerifier = await ethers.getContractFactory('BNB-ZKRollupVerifier')
    console.log('Deploy New Verifier...')
    const newVerifier = await NewVerifier.deploy()
    await newVerifier.deployed()
    console.log('Deploy Proxy for NewVerifier...')
    const Proxy = await ethers.getContractFactory('Proxy')
    const newVerifierProxy = await Proxy.deploy(newVerifier.address, [])
    await newVerifierProxy.deployed()

    // update verifier
    console.log('Update Verifier...')
    let updateVerifierTx = await BNB-ZKRollup.updateBNB-ZKRollupVerifier(newVerifierProxy.address)
    await updateVerifierTx.wait()
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((err) => {
        console.error('Error:', err.message || err);
        process.exit(1);
    });