import { defineStore } from "pinia";

import { useQuestionStore } from "./";

export default defineStore("questionTimer", {
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
