<template>
  <div>
    <div
      class="timer-class"
    >
      {{ questionTimer.seconds }}
    </div>
  </div>
</template>

<script>
import { useQuestionTimerStore } from "../../stores/question";

export default {
  name: "QuestionTimer",
  setup() {
    const questionTimer = useQuestionTimerStore();
    return { questionTimer };
  },
};
</script>

<style>
.timer-class {
    @apply text-2xl font-bold text-white py-5 px-5 border-4 border-white bg-primary/60;
}
</style>
