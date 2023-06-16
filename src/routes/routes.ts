import {createRouter, createWebHistory} from "vue-router";

import Feed from "../components/Feed/Feed.vue";
import Circles from "../components/Circles/Circles.vue";

const routes =[
    {
        path:'/',
        component: Feed,
    },
    {
        path:'/circles',
        component: Circles,
    }
]

const router = createRouter({
    history:createWebHistory(),
    routes
})

export default router