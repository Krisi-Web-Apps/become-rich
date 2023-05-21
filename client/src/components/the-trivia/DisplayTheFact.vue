<template>
  <base-dialog>
    <template v-slot:header>Интересен факт!</template>
    <template v-slot:body>
      <div class="max-h-[400px] overflow-y-scroll pr-5">
        <div v-html="question.item.options.fact"></div>
      </div>
    </template>
    <template v-slot:bottom>
      <div class="flex gap-2 mt-5">
        <button class="base-button text-green-500 border-green-500" @click="handleNext">
          Продължи
        </button>
      </div>
    </template>
  </base-dialog>
</template>

<script>
// stores
import { useQuestionStore } from "../../stores/question";

// components
import BaseDialog from "../dialogs/BaseDialog.vue";

export default {
  name: "DisplayTheFact",
  components: {
    BaseDialog,
  },
  setup() {
    const question = useQuestionStore();

    const functions = {
      handleNext() {
        question.showTheFact = false;
        setTimeout(() => question.getNextItem(), 500);
      },
    };

    return { question, ...functions };
  },
};
</script>
