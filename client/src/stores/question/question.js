import { defineStore } from "pinia";

// stores
import { useEnvStore } from "../env";
import { useUserStore } from "../user";
import { useQuestionTimerStore, useMoneyBarStore } from "./";

import api from "../../boot/axios";
import { app } from "../../main";

export default defineStore("question", {
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
          app.$toast.error("Сървърна грешка!");
          this.end();
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
      // check if end question
      if (this.currentQuestionIndex + 1 >= this.items.length) {
        this.end();
        return;
      }

      this.correctAnimation = -1;
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
      const env = useEnvStore();
      env.trivia.isStarted = true;
      setTimeout(() => {
        env.trivia.showQuestions = true;
        this.getRandomItems(() => {
          this.getNextItem();
          app.$toast.success("Играта започна!");
        });
      }, 1000);
    },
    end() {
      const env = useEnvStore();
      env.trivia.isStarted = false;
      const timer = useQuestionTimerStore();
      timer.end();
      setTimeout(() => (env.trivia.showQuestions = false), 1000);
      setTimeout(() => (env.trivia.showTheEnd = true), 2000);
      app.$toast.success("Играта свърши!");
    },
    restartTrivia() {
      const env = useEnvStore();
      const moneyBar = useMoneyBarStore();
      env.trivia.showTheEnd = false;
      this.additionalClass = "";
      this.selectedAnswerIndex = -1;
      moneyBar.earnedMoney = 0;
      this.currentQuestionIndex = -1;
      env.trivia.showTheEnd = false;
      this.start();
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
        if (this.item.options.fact) this.showTheFact = true;
        else this.getNextItem();
        this.additionalClass = "";
        this.selectedAnswerIndex = -1;
      }, 1000);
    },
    wrongAnswer() {
      this.additionalClass = "wrong-answer";
      setTimeout(() => {
        this.end();
      }, 2000);
    },
    saveItem() {
      this.loading = true;
      api.post(`${this.url}/admin`, this.item)
        .then(res => {
          this.item = res.data;
          app.$toast.success("Промените са запазени.");
          const env = useEnvStore();
          env.dialogs.questions.save = false;
        })
        .catch(err => {
          if (err.response.data.message === "The id must be a number!")
            app.$toast.error("Идентификатора трябва да бъде число.");
          if (err.response.data.message === "Invalid id.")
            app.$toast.error("Невалиден идентификатор.");
        })
        .finally(() => this.loading = false);
    },
    getItem(cb) {
      this.loading = true;
      api.get(`${this.url}/${this.item.id}`)
        .then(res => {
          this.item = res.data;
          this.getItems();
          cb();
        })
        .catch(err => {
          if (err.response.data.message === "The id can not be null!")
            app.$toast.error("Id не може да бъде null.");
          if (err.response.data.message === "The id must be a number!")
            app.$toast.error("Id трябва да бъде число.");
          if (err.response.data.message === "Invalid id!")
            app.$toast.error("Невалидно id.");
          if (err.response.data.message === "Invalid token.") {
            app.$toast.error("Изтекла сесия.");
            const user = useUserStore();
            user.logout();
          }
        })
        .finally(() => this.loading = false);
    }
  },
});
