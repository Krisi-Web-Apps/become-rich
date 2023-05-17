<template>
  <div class="fixed top-0 left-0 z-40 bg-black/20 w-full h-screen flex justify-center items-center">
    <div class="md:w-4/5 lg:w-3/5 xl:w-2/5 max-md:mx-5 w-full bg-white border rounded shadow-xl p-5">
      <h2 class="text-2xl mb-5"><slot name="header"></slot></h2>
      <slot name="body"></slot>
      <slot name="bottom"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseDialog",
};
</script>
