<template>
    <div>
        <router-link v-for="i in arr" :key="i" :to="'/item/'+i+''">{{ i }}</router-link>
        <p>{{ str }}</p>
    </div>
</template>

<script>
export default {
    asyncData({ store, route }) {
        return store.dispatch('getString', route)
    },
    data() {
        return {
            arr: [1, 2, 3, 4, 5, 6]
        }
    },
    computed: {
        str() {
            return this.$store.state.nowString
        }
    },
    metaInfo: {
        title: 'item'
    }
}
</script>

<style lang="less" scoped>
a {
    display: inline-block;
    padding: 0 20px;
    margin: 10px;
}
</style>
