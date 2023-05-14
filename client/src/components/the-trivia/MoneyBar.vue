<template>
  <div class="bg-primary/90 w-full h-full py-2 border-2 shadow border-primary">
    <ul class="flex flex-col gap-2">
      <li
        v-for="(item, index) in moneyBar.getReversedItems"
        :key="index"
        class="py-1 px-4 flex gap-5 shadow transition-all"
        :class="
          question.currentQuestionIndex ===
          Math.abs(index - moneyBar.items.length + 1)
            ? 'bg-white text-primary font-bold'
            : 'text-white bg-primary'
        "
      >
        <div class="w-10">{{ item.id }}</div>
        <div>{{ item.money.toLocaleString("en-US") }} лв.</div>
      </li>
    </ul>
  </div>
</template>

<script>
import { useQuestionStore, useMoneyBarStore } from "../../stores/question";

export default {
  name: "MoneyBar",
  setup() {
    const moneyBar = useMoneyBarStore();
    const question = useQuestionStore();

    return { question, moneyBar };
  },
};
</script>
