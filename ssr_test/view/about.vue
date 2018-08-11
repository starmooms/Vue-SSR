<template>
    <div>
        <p>{{ msg }}</p>
        <P>{{ str }}</P>
    </div>
</template>

<script>
export default {
    asyncData({ store, route }) {
        return store.dispatch('getString', route)
    },
    computed: {
        str() {
            return this.$store.state.nowString
        }
    },
    watch: {
        str(o, n) {
            console.log(n)
        }
    },
    data() {
        return {
            msg: 'this is about'
        }
    }
}
</script>

