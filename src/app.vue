<template>
    <div>
        <ul class="hd-nav">
            <li class="nav-item">
                <router-link class="nav-link" to="/">
                    <span>index</span>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" to="/product">
                    <span>product</span>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" to="/about">
                    <span>about</span>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" to="/message">
                    <span>message</span>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" to="/test">
                    <span>test</span>
                </router-link>
            </li>
        </ul>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>

<script>
export default {
    data() {
        return {
            a: '532'
        }
    }
}
</script>

