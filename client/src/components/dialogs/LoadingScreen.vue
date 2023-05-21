<template>
  <div class="fixed top-0 left-0 w-full h-full flex justify-center items-center">
    <div class="loading"></div>
  </div>
</template>

<script>
export default {
  name: "LoadingScreen",
};
</script>

<style>
@keyframes loadingAnimation {
  0% {
    opacity: 0;
    transform: scale(0.6);
  }
  50% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(0.6);
  }
}
.loading {
  z-index: 100;
  animation: loadingAnimation 1500ms infinite ease-in-out;
  @apply bg-primary w-20 h-20 rounded-full transition-all;
}
</style>
