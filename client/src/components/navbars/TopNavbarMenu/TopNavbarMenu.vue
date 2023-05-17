<template>
  <div class="container h-14 flex items-center">
    <ul class="flex gap-2 px-2">
      <li>
        <button @click="() => handleOpen('login')">Вход</button>
      </li>
      <li>
        <button @click="() => handleOpen('register')">Регистрация</button>
      </li>
    </ul>
  </div>
</template>

<script>
// stores
import { useEnvStore } from '../../../stores/env';

export default {
  name: "TopNavbarMenu",
  setup() {
    const env = useEnvStore();

    const functions = {
      open: {
        login() {
          env.dialogs.auth.login = true;
        },
        register() {
          env.dialogs.auth.register = true;
        }
      },
      handleOpen(func) {
        this.open[func]();
      }
    }

    return { env, ...functions }
  }
};
</script>
