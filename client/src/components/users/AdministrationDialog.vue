<template>
  <base-dialog class="h-[400px] overflow-y-scroll">
    <template v-slot:header>Администрация</template>
    <template v-slot:body>

    </template>
    <template v-slot:bottom>
      <div class="flex gap-2">
        <button class="base-button text-green-500 border-green-500">
          Потвърди
        </button>
        <button class="base-button text-red-500 border-red-500" @click="handleCancel">
          Отакз
        </button>
      </div>
    </template>
  </base-dialog>
</template>

<script>
// components
import { useEnvStore } from '../../stores/env';
import BaseDialog from '../dialogs/BaseDialog.vue';

export default {
  name: "AdministrationDialog",
  components: {
    BaseDialog,
  },
  setup() {
    const env = useEnvStore();

    const functions = {
      handleCancel() {
        env.dialogs.users.administration = false;
      }
    }
    
    return { env, ...functions }
  }
};
</script>
