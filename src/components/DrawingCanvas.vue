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

<script>
export default {
  name: "DrawingCanvas",
  data() {
    return {
      drawing: false,
      ctx: null,
      width: 800,
      height: 600,
      strokeColor: "orange",
      strokeWidth: 10,
    };
  },
  methods: {
    startDrawing(event) {
      this.drawing = true;
      this.ctx.beginPath();
      this.ctx.lineWidth = this.strokeWidth;
      this.ctx.strokeStyle = this.strokeColor;
      this.ctx.lineCap = "round";

      this.ctx.moveTo(event.offsetX, event.offsetY);
    },
    draw(event) {
      if (!this.drawing) return;

      this.ctx.lineTo(event.offsetX, event.offsetY);
      this.ctx.stroke();
    },
    stopDrawing() {
      this.drawing = false;
      this.ctx.closePath();
    },
    clearCanvas() {
      this.ctx.clearRect(0, 0, this.width, this.height);
    },
  },
  mounted() {
    const canvasContainer = document.querySelector(".drawing-canvas");
    this.ctx = this.$refs.canvas.getContext("2d");
    this.height = canvasContainer.getBoundingClientRect().height;
    this.width = canvasContainer.getBoundingClientRect().width;
  },
  emits: ["clear"],
};
</script>

<style>
.drawing-canvas {
  position: relative;
}
</style>
