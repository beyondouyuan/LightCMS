<template>
    <div class="main-view">
        <section class="web-container">
            <web-header :loginState="loginState" :menus="menus" :current="current">
            </web-header>
            <section class="web-main_content">
                <main class="web-main_wrapper">
                    <section class="main-container">
                        <nuxt />
                    </section>
                </main>
            </section>
        </section>
        <web-footer></web-footer>
    </div>
</template>
<script>
import { mapGetters, mapState, mapActions } from "vuex"

import WebHeader from '~/components/Client/Header'
import UsersSidebar from '~/components/Client/UsersSidebar'
import WebFooter from '~/components/Client/Footer'
import {
    log,
    arrayToTree
} from '~/utils/util'
const requestCode = 200
import { requestMenuList, requestLinkList } from '~/api/web'
const serverFetchMenuList = () => {
    const condition = {
        mode: 'full'
    }
    return requestMenuList(condition)
        .then(res => {
            const {
                code,
                data: { list }
            } = res
            if (code === requestCode) {
                const tree = arrayToTree(list)
                tree.forEach(item => {
                    if (item.children.length === 0) {
                        delete item.children
                    }
                })
                return tree
            }
        })
        .catch(e => {
            return []
        })
}
const serverFetchLinkList = () => {
    const condition = {
        mode: 'full'
    }
    return requestLinkList(condition)
        .then(res => {
            const {
                code,
                data: { list }
            } = res
            if (code === requestCode) {
                return list
            }
        })
        .catch(e => {
            return []
        })
}
export default {
    async asyncData() {
        const list = [{
            name: 'irving',
            id: 1
        }]
        return {
            users: list
        }
    },
    async fetch({ store, params }) {
        const menus = await serverFetchMenuList()
        const links = await serverFetchLinkList()
        store.commit('SET_TOP_MENUS', menus)
        store.commit('SET_FRIEND_LINK', links)
    },
    layout(context) {
        return 'web'
    },
    head() {
        return {
            title: 'ligtCMS-首页'
        }
    },
    computed: mapState(['loginState', 'menus', 'current', 'fans', 'follows', 'memberInfo']),
    methods: {

    },
    components: {
        WebHeader,
        UsersSidebar,
        WebFooter
    }
}
</script>
<style lang="scss" scoped>
.main-view {
    width: 100%;
    height: 100%;
    position: relative;
}
.web-main_wrapper {
    width: 100%;
    display: flex;
    justify-content: space-between;

    .main-container {
        flex: 1
    }

    .sidebar-container {
        width: 25%;
        box-sizing: border-box;
        padding-left: 1rem;
        // background-color: #FFFFFF;
    }
}
</style>
