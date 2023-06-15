<template>
    <main class="mainFrame">
        <Post v-if="authIsClosed && posts.length > 0"
              :currentPostInfo.sync="currentPost"
              @changePost="nextPost"
              :class="{ 'slideFromAbove': slideFromAboveAnimation }"
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
                          @contentUpload="loadPosts"
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
            slideDownAnimation: false,
            slideFromAboveAnimation: false,
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
        this.checkAuth();
        this.setCurrentCircle(1);
        this.loadPosts();
    },
    watch: {
        currentCircleId() {
            this.loadPosts();
        },
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
            console.log("loadPosts");
            this.API.getPostsByCircle(this.currentCircleId).then((response) => {
                this.posts = response.data.posts;
                // reverse post order
                this.posts.reverse();
                this.setCurrentPost(0);
            });
        },
        setCurrentPost(index: number) {
            this.currentPost = this.posts[index]
            this.currentPostIndex = index;
        },
        nextPost(){
            if(this.currentPostIndex < this.posts.length - 1){
                this.slideFromAboveAnimation = true;
                setTimeout(() => {
                    this.setCurrentPost(this.currentPostIndex + 1);
                }, 100);

                setTimeout(() => {
                    this.slideFromAboveAnimation = false;
                }, 1200);
            } else {
                this.slideFromAboveAnimation = true;
                this.setCurrentPost(0);
                setTimeout(() => {
                    this.slideFromAboveAnimation = false;
                }, 1200);
            }
        },
        checkAuth() {
            this.API.checkAuth()
                .then((response) => {
                    // Si el código de estado es 200, el usuario está autenticado; de lo contrario, no está autenticado
                    this.userAuthenticated = response.status === 200;
                })
                .catch((error) => {
                    if (error.response && error.response.status === 401) {
                        console.log("No autenticado");
                    } else {
                        console.log(error);
                    }
                });
        }
    }
};
</script>