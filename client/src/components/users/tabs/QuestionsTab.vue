<template>
  <div class="mb-5">
    <h2 class="text-xl mb-5">Въпроси</h2>
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
import { useQuestionStore } from '../../../stores/question';

export default {
  name: "QuestionsTab",
  setup() {
    const question = useQuestionStore();

    question.getItems();

    return { question }
  }
};
</script>
