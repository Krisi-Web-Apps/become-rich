<template>
  <top-navbar-menu />
  <auth-wrapper />
  <users-wrapper />
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
        <div v-if="env.trivia.showTheWindow" class="w-full h-full">
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
import UsersWrapper from "./users/UsersWrapper.vue";

export default {
  name: "InitializeApp",
  components: {
    TheTrivia,
    TopNavbarMenu,
    AuthWrapper,
    UsersWrapper,
  },
  setup() {
    const env = useEnvStore();
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
