<template>
  <div class="content">
    <h1>{{ letter }}</h1>
    <letter :letter="letter"/>
  </div>
</template>

<script>
import Letter from "@/components/Letter.vue";

export default {
  name: "Home",
  components: {
    Letter,
  },
   props: ["letter"],
};
</script>
