<template>
  <div class="drawing-canvas">
    <canvas
      ref="canvas"
      :width="width"
      :height="height"
      @mousedown="startDrawing"
      @mousemove="draw"
      @mouseup="stopDrawing"
      @mouseout="stopDrawing"
      @touchstart="startDrawing"
      @touchmove="draw"
      @touchend="stopDrawing"
    ></canvas>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";

const drawing = ref(false);
const canvas = ref(null);
const ctx = ref(null);
const width = ref(800);
const height = ref(600);
const strokeColor = ref("orange");
const strokeWidth = ref(20);
const points = ref([]);
const snapshot = ref(null);

function midPointBetween(p1, p2) {
  return {
    x: p1.x + (p2.x - p1.x) / 2,
    y: p1.y + (p2.y - p1.y) / 2,
  };
}

const getCoordinates = (event, canvas) => {
  let rect = canvas.getBoundingClientRect();
  if (event.type.indexOf("touch") >= 0) {
    return {
      x: event.targetTouches[0].clientX - rect.left,
      y: event.targetTouches[0].clientY - rect.top,
    };
  } else {
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  }
};
const startDrawing = (event) => {
  snapshot.value = ctx.value.getImageData(0, 0, width.value, height.value);
  drawing.value = true;
  ctx.value.beginPath();
  ctx.value.lineWidth = strokeWidth.value;
  ctx.value.strokeStyle = strokeColor.value;
  ctx.value.lineCap = "round";
  ctx.value.lineJoin = "round";
  ctx.value.globalAlpha = 0.8;
  ctx.value.imageSmoothingQuality = "high";
  const { x, y } = getCoordinates(event, canvas.value);
  points.value.push({ x, y });
  ctx.value.moveTo(x, y);
};

const draw = (event) => {
  if (!drawing.value) return;

  const { x, y } = getCoordinates(event, canvas.value);

  points.value.push({ x, y });

  clearCanvas();
  if (snapshot.value) {
    ctx.value.putImageData(snapshot.value, 0, 0);
  }
  let p1 = points.value[0];
  let p2 = points.value[1];
  ctx.value.beginPath();
  ctx.value.moveTo(p1.x, p1.y);

  for (let i = 1, len = points.value.length; i < len; i++) {
    // we pick the point between pi+1 & pi+2 as the
    // end point and p1 as our control point
    const midPoint = midPointBetween(p1, p2);
    ctx.value.quadraticCurveTo(p1.x, p1.y, midPoint.x, midPoint.y);
    p1 = points.value[i];
    p2 = points.value[i + 1];
  }
  // Draw last line as a straight line while
  // we wait for the next point to be able to calculate
  // the bezier control point
  ctx.value.lineTo(p1.x, p1.y);
  ctx.value.stroke();
};

const stopDrawing = () => {
  drawing.value = false;
  ctx.value.closePath();
  points.value = [];
};

const clearCanvas = () => {
  ctx.value.clearRect(0, 0, width.value, height.value);
};

onMounted(() => {
  const canvasContainer = document.querySelector(".drawing-canvas");
  ctx.value = canvas.value.getContext("2d", { willReadFrequently: true });
  height.value = canvasContainer.getBoundingClientRect().height;
  width.value = canvasContainer.getBoundingClientRect().width;
});

defineExpose({
  clearCanvas,
});
</script>

<style>
.drawing-canvas {
  position: relative;
}
</style>
