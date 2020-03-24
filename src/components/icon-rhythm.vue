<template>
    <div class="music active">
        <i></i>
        <i></i>
        <i></i>
    </div>
</template>

<script>
    export default {}
</script>

<style lang="less" scoped>

    .music {
        width: 100%;
        height: 1px;
        position: relative;
        display: flex;
    }

    .music i {
        width: 4px;
        height: 2px;
        position: absolute;
        bottom: -33px;
    }

    .music i:nth-of-type(1) {
        left: 10px;
    }

    .music i:nth-of-type(2) {
        left: 20px;
    }

    .music i:nth-of-type(3) {
        left: 30px;
    }

    .music.active i:nth-of-type(1) {
        -webkit-animation: wave 0.66s linear infinite;
        animation: wave 0.66s linear infinite;
        background-color: @cl-active-bg;
    }

    .music.active i:nth-of-type(2) {
        -webkit-animation: wave 0.8s linear infinite;
        animation: wave 0.8s linear infinite;
        background-color: @cl-active-bg;
    }

    .music.active i:nth-of-type(3) {
        -webkit-animation: wave 0.7s linear infinite;
        animation: wave 0.7s linear infinite;
        background-color: @cl-active-bg;
    }

    @keyframes wave {
        0% {
            height: 2px
        }
        50% {
            height: 20px
        }
        100% {
            height: 8px
        }
    }
</style>