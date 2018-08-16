<template>
    <div>
        <p>{{ msg }}</p>
        <p>--------------- <br> 子组件有asyncData请求？ <br>---------------</p>
        <p>1.getMatchedComponents 不会检测出所以不会触发 </p>
        <about></about>
    </div>
</template>

<script>
import about from './about'
export default {
    data() {
        return {
            msg: 'this is product'
        }
    },
    components: { about }
}
</script>

