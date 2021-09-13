<template>
  <div class="content" ref="root">
    <letter :id="letter" :letter="letter" :lesson="lesson" />
  </div>
</template>

<script setup>
import Letter from "@/components/Letter.vue";
import malayalam from "../assets/malayalam.json";
import { computed } from "vue";

const props = defineProps( {
  letter: String
});

const lesson = computed(() => malayalam.lessons[props.letter]);

</script>
