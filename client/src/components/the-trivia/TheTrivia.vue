<template>
  <div class="w-full h-full flex">
    <div
      class="w-9/12 h-full bg-cover"
      :style="{ backgroundImage: `url(${backgroundUrl})` }"
    >
      <transition-group name="fade">
        <div
          v-if="question.item && question.isStart && question.isEnd === false"
          class="w-full h-full flex flex-col justify-end pb-20"
        >
          <div class="container mx-auto px-10">
            <question-timer class="absolute left-10 top-10" />
            <display-question :title="question.item.title" />
            <display-answers :answers="question.item.answers" />
          </div>
        </div>
        <div
          v-else-if="question.isStart === true && question.isEnd === true"
          class="w-full h-full"
        >
          <div class="w-full h-full flex justify-center items-center">
            <div
              class="bg-primary py-5 px-5 border-4 text-white font-bold text-4xl"
            >
              Ти спечели: {{ moneyBar.earnedMoney }} лв.
            </div>
          </div>
        </div>
      </transition-group>
    </div>
    <div class="w-3/12">
      <money-bar />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

// stores
import { useQuestionStore, useMoneyBarStore } from "../../stores/question";

// background images
import backgroundUrl1 from "../../assets/backgrounds/background-1.jpg";
import backgroundUrl2 from "../../assets/backgrounds/background-2.png";

const backgrounds = [backgroundUrl1, backgroundUrl2];

// components
import DisplayQuestion from "./DisplayQuestion.vue";
import DisplayAnswers from "./DisplayAnswers.vue";
import QuestionTimer from "./QuestionTimer.vue";
import MoneyBar from "./MoneyBar.vue";

export default {
  name: "TheTrivia",
  components: {
    DisplayQuestion,
    DisplayAnswers,
    QuestionTimer,
    MoneyBar,
  },
  setup() {
    const backgroundUrl = ref(null);
    const question = useQuestionStore();
    const moneyBar = useMoneyBarStore();

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

    return { question, moneyBar, backgroundUrl };
  },
};
</script>
