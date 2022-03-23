<template>
    <div id="app">
        <h1 class="title">Checking NFT's Exist And Attribute</h1>
        <DiscordBot msg="Welcome to Your Vue.js App" />
    </div>
</template>

<script>
import DiscordBot from "./components/DiscordBot.vue";

export default {
    name: "App",
    components: {
        DiscordBot,
    },
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>

<style scoped>
.title {
    font-size: 45px;
}
</style>
