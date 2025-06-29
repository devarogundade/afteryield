<template>
    <div class="coming-soon-container">
        <h1>Coming Soon</h1>
        <p>We're working hard to launch something amazing. Stay tuned!</p>
        <form class="notify-form">
            <input type="email" placeholder="Enter your email" required />
            <button type="submit">Notify Me</button>
        </form>
    </div>
</template>

<style scoped>
.coming-soon-container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 100px 0;
    text-align: center;
}

.coming-soon-container h1 {
    font-size: 3rem;
    color: var(--tx-normal);
    margin-bottom: 1rem;
}

.coming-soon-container p {
    font-size: 1.2rem;
    color: var(--tx-dimmed);
    margin-bottom: 2rem;
}

.notify-form {
    border: 1px solid var(--primary-light);
    border-radius: 5px;
    overflow: hidden;
    height: 40px;
}

.notify-form input[type="email"] {
    padding: 0 10px;
    border: none;
    outline: none;
    height: 100%;
    font-size: 14px;
    background: var(--bg-lighter);
}

.notify-form button {
    padding: 0.7rem 1rem;
    background-color: var(--primary-light);
    color: var(--tx-normal);
    border: none;
    height: 100%;
    cursor: pointer;
    font-size: 14px;
}

.notify-form button:hover {
    background-color: var(--primary);
}
</style>
