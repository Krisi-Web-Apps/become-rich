<template>
  <div class="w-full h-full bg-primary/90 overflow-y-scroll">
    <div class="w-full h-full py-2 border-2 shadow border-primary">
      <ul class="flex flex-col gap-2">
        <li
          v-for="(item, index) in moneyBar.getReversedItems"
          :key="index"
          class="transition-all"
          :class="
            question.currentQuestionIndex ===
            Math.abs(index - moneyBar.items.length + 1)
              ? 'bg-white text-primary font-bold'
              : `text-white ${index % 5 === 0 ? 'bg-white/20' : 'bg-primary'}`
          "
        >
          <div class="py-1 px-4 shadow flex gap-5">
            <div class="w-10">{{ item.id }}</div>
            <div>{{ item.money.toLocaleString("en-US") }} лв.</div>
          </div>
        </li>
      </ul>
    </div>
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
