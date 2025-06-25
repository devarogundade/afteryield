<script setup lang="ts">
import { AccountFactoryContract } from '@/scripts/contracts';
import { Application } from '@splinetool/runtime';
import { onMounted, ref } from 'vue';

const creating = ref(false);
const termsOfUse = ref(false);

const createAccount = async () => {
    if (creating.value) return;

    if (!termsOfUse.value) {
        return;
    }

    creating.value = true;

    const txHash = await AccountFactoryContract.createAccount();

    if (txHash) {

    } else { }

    creating.value = false;
};

onMounted(() => {
    const account3d = document.getElementById('account3d')! as HTMLCanvasElement;
    const appAccount3d = new Application(account3d);
    appAccount3d.load('/3ds/account.splinecode');
});
</script>

<template>
    <section>
        <div class="app_width">
            <div class="what">
                <canvas id="account3d" class="account3d"></canvas>
                <div class="text">
                    <h3>What's an After<span>Yield</span> Account?</h3>

                    <p>An AfterYield Account is your gateway to intelligent DeFi investing. It enables you to deposit
                        capital into AI-powered strategies curated by specialized agents. These agents analyze market
                        conditions and optimize asset allocation on your behalf — helping you earn more with less
                        effort.</p>

                    <p>With an AfterYield Account, you gain access to:</p>

                    <ul>
                        <li>Automated, strategy-driven vaults</li>
                        <li>Real-time performance tracking</li>
                        <li>Customizable risk preferences</li>
                        <li>On-chain transparency and control</li>
                    </ul>

                    <p>Whether you're a passive investor or an active DeFi participant, AfterYield gives you the edge of
                        AI-powered yield optimization.</p>

                    <div class="terms">
                        <input type="checkbox" v-model="termsOfUse">
                        <span>Agree to <a href="">terms of use</a> and continue.</span>
                    </div>

                    <button @click="createAccount">Create Account</button>
                </div>
            </div>


        </div>
    </section>
</template>

<style scoped>
.what {
    display: grid;
    grid-template-columns: 400px 800px;
    justify-content: center;
    padding: 40px 0;
    gap: 40px;
}

.account3d {
    width: 400px !important;
    height: 400px !important;
    overflow: hidden;
    border-radius: 200px;
}

.what .text {
    margin-top: 40px;
}

.what h3 {
    font-weight: 500;
    font-size: 36px;
    color: var(--tx-normal);
}

.what h3 span {
    color: var(--tx-semi);
}


.what li {
    margin-top: 10px;
    font-weight: 400;
    font-size: 16px;
    line-height: 30px;
    color: var(--tx-dimmed);
    list-style: none;
    position: relative;
    padding-left: 28px;
}

.what li::before {
    content: "☑️";
    position: absolute;
    left: 0;
    top: 0;
    font-size: 18px;
    line-height: 30px;
}

.what p {
    margin-top: 10px;
    font-weight: 400;
    font-size: 16px;
    line-height: 30px;
    color: var(--tx-dimmed);
}

.terms {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 40px;
    color: var(--tx-dimmed);
    font-size: 14px;
}

.terms a {
    color: var(--accent-green);
}

.what button {
    margin-top: 20px;
    width: 140px;
    font-weight: 500;
    height: 36px;
    border-radius: 6px;
    border: 1px solid var(--primary-light);
    background: var(--bg-lightest);
    color: var(--tx-normal);
    cursor: pointer;
}
</style>