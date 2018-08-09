<template>
    <div>
        <p>{{ msg }}</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            msg: 'this is about'
        }
    },
    metaInfo() {
        return {
            title: 'about',
            meta: [
                {
                    // set meta
                    name: 'keyWords',
                    content: 'about'
                },
                {
                    name: 'viewport',
                    content:
                        'width=device-width,initial-scale=1,maximum-scale=1'
                },
                {
                    name: 'description',
                    content: 'ddddd'
                },
                {
                    name: 'author',
                    content: '英盛网'
                }
            ]
            // link: [{ rel: 'stylesheet', href: '/css/test.css' }]
        }
    }
}
</script>

