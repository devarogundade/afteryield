// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

library Enums {
    enum AutoPilotMode {
        Off,
        On
    }

    enum ApprovalFlag {
        None,
        Deposit,
        Withdraw,
        All
    }

    enum TaskType {
        AddStrategy,
        RemoveStrategy,
        Reallocation
    }
}
