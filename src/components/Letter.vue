<template>
  <section class="letter" ref="root">
    <section class="sidebar col-6@lg col-12">
      <div class="toolbar grid">
        <button @click="animate" class="button col-2 tooltip">
          <span class="tooltip-text">Animate</span>
          <span class="material-symbols-outlined">stylus_note</span>
        </button>
        <button @click="dots" class="button col-2 tooltip">
          <span class="tooltip-text">Switch to dots</span>
          <span class="material-symbols-outlined">page_control</span>
        </button>
        <button @click="playSound" class="button col-2 tooltip">
          <span class="tooltip-text">Pronounce</span>
          <span class="material-symbols-outlined">record_voice_over</span>
        </button>
        <button @click="clearCanvas" class="button col-2 tooltip">
          <span class="tooltip-text">Clear canvas</span>
          <span class="material-symbols-outlined">clear</span>
        </button>
      </div>
    </section>
    <section class="letter-container col-12 grid">
      <letter-nav v-if="viewmode === 'letternav'" :letter="letter" />
      <div class="letter-svg-background" v-html="letterSVG" v-if="viewmode === 'draw'" />
      <div :class="`letter-svg ${viewmode}`" v-html="letterSVG" v-if="viewmode === 'draw' || viewmode === 'dots'" />
      <drawing-canvas ref="canvas" />
    </section>
    <div class="examples col-12 grid" v-if="examples?.length">
      <span class="example col-1@lg col-3"> Examples: </span>
      <span class="example col-1@lg col-3" v-for="example in examples" :key="example">
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
const canvas: Ref = ref(null);
const letterSVG = ref("");
const viewmode = ref("draw");
const audioSrc = computed(() => props.lesson?.pronunciation);
const examples = computed(() => props.lesson?.examples);
const letterElement = computed(() =>
  root?.value?.querySelector(".draw.letter-svg")
);

const animate = () => {
  viewmode.value = "draw";
  clearCanvas();
  setTimeout(() => {
    console.log(`Animating ${props.letter}`);
    animateLetter(letterElement.value);
  }, 10);
};

const getSVG = (letter: string) => {
  return fetch(`/svgs/${letter}.svg`).then((response) => response.text());
};

const playSound = () => {
  new Audio(audioSrc.value).play();
};

const clearCanvas = () => {
  canvas.value?.clearCanvas();
};

const dots = () => {
  viewmode.value = "dots";
  clearCanvas();
};

const init = async (letter: string) => {
  const svg: string = await getSVG(letter);
  letterSVG.value = svg;
  animate();
  document.getElementById(`#${letter}`)?.scrollIntoView();
  clearCanvas();
};

onMounted(() => init(props.letter));

watch(
  () => props.letter,
  (letter) => init(letter)
);
</script>

<style lang="less">
section.letter {
  display: grid;
  height: 100%;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr auto auto;
  grid-template-areas:
    "letter"
    "toolbar"
    "examples";
}

.letter-svg {
  svg {
    height: 100%;
    max-height: 100%;
    max-width: 100%;
  }
}

.letter-container {
  grid-area: letter;
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

    text {
      display: none;
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
  transition: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.toolbar button:hover {
  background-color: rgba(#228be6, 0.75);
  color: var(--text-1);

}

.examples {
  margin: var(--size-3) var(--size-1);
}

svg {
  width: 100%;
  fill: currentColor;
}

.dots svg path {
  stroke-dasharray: 4 40 !important;
  transition: none !important;
  stroke-dashoffset: 0 !important;
}

.letter-dots-container {
  width: 100%;
  height: 100%;
  position: absolute;
}

/************************
*                       *  
*     TOOLTIP CSS       *
*                       *
************************/
.tooltip {
  position: relative;
  display: inline-block;
}

.tooltip .tooltip-text {
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;
  position: absolute;
  z-index: 1;
  width: 120px;
  bottom: 100%;
  left: 50%;
  margin-left: -60px;
}

.tooltip .tooltip-text::after {
  content: " ";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: black transparent transparent transparent;
}

.tooltip:hover .tooltip-text {
  visibility: visible;
}
</style>
