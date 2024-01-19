<template>
  <section class="card letter-nav-container col-start-2@lg col-3@lg col-12  ">
    <letter-nav :letter="letter"/>
  </section>
  <div class="content card col-start-5@lg col-7@lg col-12" ref="root">
    <letter :id="letter" :letter="letter" :lesson="lesson" />
  </div>
</template>

<script setup>
import Letter from "@/components/Letter.vue";
import LetterNav from "@/components/LetterNav.vue";
import malayalam from "../assets/malayalam.json";
import { computed,onMounted,watch } from "vue";


const props = defineProps({
  letter: {
    type: String,
    default: "റ",
  },
});


const init = ( ) => {
  document.body.classList.remove('nav-open')
};

onMounted(() => init( ));

watch(
  () => props.letter,
  ( ) => init( )
);


const lesson = computed(() => malayalam.lessons[props.letter]);
</script>

<style>
.nav-open div.content{
  display: none;
}

.nav-open .letter-nav-container {
  display: grid;
}

</style>
