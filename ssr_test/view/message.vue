<template>
    <div>
        <p>{{ msg }}</p>
        <p>{{ str }}</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            msg: 'this is message'
        }
    },
    asyncData({ store, route }) {
        return store.dispatch('getString', route)
    },
    computed: {
        str() {
            return this.$store.state.nowString
        }
    }
}
</script>

