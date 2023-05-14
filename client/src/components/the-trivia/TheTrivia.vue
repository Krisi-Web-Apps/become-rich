<template>
  <div class="w-full h-full flex">
    <div
      class="w-9/12 h-full bg-cover"
      :style="{ backgroundImage: `url(${backgroundUrl})` }"
    >
    <transition name="fade">
      <div
        v-if="question.item && question.isStart"
        class="w-full h-full flex flex-col justify-end pb-20"
      >
        <div class="container mx-auto px-10">
          <display-question :title="question.item.title" />
          <display-answers :answers="question.item.answers" />
        </div>
      </div>
    </transition>
    </div>
    <div class="w-3/12">Money bar</div>
  </div>
</template>

<script>
import { ref } from "vue";

// stores
import { useQuestionStore } from "../../stores/question";

// background images
import backgroundUrl1 from "../../assets/backgrounds/background-1.jpg";
import backgroundUrl2 from "../../assets/backgrounds/background-2.png";

const backgrounds = [backgroundUrl1, backgroundUrl2];

// components
import DisplayQuestion from "./DisplayQuestion.vue";
import DisplayAnswers from "./DisplayAnswers.vue";

export default {
  name: "TheTrivia",
  components: {
    DisplayQuestion,
    DisplayAnswers,
  },
  setup() {
    const backgroundUrl = ref(null);
    const question = useQuestionStore();

    const functions = {
      start(ms) {
        setTimeout(() => {
          question.start();
        }, ms);
      },
      getRandomImageUrl() {
        const randomIndex = Math.ceil(Math.random() * backgrounds.length) - 1;
        backgroundUrl.value = backgrounds[randomIndex];
      },
    };

    functions.getRandomImageUrl();

    functions.start(1000);

    return { question, backgroundUrl };
  },
};
</script>

<style>
.the-questions {
  @apply bg-cover;
}
</style>
