// SPDX-License-Identifier: MIT
pragma solidity ^0.7.6;

import "../ResolverBase.sol";
import "./IBNB-ZKRollupPubKeyResolver.sol";
import "../../ZNS.sol";

abstract contract BNB-ZKRollupPubKeyResolver is IBNB-ZKRollupPubKeyResolver, ResolverBase {

    /**
     * Returns the public key in L2 associated with an ZNS node.
     * @param node The node to query
     * @return pubKeyX The public key in L2 owns this node
     * @return pubKeyY The public key in L2 owns this node
     */
    function BNB-ZKRollupPubKey(bytes32 node) virtual override external view returns (bytes32 pubKeyX, bytes32 pubKeyY);

    function supportsInterface(bytes4 interfaceID) virtual override public pure returns (bool) {
        return interfaceID == type(IBNB-ZKRollupPubKeyResolver).interfaceId || super.supportsInterface(interfaceID);
    }
}
