<template>
  <div class="content">
    <letter :id="letter" :letter="letter" :lesson="lesson" />
  </div>
</template>

<script>
import Letter from "@/components/Letter.vue";
import malayalam from "../assets/malayalam.json";
import { computed } from "vue";

export default {
  name: "Home",
  components: {
    Letter,
  },
  setup(props) {
    const lesson = computed(() => malayalam.lessons[props.letter]);
    return { lesson };
  },
  props: {
    letter: String
  },
};
</script>
