<template>
  <base-dialog class="h-[400px] overflow-y-scroll">
    <template v-slot:header>Вхов</template>
    <template v-slot:body>
      <form>
        <div class="mb-5">
          <label for="email">Имейл Адрес</label>
          <input type="email" v-model="user.item.email" class="base-input">
        </div>
        <div class="mb-5">
          <label for="password">Парола</label>
          <input type="password" v-model="user.item.password" class="base-input">
        </div>
      </form>
    </template>
    <template v-slot:bottom>
      <div class="flex gap-2">
        <button class="text-green-500 border-green-500" @click="handleSubmit">Потвърди</button>
        <button class="text-red-500 border-red-500" @click="handleCancel">Отакз</button>
      </div>
    </template>
  </base-dialog>
</template>

<script>
// stores
import { useEnvStore } from '../../stores/env';
import { useUserStore } from '../../stores/user';

// components
import BaseDialog from '../dialogs/BaseDialog.vue';

export default {
  name: "LoginDialog",
  components: {
    BaseDialog,
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
