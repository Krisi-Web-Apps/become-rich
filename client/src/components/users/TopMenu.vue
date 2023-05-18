<template>
  <ul class="flex mb-5 border">
    <li v-for="(item, index) in tabs" :key="index">
      <button
        class="py-2 px-4 active:bg-gray-200 hover:bg-gray-100 cursor-pointer"
        :class="`${env.tabs.admin.active === item.key ? 'bg-gray-100' : null}`"
        @click="() => handleOpen(item.key)"
      >
        {{ item.label }}
      </button>
    </li>
  </ul>
</template>

<script>
// stores
import { useEnvStore } from "../../stores/env";

export default {
  name: "TopMenu",
  setup() {
    const env = useEnvStore();

    const functions = {
      handleOpen(key) {
        env.tabs.admin.active = key;
      },
    };

    const tabs = [
      {
        key: "questions",
        label: "Въпроси",
      },
      {
        key: "users",
        label: "Потребители",
      },
    ];

    return { env, tabs, ...functions };
  },
};
</script>
