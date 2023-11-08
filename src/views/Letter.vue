<template>
  <section class="card col-start-2@lg col-3@lg col-12">
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
  </section>
  <div class="content card col-start-5@lg col-7@lg col-12" ref="root">
    <letter :id="letter" :letter="letter" :lesson="lesson" />
  </div>
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
