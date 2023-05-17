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
import { useUserStore } from '../../../stores/user';

export default {
  name: "TopNavbarMenu",
  setup() {
    const env = useEnvStore();
    const user = useUserStore();

    const functions = {
      open: {
        login() {
          user.item = { options: { } }
          env.dialogs.auth.login = true;
        },
        register() {
          user.item = { options: { } }
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
