<template>
  <top-navbar-menu />
  <auth-wrapper />
  <transition name="fade">
    <profile-dialog v-if="env.dialogs.users.profile" />
  </transition>
  <div class="w-full h-screen">
    <div class="w-full h-5/6 container">
      <transition name="fade">
        <div
          v-if="env.screens.start"
          class="bg-gradient w-full h-full flex justify-center items-center"
        >
          <h1 class="text-white text-center text-6xl font-bold text-animation">
            Стани Богат
          </h1>
        </div>
      </transition>
      <transition name="fade">
        <div
          v-if="env.screens.start === false && env.screens.theTrivia"
          class="w-full h-full"
        >
          <the-trivia />
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
// stores
import { useEnvStore } from "../stores/env";

// components
import TheTrivia from "../components/the-trivia/TheTrivia.vue";
import TopNavbarMenu from "../components/navbars/TopNavbarMenu/TopNavbarMenu.vue";
import AuthWrapper from "../components/auth/AuthWrapper.vue";
import ProfileDialog from "./users/ProfileDialog.vue";

export default {
  name: "InitializeApp",
  components: {
    TheTrivia,
    TopNavbarMenu,
    AuthWrapper,
    ProfileDialog,
},
  setup() {
    const env = useEnvStore();

    const functions = {
      start() {
        // hide the initial screen after 3 seconds
        setTimeout(() => {
          env.screens.start = false;

          // show the trivia view after 1 second
          setTimeout(() => {
            env.screens.theTrivia = true;
          }, 1000);
        }, 3000);
      },
    };

    functions.start();

    return { env };
  },
};
</script>

<style>
.bg-gradient {
  background: radial-gradient(#0f00f0, #0f0079);
}
.text-animation {
  animation: text-animation 3000ms ease forwards;
}
</style>
