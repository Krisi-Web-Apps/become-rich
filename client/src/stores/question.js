import { defineStore } from "pinia";

export const useQuestionTimerStore = defineStore("questionTimer", {
  state: () => ({
    interval: null,
    seconds: 30,
  }),
  actions: {
    start() {
      this.interval = setInterval(() => this.seconds--, 1000);
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
      { money: 50 },
      { money: 100 },
      { money: 150 },
      { money: 200 },
      { money: 250 },
      { money: 500 },
      { money: 750 },
      { money: 1000 },
      { money: 2000 },
      { money: 2500 },
      { money: 5000 },
      { money: 7500 },
      { money: 10000 },
      { money: 12500 },
      { money: 15000 },
      { money: 25000 },
      { money: 50000 },
      { money: 100000 },
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
    }
  }
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
    ],
    item: {},
  }),
  actions: {
    getNextItem() {
      this.correctAnimation = -1;
      if (this.currentQuestionIndex + 1 >= this.items.length) {
        this.end();
        return;
      }
      this.currentQuestionIndex++;
      this.item = this.items[this.currentQuestionIndex];

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
      const moneyBar = useMoneyBarStore();
      moneyBar.calcMoney();
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
      setTimeout(() => (this.additionalClass = ""), 1000);
      setTimeout(() => this.end(), 2000);
    },
  },
});
