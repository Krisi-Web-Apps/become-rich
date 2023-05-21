<template>
  <form @submit.prevent="handleSubmit">
    <base-dialog>
      <template v-slot:header>
        {{ question.item.id ? "Редактиране на въпрос" : "Нов въпрос" }}
      </template>
      <template v-slot:body>
        <div class="h-[400px] overflow-y-scroll pr-5">
          <div class="mb-5">
            <label for="title">Заглавие</label>
            <input type="text" v-model="question.item.title" id="title" class="base-input" />
          </div>
          <div class="mb-5">
            <label for="fact">Интересен Факт</label>
            <ckeditor :editor="editor" v-model="question.item.options.fact" :config="editorConfig"></ckeditor>
          </div>
          <div class="mb-5" v-for="(item, index) in question.item.options.answers" :key="index">
            <div class="mb-5">
              <hr class="border-2 mb-5" v-if="index !== 0" />
              <label :for="`answer_${index + 1}_text`">
                Отговор {{ index + 1 }}
              </label>
              <input type="text" v-model="item.text" :id="`answer_${index + 1}_text`" class="base-input" />
            </div>
            <div class="mb-5">
              <input type="checkbox" v-model="item.is_correct" :id="`answer_${index + 1}_is_correct`" class="mr-2" />
              <label :for="`answer_${index + 1}_is_correct`">
                {{ item.is_correct ? "Верен Отговор" : "Грешен Отговор" }}
              </label>
            </div>
          </div>
          <div class="mb-5">
            <label for="category">Категория</label>
            <input type="text" v-model="question.item.category" id="category" class="base-input" />
          </div>
          <div class="mb-5">
            <label for="difficulty">Трудност</label>
            <select v-model="question.item.difficulty" id="difficulty" class="base-input">
              <option value="easy">Лесно</option>
              <option value="medium">Средно</option>
              <option value="hard">Трудно</option>
            </select>
          </div>
        </div>
      </template>
      <template v-slot:bottom>
        <div class="flex gap-2">
          <button class="base-button text-green-500 border-green-500" :disabled="question.loading" @click="handleSubmit">
            Потвърди
          </button>
          <button type="button" class="base-button text-red-500 border-red-500" :disabled="question.loading"
            @click="handleCancel">
            Отакз
          </button>
        </div>
      </template>
    </base-dialog>
  </form>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

// stores
import { useEnvStore } from "../../../stores/env";
import { useQuestionStore } from "../../../stores/question";

// components
import BaseDialog from "../../dialogs/BaseDialog.vue";
import question from "../../../stores/question/question";

export default {
  name: "QuestionSaveDialog",
  components: {
    BaseDialog,
    ClassicEditor,
  },
  setup() {
    const question = useQuestionStore();
    const env = useEnvStore();

    const functions = {
      setupAnswersArray() {
        question.item.options.answers = [];
        for (let i = 0; i < 4; i++) {
          question.item.options.answers.push({
            text: "",
            is_correct: false,
          });
        }
      },
      handleSubmit() {
        question.saveItem();
      },
      handleCancel() {
        env.dialogs.questions.save = false;
      },
    };

    if (!question.item.id) functions.setupAnswersArray();

    return {
      question,
      ...functions,
      editor: ClassicEditor,
      editorConfig: {
        plugins: ["Essentials", "Bold", "Italic", "Link", "Paragraph"],
        toolbar: {
          items: ["bold", "italic", "link", "undo", "redo"],
        },
      },
    };
  },
};
</script>

<style>
.ck.ck-editor__main, .ck.ck-content.ck-editor__editable.ck-rounded-corners {
  height: 400px;
}
</style>
