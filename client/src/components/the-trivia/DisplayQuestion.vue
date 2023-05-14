<template>
  <div>
    <div
      class="relative w-full h-[105px] bg-primary/90 border-4 shadow border-white md:py-4 md:px-20 px-4 flex items-center"
    >
      <div
        class="absolute top-0 right-0 md:border-t-[50px] border-t-transparent md:border-r-[60px] border-r-white md:border-b-[50px] border-b-transparent"
      ></div>
      <h2 class="text-white md:text-xl">{{ props.title }}</h2>
      <div
        class="absolute top-0 left-0 md:border-t-[50px] border-t-transparent md:border-l-[60px] border-r-white md:border-b-[50px] border-b-transparent"
      ></div>
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
