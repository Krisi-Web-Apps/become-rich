<template>
  <div>
    <div class="display-question">
      <div class="left-arrow max-lg:hidden"></div>
      <h2 class="text-white lg:text-xl">{{ props.title }}</h2>
      <div class="right-arrow max-lg:hidden"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DisplayQuestion",
  props: {
    title: String,
  },
  setup(props) {
    return { props };
  },
};
</script>

<style>
.display-question {
  @apply relative w-full h-[85px] lg:py-4 lg:px-20 px-4 bg-primary/90 border-4 shadow border-white flex items-center;
}
.left-arrow {
  @apply absolute top-0 right-0 md:border-t-[40px] border-t-transparent md:border-r-[60px] border-r-white md:border-b-[40px] border-b-transparent;
}
.right-arrow {
  @apply absolute top-0 left-0 md:border-t-[40px] border-t-transparent md:border-l-[60px] border-r-white md:border-b-[40px] border-b-transparent;
}
</style>
