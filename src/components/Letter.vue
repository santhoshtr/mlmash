<template>
  <section class="letter" ref="root">

    <div class="actions">
      <button @click="animate">✍️ Write</button>
      <audio
        controls
        :src="audioSrc"
        :ref="audioSrc"
        v-if="audioSrc"
        :id="`player-${letter}`"
      ></audio>
    </div>
    <div class="examples">
      <h3>Examples</h3>
      <div class="example" v-for="example in examples" :key="example">
        {{ example }}
      </div>
    </div>
    <div class="letter-container">
      <div class="letter-svg-background" v-html="letterSVG" />
      <div class="letter-svg" v-html="letterSVG" />
    </div>
    <div class="letter-arrow-container">
      {{letter}}
    </div>

    </section>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch, PropType, Ref } from "vue";
import { animateLetter } from "../animateLetter";

interface Lesson {
  pronunciation?: string;
  examples?: Array<string>;
}

const props = defineProps({
  letter: {
    type: String,
    default: "",
  },
  lesson: Object as PropType<Lesson>,
});


const root: Ref = ref(null);
const letterSVG = ref("");
const audioSrc = computed(() => props.lesson?.pronunciation);
const examples = computed(() => props.lesson?.examples);
const letterElement = computed(() => root?.value?.querySelector(".letter-svg"));

const animate = () =>
  setTimeout(() => {
    animateLetter(
      letterElement.value
    );
  }, 100);
const getSVG = (letter: string) => {
  return fetch(`/svgs/${letter}.svg`).then((response) => response.text());
};
onMounted(() => {
  getSVG(props.letter).then((svg) => {
    letterSVG.value = svg;
    animate();
  });
});
watch(
  () => props.letter,
  (letter) => {
    getSVG(letter).then((svg) => {
      letterSVG.value = svg;
      animate();
    });
  }
);
</script>
<style lang="less">

.letter-svg {
  svg {
    height: 100%;
    max-height: 100%;
    max-width: 100%;
  }
}
.letter-container {
  display: grid;
  grid-template-rows: auto;
  position: relative;
  height: 65vh;

  .letter-svg-background {
    path{
      fill: none !important;
      fill-rule: evenodd !important;
      stroke: rgb(0, 45, 56) !important;
      stroke-width: 50 !important;
      stroke-linecap: round !important;
      stroke-linejoin: round !important;
      stroke-miterlimit: 4 !important;
      stroke-dasharray: none !important;
      stroke-opacity: 1 !important;
    }
  }
  .letter-svg {
    path {
      stroke-width: 8px !important;
      stroke: #00a7d0 !important;
    }
  }
  .letter-svg-background,
  .letter-svg {
    position: absolute;
    top: 0;
    left: 0;
    height: 100% !important;
    width: 100%;
    svg {
      height: 100% !important;
      width: 100%;
    }

  }
}
.actions {
  display: flex;
  align-items: center;
  margin: 1em 0;
  h1 {
    height: 1.4em;
    line-height: 1.4;
    margin: 0;
  }
  button {
    background-color: var(--primary-color);
    color: white;
    font-weight: 800;
    padding: 0 8px;
    margin: 0 8px;
    border: 1px solid var(--primary-color);
    height: 2.4em;
  }
  button:first-child {
    margin-left: 0;
  }
  audio {
    width: 200px;
    height: 2.4em;
  }
}

.examples {
  display: flex;
  flex-direction: column;
  h3 {
    margin: 0;
  }
  .example {
    font-size: 1em;
    padding: 4px;
  }
}

.letter-arrow-container {
  font-family: 'Nupuram Arrows Color', sans-serif;
  font-size: 60vw;
  text-align: center;
}

@media (max-width: 1024px) {
  .letter-container {
    transform: scale(1);
    transform-origin: 0% 0% 0px;
  }
}

@media (max-width: 768px) {
  .letter-container {
    transform: scale(0.8);
    transform-origin: 0% 0% 0px;
  }
}

@media (max-width: 480px) {
  .letter-container {
    height: 30vh;
    transform: scale(0.5);
    transform-origin: 0% 0% 0px;
  }
}
</style>
