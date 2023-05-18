import { defineStore } from "pinia";
import { useEnvStore } from "./env";
import api from "../boot/axios";

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
      { id: 1, money: 100 },
      { id: 2, money: 200 },
      { id: 3, money: 300 },
      { id: 4, money: 500 },
      { id: 5, money: 1000 },
      { id: 6, money: 2000 },
      { id: 7, money: 4000 },
      { id: 8, money: 8000 },
      { id: 9, money: 16000 },
      { id: 10, money: 32000 },
      { id: 11, money: 64000 },
      { id: 12, money: 125000 },
      { id: 13, money: 250000 },
      { id: 14, money: 500000 },
      { id: 15, money: 1000000 },
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
    showTheFact: false,
    additionalClass: "",
    selectedAnswerIndex: -1,
    url: "/questions",
    offset: 0,
    limit: 10,
    items: [],
    item: {},
  }),
  actions: {
    getRandomItems(cb) {
      this.loading = true;
      api.get(`${this.url}/random`)
        .then(res => {
          this.items = res.data;
          cb();
        })
        .catch(err => {
          if (err.response.data.message === "The limit must be a number!") {
            console.log("Невалидно подадени данни.");
          }
        })
        .finally(() => this.loading = false);
    },
    getItems() {
      this.loading = true;
      api.get(`${this.url}/all?limit=${this.limit}&offset=${this.offset}`)
        .then(res => {
          this.items = res.data;
        })
        .catch(err => {
          if (err.response.data.message === "The limit must be a number!") {
            console.log("Невалидно подадени данни.");
          }
        })
        .finally(() => this.loading = false);
    },
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
      nextItem.answers = env.shuffle(nextItem.options.answers);
      this.item = nextItem;

      // reset timer
      const timer = useQuestionTimerStore();
      timer.reset();
    },
    start() {
      this.getRandomItems(() => {
        this.getNextItem();
        this.isStart = true;
      });
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
        this.showTheFact = true;
        this.additionalClass = "";
        this.selectedAnswerIndex = -1;
      }, 1000);
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
