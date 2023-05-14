import { defineStore } from "pinia";
import { useEnvStore } from "./env";

export const useQuestionTimerStore = defineStore("questionTimer", {
  state: () => ({
    interval: null,
    seconds: 30,
  }),
  actions: {
    start() {
      this.interval = setInterval(() => {
        if (this.seconds <= 0) {
          const question = useQuestionStore();
          question.end();
        }
        this.seconds--;
      }, 1000);
    },
    stop() {
      clearInterval(this.interval);
    },
    reset() {
      this.seconds = 30;
      this.start();
    },
    end() {
      clearInterval(this.interval);
      this.interval = null;
    },
  },
});

export const useMoneyBarStore = defineStore("moneyBar", {
  state: () => ({
    loading: false,
    earnedMoney: 0,
    items: [
      { id: 1, money: 50 },
      { id: 2, money: 100 },
      { id: 3, money: 150 },
      { id: 4, money: 200 },
      { id: 5, money: 250 },
      { id: 6, money: 500 },
      { id: 7, money: 750 },
      { id: 8, money: 1000 },
      { id: 9, money: 2000 },
      { id: 10, money: 2500 },
      { id: 11, money: 5000 },
      { id: 12, money: 7500 },
      { id: 13, money: 10000 },
      { id: 14, money: 12500 },
      { id: 15, money: 15000 },
      { id: 16, money: 25000 },
      { id: 17, money: 50000 },
      { id: 18, money: 100000 },
    ],
  }),
  getters: {
    getReversedItems: (state) => {
      return state.items.reverse();
    },
  },
  actions: {
    calcMoney(index) {
      this.earnedMoney = this.items.reverse()[index].money;
    },
  },
});

export const useQuestionStore = defineStore("question", {
  state: () => ({
    loading: false,
    currentQuestionIndex: -1,
    isStart: false,
    isEnd: false,
    additionalClass: "",
    selectedAnswerIndex: -1,
    items: [
      {
        title: "Кой е най-големият орган в човешкото тяло?",
        answers: [
          {
            text: "Сърце",
            is_correct: false,
          },
          {
            text: "Мозък",
            is_correct: false,
          },
          {
            text: "Кожа",
            is_correct: true,
          },
          {
            text: "Черен дроб",
            is_correct: false,
          },
        ],
      },
      {
        title: "Коя е най-малката планета в нашата слънчева система?",
        answers: [
          {
            text: "Венера",
            is_correct: false,
          },
          {
            text: "Земя",
            is_correct: false,
          },
          {
            text: "Меркурий",
            is_correct: true,
          },
          {
            text: "Марс",
            is_correct: false,
          },
        ],
      },
      {
        title:
          "Как се нарича процесът, при който растенията превръщат слънчевата светлина, водата и въглеродния диоксид в енергия?",
        answers: [
          {
            text: "Фотосинтеза",
            is_correct: true,
          },
          {
            text: "Дишане",
            is_correct: false,
          },
          {
            text: "Храносмилане",
            is_correct: false,
          },
          {
            text: "Ферментация",
            is_correct: false,
          },
        ],
      },
      {
        title:
          "Кое от следните е вид възобновяема енергия?",
        answers: [
          {
            text: "Въглища",
            is_correct: false,
          },
          {
            text: "Природен газ",
            is_correct: false,
          },
          {
            text: "Слънчева",
            is_correct: true,
          },
          {
            text: "Петрол",
            is_correct: false,
          },
        ],
      },
    ],
    item: {},
  }),
  actions: {
    getNextItem() {
      this.correctAnimation = -1;

      // check if end question
      if (this.currentQuestionIndex + 1 >= this.items.length) {
        this.end();
        return;
      }

      this.currentQuestionIndex++;

      // get next question
      let nextItem = this.items[this.currentQuestionIndex];
      const env = useEnvStore();
      nextItem.answers = env.shuffle(nextItem.answers);
      this.item = nextItem;

      // reset timer
      const timer = useQuestionTimerStore();
      timer.reset();
    },
    start() {
      this.getNextItem();
      this.isStart = true;
    },
    end() {
      this.isEnd = true;
      const timer = useQuestionTimerStore();
      timer.end();
      const env = useEnvStore();
      setTimeout(() => (env.screens.theEndTrivia = true), 1000);
    },
    restartTrivia() {
      const env = useEnvStore();
      const moneyBar = useMoneyBarStore();
      env.screens.theEndTrivia = false;
      moneyBar.earnedMoney = 0;
      this.currentQuestionIndex = -1;
      setTimeout(() => {
        this.isEnd = false;
        env.screens.theTrivia = true;
        this.start();
      }, 1000);
    },
    selectAnswer(index) {
      const timer = useQuestionTimerStore();
      timer.stop();

      this.selectedAnswerIndex = index;
      this.additionalClass = "bg-yellow-500";

      setTimeout(() => {
        if (this.item.answers[index].is_correct === true) this.correctAnswer();
        else this.wrongAnswer();
      }, 1000);
    },
    correctAnswer() {
      const moneyBar = useMoneyBarStore();
      moneyBar.calcMoney(this.currentQuestionIndex);

      this.additionalClass = "correct-answer";
      setTimeout(() => {
        this.getNextItem();
        this.additionalClass = "";
        this.selectedAnswerIndex = -1;
      }, 3000);
    },
    wrongAnswer() {
      this.additionalClass = "wrong-answer";
      setTimeout(() => {
        this.additionalClass = "";
        this.selectedAnswerIndex = -1;
      }, 1000);
      setTimeout(() => this.end(), 2000);
    },
  },
});
