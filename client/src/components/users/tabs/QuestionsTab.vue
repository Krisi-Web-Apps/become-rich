<template>
  <div class="mb-5">
    <div class="flex justify-between items-center mr-5">
      <h2 class="text-xl mb-5">Въпроси</h2>
      <button class="base-button" @click="handleOpen">Нов</button>
    </div>
    <ul class="flex flex-col gap-2">
      <li
        v-for="(item, index) in question.items"
        :key="index"
        class="py-2 px-4 hover:bg-gray-100"
      >
        {{ item.title }}
      </li>
    </ul>
  </div>
</template>

<script>
// stores
import { useEnvStore } from '../../../stores/env';
import { useQuestionStore } from '../../../stores/question';

export default {
  name: "QuestionsTab",
  setup() {
    const question = useQuestionStore();
    const env = useEnvStore();

    question.getItems();

    const functions = {
      handleOpen() {
        question.item = { options: { } }
        env.dialogs.questions.save = true;
      }
    }

    return { question, ...functions }
  }
};
</script>
