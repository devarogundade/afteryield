// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

library StringHelpers {
    /**
     * @dev Converts an address to its ASCII `string` hexadecimal representation (0x-prefixed).
     */
    function addressToString(
        address _addr
    ) internal pure returns (string memory) {
        bytes memory alphabet = "0123456789abcdef";
        bytes20 addr = bytes20(_addr);
        bytes memory str = new bytes(42); // "0x" + 40 hex chars
        str[0] = "0";
        str[1] = "x";
        for (uint i = 0; i < 20; i++) {
            str[2 + i * 2] = alphabet[uint(uint8(addr[i] >> 4))];
            str[3 + i * 2] = alphabet[uint(uint8(addr[i] & 0x0f))];
        }
        return string(str);
    }

    /**
     * @dev Converts a uint value to its ASCII `string` decimal representation.
     */
    function uintToString(uint value) internal pure returns (string memory) {
        if (value == 0) {
            return "0";
        }

        uint temp = value;
        uint digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }

        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint(value % 10)));
            value /= 10;
        }

        return string(buffer);
    }
}
