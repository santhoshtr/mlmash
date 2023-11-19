
<template>

<nav class="letter-nav grid">
    <template v-for="letter in letters" :key="letter">
      <router-link class="letter-link col-2" :to="`/letter/${letter}`">{{
        letter
      }}</router-link>
    </template>
  </nav>
  <nav class="letter-nav">
    <span v-for="conjunct in conjunctsForLetter" :key="conjunct">
      <router-link class="letter-link col-2" :to="`/conjunct/${conjunct}`">{{
        conjunct
      }}</router-link>
    </span>
  </nav>
</template>

<script setup>
import Letter from "@/components/Letter.vue";
import malayalam from "../assets/malayalam.json";
import { computed } from "vue";
const letters = malayalam.letters;
const conjuncts = malayalam.conjuncts;

const props = defineProps({
  letter: {
    type: String,
    default: "അ",
  },
});

const conjunctsForLetter = computed(() =>
  conjuncts.filter((c) => c.indexOf(props.letter) == 0)
);

const lesson = computed(() => malayalam.lessons[props.letter]);
</script>
