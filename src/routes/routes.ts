import {createRouter, createWebHistory} from "vue-router";

import Feed from "../components/Feed/Feed.vue";

const routes =[
    {
        path:'/',
        component: Feed,
    }
]

const router = createRouter({
    history:createWebHistory(),
    routes
})

export default router