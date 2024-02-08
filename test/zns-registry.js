const {expect} = require("chai");
const {ethers} = require("hardhat");
const namehash = require('eth-ens-namehash')

describe("BNB-ZKRollup Registry Contract", function () {

    let BNB-ZKRollup, BNB-ZKRollup;
    let ZNS, zns;
    let Utils, utils;
    let owner, addr1, addr2, addrs;

    // `beforeEach` will run before each test, re-deploying the contract every
    // time. It receives a callback, which can be async.
    beforeEach(async function () {
        [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

        // deploy BNB-ZKRollup
        ZNS = await ethers.getContractFactory("ZNSRegistry");
        zns = await ZNS.deploy()
        await zns.deployed()

        // deploy utils
        Utils = await ethers.getContractFactory("Utils")
        utils = await Utils.deploy()
        await utils.deployed()

        BNB-ZKRollup = await ethers.getContractFactory('BNB-ZKRollup', {
            libraries: {
                Utils: utils.address
            }
        })
        BNB-ZKRollup = await BNB-ZKRollup.deploy();
        await BNB-ZKRollup.deployed();
    });

    // describe('ZNS Registry', function () {
    //     it("register", async function () {
    //         // register root node
    //         const rootL2Acoount = ethers.utils.formatBytes32String('legend');
    //         const rootNode = namehash.hash('');
    //         expect(await zns.owner(rootNode)).to.equal(await owner.getAddress());
    //
    //         const baseNameHash = getKeccak256('legend');
    //         const baseNode = namehash.hash('legend');
    //         // The owner of ZNS should be registrar
    //         const setRootTx = await zns.setSubnodeOwner(rootNode, baseNameHash, BNB-ZKRollup.address, rootL2Acoount);
    //         await setRootTx.wait();
    //         expect(await zns.owner(baseNode)).to.equal(await BNB-ZKRollup.address);
    //
    //         // register
    //         const addr1L2Account = ethers.utils.formatBytes32String('BNB-ZKRollup.legend');
    //         const registerTx = await BNB-ZKRollup.connect(owner).register('BNB-ZKRollup', await addr1.getAddress(), addr1L2Account)
    //         await registerTx.wait()
    //         expect(await zns.owner(namehash.hash('BNB-ZKRollup.legend'))).to.equal(await addr1.getAddress());
    //
    //         // register illegal name
    //         const addr2L2Account = ethers.utils.formatBytes32String('BNB-ZKRollup2.legend');
    //         await expect(
    //             BNB-ZKRollup.connect(owner).register('id', await addr2.getAddress(), addr2L2Account)
    //         ).to.be.revertedWith("invalid name");
    //         await expect(
    //             BNB-ZKRollup.connect(owner).register('id-a', await addr2.getAddress(), addr2L2Account)
    //         ).to.be.revertedWith("invalid name");
    //
    //         // duplicated L2 owner
    //         await expect(
    //             BNB-ZKRollup.connect(owner).register('foo', await addr1.getAddress(), addr1L2Account)
    //         ).to.be.revertedWith('L2 owner existed');
    //     });
    // });

    // get the keccak256 hash of a specified string name
    // eg: getKeccak256('BNB-ZKRollup') = '0x621eacce7c1f02dbf62859801a97d1b2903abc1c3e00e28acfb32cdac01ab36d'
    const getKeccak256 = (name) => {
        return ethers.utils.keccak256(ethers.utils.toUtf8Bytes(name))
    }

    // recursively get the keccak256 hash of a specified sub name with its parent node
    // const getNameHash = (name) => {
    //     var node = ''
    //     for (var i = 0; i < 32; i++) {
    //         node += '00'
    //     }
    //
    //     if (name === '') {
    //         return '0x' + '0'.repeat(64)
    //     }
    //
    //     // split the name into 2 parts, if it contains '.', eg 'a.BNB-ZKRollup.legend' is split into 'a' and 'BNB-ZKRollup.legend'
    //     // or we add '' into the second place, eg 'legend' is split into 'legend' and ''
    //     const parts = name.split('.', 2);
    //     if(parts.length === 1) {
    //         parts.push('')
    //     }
    //
    //     const label = parts[0]
    //     const remainder = parts[1]
    //     console.log(label, remainder)
    //     return getKeccak256('0x' + getNameHash(remainder) + getKeccak256(label))
    // }
});