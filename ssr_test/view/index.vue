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
            msg: 'this is index'
        }
    },
    asyncData({ store, route }) {
        return store.dispatch('getString', route)
    },
    computed: {
        str() {
            return this.$store.state.nowString
        }
    },
    metaInfo: {
        title: 'index',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' }
        ],
        link: [
            { rel: 'stylesheet', href: '/css/index.css' },
            { rel: 'favicon', href: 'favicon.ico' }
        ]
    }
}
</script>

