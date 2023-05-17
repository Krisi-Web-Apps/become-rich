<template>
  <div class="fixed top-0 left-0 z-40 bg-black/20 w-full h-screen flex justify-center items-center">
    <div class="md:w-4/5 lg:w-3/5 xl:w-2/5 max-md:mx-5 w-full bg-white border rounded shadow-xl p-5">
      <h2 class="text-2xl mb-5">Вход</h2>
      <div class="flex gap-2">
        <button class="text-green-500 border-green-500">Потвърди</button>
        <button class="text-red-500 border-red-500" @click="handleCancel">Отакз</button>
      </div>
    </div>
  </div>
</template>

<script>
// stores
import { useEnvStore } from '../../stores/env';

export default {
  name: "LoginDialog",
  setup() {
    const env = useEnvStore();
    const functions = {
      handleCancel() {
        env.dialogs.auth.login = false;
      }
    }
    return { ...functions }
  }
};
</script>
