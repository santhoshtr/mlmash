<template>
  <div class="content" ref="root">
    <letter :id="letter" :letter="letter" :lesson="lesson" />
  </div>
</template>

<script>
import Letter from "@/components/Letter.vue";
import malayalam from "../assets/malayalam.json";
import { computed } from "vue";
import { defineComponent } from "vue";

export default defineComponent({
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
});
</script>
