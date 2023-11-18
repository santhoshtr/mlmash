<template>
  <section class="letter grid" ref="root">
    <section class="letter-svg col-12 grid">
      <div class="letter-container col-11">
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
        <div class="letter-arrow-container" v-if="viewmode === 'dots'">
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
      </div>
      <section class="sidebar col-1">
        <div class="toolbar grid">
          <button @click="animate" class="button col-12">
            <span class="material-symbols-outlined">stylus_note</span>
          </button>
          <button @click="arrows" class="button col-12">
            <span class="material-symbols-outlined">step</span>
          </button>
          <button @click="dots" class="button col-12">
            <span class="material-symbols-outlined">page_control</span>
          </button>
          <button @click="playSound" class="button col-12">
            <span class="material-symbols-outlined">record_voice_over</span>
          </button>
        </div>
      </section>
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
const letterSVG = ref("");
const viewmode = ref("draw");
const audioSrc = computed(() => props.lesson?.pronunciation);
const examples = computed(() => props.lesson?.examples);
const letterElement = computed(() => root?.value?.querySelector(".letter-svg"));

const animate = () => {
  viewmode.value = "draw";
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
};

const dots = () => {
  viewmode.value = "dots";
};

const init = async (letter: string) => {
  const svg: string = await getSVG(letter);
  letterSVG.value = svg;
  animate();
};

onMounted(() => init(props.letter));

watch(
  () => props.letter,
  (letter) => init(letter)
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
  height: 70vh;

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

.toolbar button {
  margin: var(--size-1);
}
.examples {
  margin: var(--size-3) var(--size-1);
}

svg {
  width: 100%;
  fill: currentColor;
}


.letter-arrow-container {
  width: 100%;
  height: 100%;
}
</style>
