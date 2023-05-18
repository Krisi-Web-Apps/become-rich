<template>
  <form @submit.prevent="handleSubmit">
    <base-dialog class="h-[400px] overflow-y-scroll">
      <template v-slot:header>Профил</template>
      <template v-slot:body>
        <div class="mb-5">
          <label for="first_name">Малко Име</label>
          <input type="text" v-model="user.item.options.first_name" class="base-input" />
        </div>
        <div class="mb-5">
          <label for="last_name">Фамилия</label>
          <input type="text" v-model="user.item.options.last_name" class="base-input" />
        </div>
        <div class="mb-5">
          <label for="country">Държава</label>
          <input type="text" v-model="user.item.options.country" class="base-input" />
        </div>
        <div class="mb-5">
          <label for="city">Град</label>
          <input type="text" v-model="user.item.options.city" class="base-input" />
        </div>
      </template>
      <template v-slot:bottom>
        <div class="flex gap-2">
          <button class="base-button text-green-500 border-green-500" :disabled="user.loading">
            Потвърди
          </button>
          <button type="button" class="base-button text-red-500 border-red-500" @click="handleCancel" :disabled="user.loading">
            Отакз
          </button>
        </div>
      </template>
    </base-dialog>
  </form>
</template>

<script>
// stores
import { useEnvStore } from "../../stores/env";
import { useUserStore } from "../../stores/user";

// components
import BaseDialog from "../dialogs/BaseDialog.vue";

export default {
  name: "ProfileDialog",
  components: {
    BaseDialog,
  },
  setup() {
    const user = useUserStore();
    const env = useEnvStore();

    const functions = {
      handleSubmit() {
        user.saveItem();
      },
      handleCancel() {
        env.dialogs.users.profile = false;
      },
    };

    return { user, ...functions };
  },
};
</script>
