<template>
  <div class="mt-5 lg:mt-20 px-5 lg:px-20">
    <ul class="grid lg:grid-cols-2 gap-5">
      <li
        v-for="(item, index) in props.answers"
        :key="index"
      >
        <button
          @click="() => selectAnswer(index)"
          :class="
            `${question.selectedAnswerIndex === index && `${question.additionalClass}`}
            ${question.selectedAnswerIndex !== index && 'bg-primary/90 hover:bg-blue-600 active:bg-blue-800'}`
          "
          :disabled="question.selectedAnswerIndex !== -1"
          class="answer-item"
        >
          <span>{{ letters[index] }}. </span>
          {{ item.text }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { useQuestionStore } from "../../stores/question";

export default {
  name: "DisplayAnswer",
  props: {
    answers: Array,
  },
  setup(props) {
    const question = useQuestionStore();
    const letters = {
      0: "A",
      1: "B",
      2: "C",
      3: "D",
    };

    const functions = {
      getSelectedColor(index) {
        return this.question.selectedAnswerIndex === index
          ? "bg-orange-500"
          : "hover:bg-yellow-500";
      },
      getAnswerColor(index) {
        return index === this.correctAnimation ? "correct-answer" : null;
      },
      selectAnswer(index) {
        question.selectAnswer(index);
      },
    };

    return { question, props, letters, ...functions };
  },
};
</script>

<style>
.answer-item {
  @apply w-full border-2 text-left border-white text-white cursor-pointer;
}
.correct-answer {
  @apply bg-green-500;
}
.wrong-answer {
  @apply bg-red-500;
}
</style>
