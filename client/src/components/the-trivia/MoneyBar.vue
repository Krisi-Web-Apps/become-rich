<template>
  <div class="bg-primary/95 w-full h-full py-2 border-2 shadow border-primary">
    <ul class="flex flex-col gap-1">
      <li
        v-for="(item, index) in moneyBar.getReversedItems"
        :key="index"
        class="text-white bg-primary py-1 px-4"
        :class="
          question.currentQuestionIndex ===
          Math.abs(index - moneyBar.items.length + 1)
            ? 'bg-white text-primary font-bold'
            : null
        "
      >
        <span>{{ item.money.toLocaleString("en-US") }} лв.</span>
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
