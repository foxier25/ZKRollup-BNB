// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.7.6;

import "./BNB-ZKRollupUpgradeTest.sol";
import "../Proxy.sol";
import "../UpgradeGatekeeper.sol";

contract DeployFactoryTest {

    constructor(
        BNB-ZKRollupUpgradeTest _BNB-ZKRollupTarget,
        UpgradableBank _bank
    ) {
        deployProxyContracts(_BNB-ZKRollupTarget, _bank);
        selfdestruct(msg.sender);
    }

    event Addresses(address BNB-ZKRollup, address bank, address gatekeeper);

    function deployProxyContracts(
        BNB-ZKRollupUpgradeTest _BNB-ZKRollupTest,
        UpgradableBank _bank
    ) internal {
        Proxy bank = new Proxy(address(_bank), abi.encode());
        Proxy BNB-ZKRollup = new Proxy(address(_BNB-ZKRollupTest), abi.encode(address(bank)));

        UpgradeGatekeeper upgradeGatekeeper = new UpgradeGatekeeper(BNB-ZKRollup);

        BNB-ZKRollup.transferMastership(address(upgradeGatekeeper));
        upgradeGatekeeper.addUpgradeable(address(BNB-ZKRollup));

        bank.transferMastership(address(upgradeGatekeeper));
        upgradeGatekeeper.addUpgradeable(address(bank));

        // New master is a governor
        upgradeGatekeeper.transferMastership(msg.sender);

        emit Addresses(address(BNB-ZKRollup), address(bank), address(upgradeGatekeeper));
    }

}
