<template>
  <div class="mb-5">
    <div class="flex justify-between items-center mr-5">
      <h2 class="text-xl mb-5">Въпроси</h2>
      <button class="base-button" @click="handleOpen">Нов</button>
    </div>
    <ul v-if="question.items.length > 0" class="flex flex-col gap-2">
      <li
        v-for="(item, index) in question.items"
        :key="index"
        class="py-2 px-4 hover:bg-gray-100"
      >
        <div class="flex justify-between">
          <p>{{ item.title }}</p>
          <button
            @click="() => options(index)"
            @focusout="() => handleCloseOptions()"
            class="relative"
          >
            Опции
            <transition name="fade">
              <ul
                class="bg-white border py-2 px-4 absolute top-10 right-0 z-40"
                v-if="optionsIndex == index"
              >
                <li
                  class="py-2 px-4 hover:bg-gray-200 cursor-pointer text-left"
                >
                  <button @click="() => handleEdit(item.id)">
                    Редактиране
                  </button>
                </li>
                <li
                  class="py-2 px-4 hover:bg-gray-200 cursor-pointer text-left text-red-500"
                >
                  <button @click="() => handleDelete(item.id)">
                    Изтриване
                  </button>
                </li>
              </ul>
            </transition>
          </button>
        </div>
      </li>
    </ul>
    <div v-else>Няма създадени въпроси</div>
  </div>
</template>

<script>
// stores
import { ref } from "vue";
import { useEnvStore } from "../../../stores/env";
import { useQuestionStore } from "../../../stores/question";

export default {
  name: "QuestionsTab",
  setup() {
    const question = useQuestionStore();
    const env = useEnvStore();
    const optionsIndex = ref();

    question.getItems();

    const functions = {
      handleOpen() {
        question.item = { options: {}, difficulty: "easy" };
        env.dialogs.questions.save = true;
      },
      handleEdit(id) {
        question.item.id = id;
        question.getItem(() => {
          env.dialogs.questions.save = true;
        });
      },
      handleDelete(id) {
        question.item.id = id;
        question.deleteItem();
      },
      handleCloseOptions() {
        setTimeout(() => (optionsIndex.value = null), 500);
      },
      options(index) {
        optionsIndex.value = index;
      },
    };

    return { question, ...functions, optionsIndex };
  },
};
</script>
