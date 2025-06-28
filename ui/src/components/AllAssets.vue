<script setup lang="ts">
import { getTokens } from '@/scripts/constants';
import Converter from '@/scripts/converter';
import { useBalanceStore } from '@/stores/balance';
import { onMounted, onUnmounted } from 'vue';

const emit = defineEmits(['close']);

const balanceStore = useBalanceStore();

onMounted(() => {
    document.body.style.overflowY = 'hidden';
});

onUnmounted(() => {
    document.body.style.overflowY = 'auto';
});
</script>

<template>
    <div class="overlay">
        <div class="form">
            <div class="title">
                <p>All Assets</p>

                <div class="close" @click="emit('close')">
                    <i class="fi fi-rs-cross"></i>
                </div>
            </div>

            <div class="subtitle">
                <p>Type</p>
                <p>Wallet</p>
                <p>Account</p>
            </div>

            <div class="scroll">
                <div class="assets">
                    <div class="asset" v-for="token in getTokens">
                        <div class=" info">
                            <img :src="token.icon" alt="">
                            <div class="name">
                                <p>{{ token.name }}</p>
                                <p>{{ token.symbol }}</p>
                            </div>
                        </div>

                        <div class="amount">
                            <p>{{ Converter.toMoney(balanceStore.userBalances[token.address]) }}</p>
                            <!-- <p>≈ ${{ 0 }}</p> -->
                        </div>

                        <div class="amount">
                            <p>{{ Converter.toMoney(balanceStore.balances[token.address]) }}</p>
                            <!-- <p>≈ ${{ 0 }}</p> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.overlay {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: fixed;
    background: rgba(51, 51, 51, 0.35);
    backdrop-filter: blur(5px);
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 20px;
}

.form {
    height: fit-content;
    width: 400px;
    border-radius: 16px;
    background: var(--bg);
    overflow: hidden;
}

.title {
    padding: 24px 24px 14px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.title p {
    font-size: 16px;
    color: var(--tx-normal);
}

.subtitle p:first-child {
    width: 160px;
}

.subtitle {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 34px;
    background: var(--bg-light);
    padding: 0 24px;
}

.subtitle p {
    font-size: 14px;
    color: var(--tx-semi);
}

.close {
    width: 36px;
    height: 30px;
    border-radius: 6px;
    cursor: pointer;
    border: 1px solid var(--bg-lightest);
    display: flex;
    align-items: center;
    justify-content: center;
}

.scroll {
    overflow-y: auto;
    height: calc(100vh - 140px);
}

.asset {
    height: 90px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 24px;
    border-bottom: 1px solid var(--bg-lightest);
}

.asset:last-child {
    border-bottom: none
}

.info {
    display: flex;
    align-items: center;
    gap: 14px;
    width: 160px;
}

.asset img {
    width: 40px;
    width: 40px;
    border-radius: 20px;
}

.name p:first-child {
    color: var(--tx-normal);
    font-size: 14px;
}

.name p:last-child {
    margin-top: 4px;
    color: var(--tx-semi);
    font-size: 14px;
}

.amount {
    text-align: right;
}

.amount p:first-child {
    color: var(--tx-normal);
    font-size: 14px;
}

.amount p:last-child {
    margin-top: 4px;
    color: var(--tx-semi);
    font-size: 14px;
}
</style>
