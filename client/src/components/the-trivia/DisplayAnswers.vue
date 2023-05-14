<template>
  <div class="grid grid-cols-2 gap-5 mt-20 px-20">
    <div
      v-for="(item, index) in props.answers"
      :key="index"
      class="py-2.5 px-5 border-2 border-white text-white bg-primary"
    >
      {{ item.text }}
    </div>
  </div>
</template>

<script>
export default {
  name: "DisplayAnswer",
  props: {
    answers: Array,
  },
  setup(props) {
    return { props };
  },
};
</script>
