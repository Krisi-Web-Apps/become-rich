<template>
  <div class="w-full h-full flex">
    <div
      class="max-md:w-full md:w-8/12 lg:w-9/12 xl:w-10/12 h-full bg-cover bg-center"
      :style="{ backgroundImage: `url(${backgroundUrl})` }"
    >
      <transition-group name="fade">
        <div
          v-if="question.item && question.isStart && question.isEnd === false"
          class="w-full h-full flex flex-col justify-end pb-20"
        >
          <button
            class="fixed top-10 right-10 bg-primary text-white border-2 px-5 py-2 block md:hidden focus:bg-white focus:text-primary transition-all"
            @click="
              env.responsiveViews.moneyBar = !env.responsiveViews.moneyBar
            "
          >
            Списък с пари
          </button>
          <div class="container mx-auto md:px-10">
            <question-timer class="absolute left-10 top-10" />
            <display-question :title="question.item.title" />
            <display-answers :answers="question.item.answers" />
          </div>
        </div>
        <div
          v-else-if="env.screens.theEndTrivia"
          class="w-full h-full flex flex-col justify-center items-center"
        >
          <div
            class="p-5 bg-primary lg:w-3/6 max-w-[600px] flex flex-col justify-center items-center border-4"
          >
            <div class="pb-5">
              <span class="text-white font-bold text-4xl">
                Ти спечели: {{ moneyBar.earnedMoney }} лв.
              </span>
            </div>
            <button
              class="text-white bg-primary py-2 px-5 border hover:bg-white hover:text-primary transition-colors"
              @click="() => question.restartTrivia()"
            >
              Нова игра
            </button>
          </div>
        </div>
      </transition-group>
    </div>
    <div
      class="max-md:fixed max-md:top-32 max-md:right-0 max-md:w-1/2 max-md:transition-all md:w-4/12 lg:w-3/12 xl:w-2/12"
      :class="getMoneyBarClass"
    >
      <money-bar />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

// stores
import { useQuestionStore, useMoneyBarStore } from "../../stores/question";
import { useEnvStore } from "../../stores/env";

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
  computed: {
    getMoneyBarClass() {
      return `${
        this.env.responsiveViews.moneyBar ? "" : "max-md:translate-x-full"
      }`;
    },
  },
  setup() {
    const backgroundUrl = ref(null);
    const env = useEnvStore();
    const question = useQuestionStore();
    const moneyBar = useMoneyBarStore();

    const functions = {
      start(ms = 1000) {
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

    return { env, question, moneyBar, backgroundUrl };
  },
};
</script>
