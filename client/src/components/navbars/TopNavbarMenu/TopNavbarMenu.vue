<template>
  <div class="container h-14 flex items-center">
    <ul v-if="!user.isLoggedIn" class="flex gap-2 px-2">
      <li>
        <button class="base-button" @click="() => handleOpen('login')">Вход</button>
      </li>
      <li>
        <button class="base-button" @click="() => handleOpen('register')">Регистрация</button>
      </li>
    </ul>
    <ul v-if="user.isLoggedIn" class="flex gap-2 px-2">
      <li>
        <button class="base-button" @click="() => handleOpen('logout')">Изход</button>
      </li>
      <li>
        <button class="base-button" @click="() => handleOpen('profile')">Профил</button>
      </li>
      <li v-if="user.item.role_as === 'admin'">
        <button class="base-button" @click="() => handleOpen('administration')">Администрация</button>
      </li>
    </ul>
  </div>
</template>

<script>
// stores
import { useEnvStore } from "../../../stores/env";
import { useUserStore } from "../../../stores/user";

export default {
  name: "TopNavbarMenu",
  setup() {
    const env = useEnvStore();
    const user = useUserStore();

    const functions = {
      open: {
        login() {
          user.item = { options: {} };
          env.dialogs.auth.login = true;
        },
        register() {
          user.item = { options: {} };
          env.dialogs.auth.register = true;
        },
        logout() {
          user.logout();
        },
        profile() {
          env.dialogs.users.profile = true;
        },
        administration() {
          env.dialogs.users.administration = true;
        }
      },
      handleOpen(func) {
        this.open[func]();
      },
    };

    return { env, user, ...functions };
  },
};
</script>
