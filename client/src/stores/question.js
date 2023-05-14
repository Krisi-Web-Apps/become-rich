import { defineStore } from "pinia";

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
    },
    start() {
      this.getNextItem();
      this.isStart = true;
    },
    end() {
      this.isEnd = true;
    },
    selectAnswer(index) {
      this.selectedAnswerIndex = index;
      this.additionalClass = "bg-yellow-500";

      setTimeout(() => {
        if (this.item.answers[index].is_correct === true) this.correctAnswer();
        else this.wrongAnswer();
      }, 1000);
    },
    correctAnswer() {
      this.additionalClass = "correct-answer";
      setTimeout(() => {
        this.getNextItem();
        this.additionalClass = "";
        this.selectedAnswerIndex = -1;
      }, 3000);
    },
    wrongAnswer() {
      this.additionalClass = "wrong-answer";
      setTimeout(() => this.additionalClass = "", 1000);
      setTimeout(() => this.end(), 2000);
    },
  },
});
