<template>
  <section class="letter" ref="root">
    <section class="sidebar col-6@lg col-12">
      <div class="toolbar grid">
        <button @click="animate" class="button col-2">
          <span class="material-symbols-outlined">stylus_note</span>
        </button>
        <button @click="arrows" class="button col-2">
          <span class="material-symbols-outlined">step</span>
        </button>
        <button @click="dots" class="button col-2">
          <span class="material-symbols-outlined">page_control</span>
        </button>
        <button @click="playSound" class="button col-2">
          <span class="material-symbols-outlined">record_voice_over</span>
        </button>
        <button @click="clearCanvas" class="button col-2" v-if="viewmode === 'dots' || viewmode === 'arrows'"> <span class="material-symbols-outlined" >clear</span></button>
      </div>
    </section>
    <section class="letter-svg col-12 grid">
      <div class="letter-container col-11">
        <letter-nav
          v-if="viewmode === 'letternav'"
        />
        <div
          class="letter-svg-background"
          v-html="letterSVG"
          v-if="viewmode === 'draw'"
        />
        <div class="letter-svg" v-html="letterSVG" v-if="viewmode === 'draw'" />

        <div class="letter-arrow-container" v-if="viewmode === 'arrows'">
          <svg
            class="nupuram-color"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 30 20"
          >
            <text
              x="50%"
              y="50%"
              dominant-baseline="middle"
              text-anchor="middle"
            >
              {{ letter }}
            </text>
          </svg>
        </div>

        <div class="letter-dots-container" v-if="viewmode === 'dots'">
          <svg
            class="nupuram-dots"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 30 20"
          >
            <text
              x="50%"
              y="50%"
              dominant-baseline="middle"
              text-anchor="middle"
            >
              {{ letter }}
            </text>
          </svg>
        </div>
        <drawing-canvas ref="drawingCanvas" v-if="viewmode === 'dots' || viewmode === 'arrows'"/>
      </div>
    </section>
    <div class="examples col-12 grid" v-if="examples?.length">
      <span class="example col-1@lg col-3"> Examples: </span>
      <span
        class="example col-1@lg col-3"
        v-for="example in examples"
        :key="example"
      >
        {{ example }}
      </span>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch, PropType, Ref } from "vue";
import { animateLetter } from "../animateLetter";
import LetterNav from "@/components/LetterNav.vue";
import DrawingCanvas from "@/components/DrawingCanvas.vue";

interface Lesson {
  pronunciation?: string;
  examples?: Array<string>;
}

const props = defineProps({
  letter: {
    type: String,
    default: "അ",
  },
  lesson: Object as PropType<Lesson>,
});

const root: Ref = ref(null);
const drawingCanvas: Ref = ref(null);
const letterSVG = ref("");
const viewmode = ref("draw");
const audioSrc = computed(() => props.lesson?.pronunciation);
const examples = computed(() => props.lesson?.examples);
const letterElement = computed(() => root?.value?.querySelector(".letter-svg"));

const animate = () => {
  viewmode.value = "draw";
  clearCanvas()
  setTimeout(() => {
    console.log(`Animating ${props.letter}`)
    animateLetter(letterElement.value);
  }, 10);
}

const getSVG = (letter: string) => {
  return fetch(`/svgs/${letter}.svg`).then((response) => response.text());
};

const playSound = () => {
  new Audio(audioSrc.value).play();
};

const arrows = () => {
  viewmode.value = "arrows";
  clearCanvas()
};

const clearCanvas=() =>{
    drawingCanvas.value.clearCanvas();
}

const dots = () => {
  viewmode.value = "dots";
  clearCanvas()
};

const init = async (letter: string) => {
  const svg: string = await getSVG(letter);
  letterSVG.value = svg;
  animate();
  document.getElementById(`#${letter}`)?.scrollIntoView();
  clearCanvas()
};

onMounted(() => init(props.letter));

watch(
  () => props.letter,
  (letter) => init(letter)
);

</script>

<style lang="less">

section.letter{
  display: grid;
  height: 100%;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr auto auto;
  grid-template-areas:
      "svg"
      "toolbar"
      "examples";
}

.letter-svg {
  grid-area: svg;
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

  .letter-svg-background {
    path {
      fill: none !important;
      fill-rule: evenodd !important;
      stroke: var(--brand) !important;
      stroke-width: 60 !important;
      stroke-linecap: round !important;
      stroke-linejoin: round !important;
      stroke-miterlimit: 4 !important;
      stroke-dasharray: none !important;
      stroke-opacity: 1 !important;
    }
  }
  .letter-svg {
    path {
      stroke-width: 18px !important;
      stroke: var(--blue-1) !important;
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
audio {
  width: 100%;
}


.toolbar {
  grid-area: toolbar;
}
.toolbar button {
  margin: var(--size-1);
  background-color: var(--brand);
  color: var(--text-1);
  padding: var(--size-2);
  cursor: pointer;
}
.examples {
  margin: var(--size-3) var(--size-1);
}

svg {
  width: 100%;
  fill: currentColor;
}


.letter-dots-container,
.letter-arrow-container {
  width: 100%;
  height: 100%;
  position: absolute;
}
</style>
