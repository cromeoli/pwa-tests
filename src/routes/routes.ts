import {createRouter, createWebHistory} from "vue-router";

import Feed from "../components/Feed/Feed.vue";
import Circles from "../components/Circles/Circles.vue";
import FindCircles from "../components/Circles/FindCircles.vue";

const routes =[
    {
        path:'/',
        component: Feed,
    },
    {
        path:'/circles',
        component: Circles,
    },
    {
        path:'/findCircles',
        component: FindCircles,
    }
]

const router = createRouter({
    history:createWebHistory(),
    routes
})

export default router