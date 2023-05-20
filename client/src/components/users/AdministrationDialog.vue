<template>
  <base-dialog>
    <template v-slot:header>Администрация</template>
    <template v-slot:body>
      <transition name="fade">
        <question-save-dialog v-if="env.dialogs.questions.save" />
      </transition>
      <div class="h-[400px] overflow-y-scroll">
        <top-menu />
        <questions-tab v-if="env.tabs.admin.active === 'questions'" />
        <users-tab v-if="env.tabs.admin.active === 'users'" />
      </div>
    </template>
    <template v-slot:bottom>
      <div class="flex gap-2">
        <button
          class="base-button text-red-500 border-red-500"
          @click="() => handleCancel()"
        >
          Затвори
        </button>
      </div>
    </template>
  </base-dialog>
</template>

<script>
// stores
import { useEnvStore } from "../../stores/env";

// components
import BaseDialog from "../dialogs/BaseDialog.vue";
import TopMenu from "./TopMenu.vue";
import UsersTab from "./tabs/UsersTab.vue";
import QuestionsTab from "./tabs/QuestionsTab.vue";
import QuestionSaveDialog from "./dialogs/QuestionSaveDialog.vue";

export default {
  name: "AdministrationDialog",
  components: {
    BaseDialog,
    TopMenu,
    UsersTab,
    QuestionsTab,
    QuestionSaveDialog,
},
  setup() {
    const env = useEnvStore();

    const functions = {
      handleCancel() {
        env.dialogs.users.administration = false;
      },
    };

    return { env, ...functions };
  },
};
</script>
