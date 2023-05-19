import { defineStore } from "pinia";

export const useEnvStore = defineStore("env", {
  state: () => ({
    screens: {
      start: false,
      theTrivia: false,
      theEndTrivia: false,
    },
    trivia: {
      showQuestions: false,
      showTheEnd: false,
      isStarted: false,
      showTheWindow: false,
    },
    tabs: {
      admin: {
        active: "questions",
      }
    },
    dialogs: {
      auth: {
        register: false,
        login: false,
      },
      users: {
        profile: false,
        administration: false,
      },
      questions: {
        save: false,
      }
    },
    responsiveViews: {
      moneyBar: false,
    },
  }),
  actions: {
    shuffle(array) {
      let currentIndex = array.length;
      let randomIndex = array.length;

      // While there remain elements to shuffle.
      while (currentIndex != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex],
          array[currentIndex],
        ];
      }

      return array;
    },
  },
});
