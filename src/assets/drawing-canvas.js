class DrawingCanvas extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.drawing = false;
    this.canvas = null;
    this.ctx = null;
    this.width = 800;
    this.height = 600;
    this.strokeColor = 'orange';
    this.strokeWidth = 20;
    this.points = [];
    this.snapshot = null;
  }

  connectedCallback() {
    this.render();
    this.canvas = this.shadowRoot.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d', { willReadFrequently: true });
    this.adjustCanvasSize();
    this.setupEventListeners();
  }

  render() {
    this.shadowRoot.innerHTML = `
    <style>
    :host {
      display: block;
      position: relative;
    }

    canvas {
      width: 100%;
      height: 100%;
      touch-action: none;
      --s: 100px;
      --_g: #0000 90deg, #d8dee910 0;
      background: conic-gradient(from 90deg at 2px 2px, var(--_g)) 0 0 / var(--s) var(--s), conic-gradient(from 90deg at 1px 1px, var(--_g)) 0 0 / calc(var(--s) / 5) calc(var(--s) / 5);
    }
    </style>
    <canvas width="${this.width}" height="${this.height}"></canvas>
    `;
  }

  adjustCanvasSize() {
    const rect = this.getBoundingClientRect();
    this.height = rect.height;
    this.width = rect.width;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  setupEventListeners() {
    this.canvas.addEventListener('mousedown', this.startDrawing.bind(this));
    this.canvas.addEventListener('mousemove', this.draw.bind(this));
    this.canvas.addEventListener('mouseup', this.stopDrawing.bind(this));
    this.canvas.addEventListener('mouseout', this.stopDrawing.bind(this));
    this.canvas.addEventListener('touchstart', this.startDrawing.bind(this));
    this.canvas.addEventListener('touchmove', this.draw.bind(this));
    this.canvas.addEventListener('touchend', this.stopDrawing.bind(this));

  }

  midPointBetween(p1, p2) {
    return {
      x: p1.x + (p2.x - p1.x) / 2,
      y: p1.y + (p2.y - p1.y) / 2,
    };
  }

  getCoordinates(event) {
    const rect = this.canvas.getBoundingClientRect();
    if (event.type.indexOf('touch') >= 0) {
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
  }

  startDrawing(event) {
    this.snapshot = this.ctx.getImageData(0, 0, this.width, this.height);
    this.drawing = true;
    this.ctx.beginPath();
    this.ctx.lineWidth = this.strokeWidth;
    this.ctx.strokeStyle = this.strokeColor;
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';
    this.ctx.globalAlpha = 0.8;
    this.ctx.imageSmoothingQuality = 'high';
    const { x, y } = this.getCoordinates(event);
    this.points.push({ x, y });
    this.ctx.moveTo(x, y);
  }

  draw(event) {
    if (!this.drawing) return;

    const { x, y } = this.getCoordinates(event);
    this.points.push({ x, y });

    this.clearCanvas();
    if (this.snapshot) {
      this.ctx.putImageData(this.snapshot, 0, 0);
    }
    let p1 = this.points[0];
    let p2 = this.points[1];
    this.ctx.beginPath();
    this.ctx.moveTo(p1.x, p1.y);

    for (let i = 1, len = this.points.length; i < len; i++) {
      const midPoint = this.midPointBetween(p1, p2);
      this.ctx.quadraticCurveTo(p1.x, p1.y, midPoint.x, midPoint.y); p1 = this.points[i]; p2 = this.points[i + 1];
    }
    this.ctx.lineTo(p1.x, p1.y); this.ctx.stroke();
  }

  stopDrawing() {
    this.drawing = false;
    this.ctx.closePath();
    this.points = [];
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }
}

customElements.define('drawing-canvas', DrawingCanvas);
