<template>
  <form @submit.prevent="handleSubmit">
    <base-dialog class="h-[400px] overflow-y-scroll">
      <template v-slot:header>Вхов</template>
      <template v-slot:body>
        <div class="mb-5">
          <label for="email">Имейл Адрес</label>
          <input type="email" v-model="user.item.email" class="base-input">
        </div>
        <div class="mb-5">
          <label for="password">Парола</label>
          <input type="password" v-model="user.item.password" class="base-input">
        </div>
      </template>
      <template v-slot:bottom>
        <div class="flex gap-2">
          <button class="base-button text-green-500 border-green-500" :disabled="user.loading">Потвърди</button>
          <button type="button" class="base-button text-red-500 border-red-500" :disabled="user.loading" @click="handleCancel">Отакз</button>
        </div>
        <loading-screen v-if="user.loading" />
      </template>
    </base-dialog>
  </form>
</template>

<script>
// stores
import { useEnvStore } from '../../stores/env';
import { useUserStore } from '../../stores/user';

// components
import BaseDialog from '../dialogs/BaseDialog.vue';
import LoadingScreen from '../dialogs/LoadingScreen.vue';

export default {
  name: "LoginDialog",
  components: {
    BaseDialog,
    LoadingScreen,
  },
  setup() {
    const env = useEnvStore();
    const user = useUserStore();

    const functions = {
      handleSubmit() {
        user.login();
      },
      handleCancel() {
        env.dialogs.auth.login = false;
      }
    }

    return { user, ...functions }
  }
};
</script>
