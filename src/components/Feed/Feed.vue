<template>
    <main class="mainFrame">
        <Post v-if="authIsClosed && posts.length > 0"
              :currentPostInfo.sync="currentPost"
              @changePost="nextPost"
        />
        <LoadingPost v-if="authIsClosed && posts.length <= 0"/>
        <AuthBox v-if="!authIsClosed"
                 :authClicked="authClicked"
                 @userAuthenticated="userAuthenticated = true"
                 @closeMenu="closeAuthMenu"
        />
        <CircleMenu v-if="circleMenuIsOpen"
                    :class="{'circleMenu--height': circleMenuAnimation}"
                    @currentCircleId="setCurrentCircle"
        />

        <CircleSelector :class="{'expandedCircleSelector': !circleCollapsed}"
                        v-if="!userAuthenticated"
                        :currentCircle="currentCircle"
        />


        <nav class="uppBoxRow" v-if="userAuthenticated">
            <CircleSelector @click="toggleCircleMenu"
                            :class="{'expandedCircleSelector': !circleCollapsed}"
                            v-if="mainMenuCollapsed"
                            :currentCircle="currentCircle"
            />
            <UploadButton v-if="circleCollapsed"
                          :currentCircle="currentCircle"
            />
            <MainMenu v-if="circleCollapsed"/>
        </nav>

        <RegisterButtons v-else @buttonPressed="toggleAuthMenu"/>
    </main>
</template>

<script lang="ts">
// @ts-nocheck
import Post from "./Post.vue";
import LoadingPost from "./LoadingPost.vue";
import RegisterButtons from "./RegisterButtons.vue";
import AuthBox from "../Auth/AuthBox.vue";
import Activity from "../Activity.vue";
import Navigation from "../Navigation/Navigation.vue";
import CircleSelector from "../Navigation/CircleSelector.vue";
import CircleMenu from "../Navigation/CircleMenu.vue";
import {apiService} from "../../services/apiService.ts";
import {Circle} from "../../models/Circles.ts";
import UploadButton from "../Navigation/UploadButton.vue";
import MainMenu from "../Navigation/MainMenu.vue";
import {_Post} from "../../models/Posts.ts";

export default {
    components: {
        MainMenu, UploadButton,
        CircleMenu,
        CircleSelector,
        Navigation,
        Activity,
        Post,
        RegisterButtons: RegisterButtons,
        AuthBox: AuthBox,
        LoadingPost: LoadingPost
    },
    data() {
        return {
            authClicked: 0,
            authIsClosed: true,
            userAuthenticated: false,
            circleMenuIsOpen: false,
            circleMenuAnimation: false,
            currentCircle: {} as Circle,
            currentCircleId: 0,
            loadComplete: false,
            circleCollapsed: true,
            mainMenuCollapsed: true,
            posts: [] as _Post[],
            currentPost: {} as _Post,
            currentPostIndex: 0,
            currentAuthorData: {},
            API: new apiService()
        };
    },
    beforeMount() {
        this.setCurrentCircle(1);
        this.loadPosts();
    },
    watch: {
        currentCircleId() {
            this.loadPosts();
        }
    },
    methods: {
        toggleAuthMenu(buttonId: number) {
            if (this.authIsClosed || this.authClicked == buttonId) {
                this.authIsClosed = !this.authIsClosed;
            }
            this.authClicked = buttonId;
        },
        closeAuthMenu() {
            console.log("closeAuthMenu");
            this.authIsClosed = true;
        },
        toggleCircleMenu() {
            this.circleCollapsed = !this.circleCollapsed;
            //if the menu is closed, open it, wait and start the animation.
            if (!this.circleMenuIsOpen) {
                this.circleMenuIsOpen = true;
                setTimeout(() => {
                    this.circleMenuAnimation = true;
                }, 100);
            } else {
                // If is open, turn false the animation, wait and then close it
                this.circleMenuAnimation = false;
                setTimeout(() => {
                    this.circleMenuIsOpen = false;
                }, 1000);
            }
        },
        setCurrentCircle(circleId: number) {
            console.log(circleId);
            this.API.getOneCircle(circleId).then((response) => {
                this.currentCircle = response.data.circle;
            });

            this.currentCircleId = circleId;
        },
        loadPosts() {
            this.API.getPostsByCircle(this.currentCircleId).then((response) => {
                this.posts = response.data.posts;
                this.setCurrentPost(0);
            });
        },
        setCurrentPost(index: number) {
            this.currentPost = this.posts[index]
            this.currentPostIndex = index;
        },
        nextPost(){
            if(this.currentPostIndex < this.posts.length - 1){
                this.setCurrentPost(this.currentPostIndex + 1);
            } else {
                this.setCurrentPost(0);
            }
        },
    }
};
</script>