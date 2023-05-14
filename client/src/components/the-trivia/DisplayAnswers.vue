<template>
  <div class="grid md:grid-cols-2 gap-5 mt-5 md:mt-20 px-5 md:px-20">
    <button
      v-for="(item, index) in props.answers"
      :key="index"
      class="py-2.5 px-5 border-2 text-left border-white text-white bg-primary/90 transition-colors"
      :class="
        question.selectedAnswerIndex === index ? question.additionalClass : null
      "
      :disabled="question.selectedAnswerIndex !== -1"
      @click="() => selectAnswer(index)"
    >
      <div>
        <span>{{ letters[index] }}. </span>
        {{ item.text }}
      </div>
    </button>
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
@keyframes correctAnimation {
  0% {
    background-color: #00ff4c;
  }
  20% {
    background-color: #0f0ff0;
  }
  40% {
    background-color: #00ff4c;
  }
  60% {
    background-color: #0f0ff0;
  }
  80% {
    background-color: #00ff4c;
  }
  100% {
    background-color: #0f0ff0;
  }
}
.correct-answer {
  animation: correctAnimation 1000ms ease;
}
.wrong-answer {
  background-color: #ff0000;
}
</style>
