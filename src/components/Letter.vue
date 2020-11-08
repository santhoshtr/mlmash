<template>
  <section class="letter" ref="root">
    <div class="letter-container">
      <div class="letter-svg-background" v-html="letterSVG" />
      <div class="letter-svg" v-html="letterSVG" />
    </div>
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
  </section>
</template>

<script lang="ts">
// eslint-disable-next-line no-unused-vars
import { ref, onMounted, computed, watch, PropType, Ref } from "vue";
import { animateLetter } from "../animateLetter";
import { defineComponent } from "vue";

interface Lesson {
  pronunciation?: string;
  examples?: Array<string>;
}

export default defineComponent({
  name: "Letter",
  props: {
    letter: String,
    lesson: Object as PropType<Lesson>,
  },
  setup(props) {
    const animatationTime: number = 5; // 5s
    const root:Ref = ref(null);
    const letterSVG = computed(() =>
      require(`!html-loader!@/assets/svgs/${props.letter}.svg`)
    );
    const audioSrc = computed(() => props.lesson?.pronunciation);
    const examples = computed(() => props.lesson?.examples);
    const letterElement = computed(() =>
      root?.value?.querySelector(".letter-svg")
    );
    const backgroundLetterElement = computed(() =>
      root?.value?.querySelector(".letter-svg-background")
    );
    const animate = () =>
      animateLetter(
        backgroundLetterElement.value,
        letterElement.value,
        animatationTime
      );

    onMounted(() => {
      animate();
    });
    watch(
      () => props.letter,
      (/*first, second */) => {
        setTimeout(() => {
          animate();
        }, 100);
      }
    );
    return {
      root,
      backgroundLetterElement,
      letterElement,
      letterSVG,
      audioSrc,
      examples,
      animate,
      animatationTime,
    };
  },
});
</script>
<style lang="less">
.letter {
  overflow: auto;
}
.letter-svg {
  svg {
    height: 100%;
    max-height: 100%;
    max-width: 100%;
  }
}
.letter-container {
  position: relative;
  height: 50vh;
  min-width: 908px; //width of longest character "ഞ്ഞ"
  .letter-svg-background,
  .letter-svg {
    position: absolute;
    top: 0;
    left: 0;
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
