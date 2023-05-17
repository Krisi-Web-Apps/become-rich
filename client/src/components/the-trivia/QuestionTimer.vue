<template>
  <div>
    <div
      class="timer-class"
      :class="outOfTimeClass"
    >
      {{ questionTimer.seconds }}
    </div>
  </div>
</template>

<script>
import { useQuestionTimerStore } from "../../stores/question";

export default {
  name: "QuestionTimer",
  computed: {
    outOfTimeClass() {
      return `${this.questionTimer.seconds < 10 ? 'out-of-time-class' : ''}`;
    }
  },
  setup() {
    const questionTimer = useQuestionTimerStore();
    return { questionTimer };
  },
};
</script>

<style>
.timer-class {
    @apply text-2xl font-bold text-white w-20 h-20 flex justify-center items-center border-4 bg-primary/60;
}
.out-of-time-class {
  animation: outOfTimeAnim 1000ms ease infinite;
}
@keyframes outOfTimeAnim {
  0% {
    border-color: white;
  }
  50% {
    border-color: red;
  }
  100% {
    border-color: white;
  }
}
</style>
