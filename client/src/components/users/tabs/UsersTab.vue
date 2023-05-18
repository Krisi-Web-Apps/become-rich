<template>
  <div class="mb-5">
    <h2 class="text-xl mb-5">Потребители</h2>
    <ul class="flex flex-col gap-2">
      <li
        v-for="(item, index) in user.items"
        :key="index"
        class="py-2 px-4 hover:bg-gray-100"
      >
        {{ item.email }}
      </li>
    </ul>
  </div>
</template>

<script>
// stores
import { useUserStore } from "../../../stores/user";

export default {
  name: "UsersTab",
  setup() {
    const user = useUserStore();

    user.getItems();

    return { user };
  },
};
</script>
