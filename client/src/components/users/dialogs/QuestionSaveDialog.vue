<template>
  <form @submit.prevent="handleSubmit">
    <base-dialog>
      <template v-slot:header>Вхов</template>
      <template v-slot:body>
        <div class="h-[400px] overflow-y-scroll">
          <div class="mb-5">
            <label for="title">Залавие</label>
            <input
              type="text"
              v-model="question.item.title"
              id="title"
              class="base-input"
            />
          </div>
          <div class="mb-5">
            <label for="fact">Интересен Факт</label>
            <textarea
              v-model="question.item.options.fact"
              id="fact"
              class="base-input"
            ></textarea>
          </div>
          <div
            class="mb-5"
            v-for="(item, index) in question.item.options.answers"
            :key="index"
          >
            <div class="mb-5">
              <hr class="border-2 mb-5" v-if="index !== 0" />
              <label :for="`answer_${index + 1}_text`">
                Отговор {{ index + 1 }}
              </label>
              <input
                type="text"
                v-model="item.text"
                :id="`answer_${index + 1}_text`"
                class="base-input"
              />
            </div>
            <div class="mb-5">
              <input
                type="checkbox"
                v-model="item.is_correct"
                :id="`answer_${index + 1}_is_correct`"
                class="mr-2"
              />
              <label :for="`answer_${index + 1}_is_correct`">
                {{ item.is_correct ? "Верен Отговор" : "Грешен Отговор" }}
              </label>
            </div>
          </div>
          <div class="mb-5">
            <label for="category">Категория</label>
            <input
              type="text"
              v-model="question.item.category"
              id="category"
              class="base-input"
            />
          </div>
          <div class="mb-5">
            <label for="difficulty">Трудност</label>
            <select
              v-model="question.item.difficulty"
              id="difficulty"
              class="base-input"
            >
              <option value="easy" selected>Лесно</option>
              <option value="medium">Средно</option>
              <option value="hard">Трудно</option>
            </select>
          </div>
        </div>
      </template>
      <template v-slot:bottom>
        <div class="flex gap-2">
          <button
            class="base-button text-green-500 border-green-500"
            :disabled="question.loading"
          >
            Потвърди
          </button>
          <button
            type="button"
            class="base-button text-red-500 border-red-500"
            :disabled="question.loading"
            @click="handleCancel"
          >
            Отакз
          </button>
        </div>
      </template>
    </base-dialog>
  </form>
</template>

<script>
// stores
import { useEnvStore } from "../../../stores/env";
import { useQuestionStore } from "../../../stores/question";

// components
import BaseDialog from "../../dialogs/BaseDialog.vue";

export default {
  name: "QuestionSaveDialog",
  components: {
    BaseDialog,
  },
  setup() {
    const question = useQuestionStore();
    const env = useEnvStore();

    if (!question.item.id) question.item.options.answers = [{}, {}, {}, {}];

    const functions = {
      handleSubmit() {
        question.saveItem();
      },
      handleCancel() {
        env.dialogs.questions.save = false;
      },
    };

    return { question, ...functions };
  },
};
</script>
