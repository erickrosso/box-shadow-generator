class BoxShadowGenerator {
  constructor(
    horizontal,
    horizontalRef,
    vertical,
    verticalRef,
    blur,
    blurRef,
    spread,
    spreadRef,
    color,
    colorRef,
    opacity,
    opacityRef,
    previewBox,
    rule,
    webkitRule,
    mozRule
  ) {
    this.horizontal = horizontal;
    this.horizontalRef = horizontalRef;
    this.vertical = vertical;
    this.verticalRef = verticalRef;
    this.blur = blur;
    this.blurRef = blurRef;
    this.spread = spread;
    this.spreadRef = spreadRef;
    this.color = color;
    this.colorRef = colorRef;
    this.opacity = opacity;
    this.opacityRef = opacityRef;
    this.previewBox = previewBox;
    this.rule = rule;
    this.webkitRule = webkitRule;
    this.mozRule = mozRule;
  }

  initialize() {
    this.horizontalRef.value = this.horizontal.value;
    this.verticalRef.value = this.vertical.value;
    this.spreadRef.value = this.spread.value;
    this.blurRef.value = this.blur.value;
    this.colorRef.value = this.color.value;
    this.opacityRef.value = this.opacity.value / 100;

    this.applyRule();
    this.showRule();
  }

  applyRule() {
    this.previewBox.style.boxShadow = `${this.horizontalRef.value}px ${
      this.verticalRef.value
    }px ${this.blurRef.value}px ${this.spreadRef.value}px ${
      this.colorRef.value
    }${Math.round(parseFloat(this.opacityRef.value) * 255).toString(
      16
    )} ${insetRef}`;
    this.currentRule = this.previewBox.style.boxShadow;
  }

  showRule() {
    this.rule.textContent = this.currentRule;
    this.webkitRule.textContent = this.currentRule;
    this.mozRule.textContent = this.currentRule;
  }

  updateValue(type, value) {
    switch (type) {
      case "horizontal":
        this.horizontalRef.value = value;
        break;
      case "vertical":
        this.verticalRef.value = value;
        break;
      case "spread":
        this.spreadRef.value = value;
        break;
      case "blur":
        this.blurRef.value = value;
        break;
      case "color":
        this.colorRef.value = value;
        break;
      case "opacity":
        this.opacityRef.value = value;
        break;
    }
    this.applyRule();
    this.showRule();
  }
}

// Selecionar Elementod
const horizontal = document.querySelector("#horizontal");
const horizontalRef = document.querySelector("#horizontal-value");
const vertical = document.querySelector("#vertical");
const verticalRef = document.querySelector("#vertical-value");
const blur = document.querySelector("#blur");
const blurRef = document.querySelector("#blur-value");
const spread = document.querySelector("#spread");
const spreadRef = document.querySelector("#spread-value");
const color = document.querySelector("#color");
const colorRef = document.querySelector("#color-value");
const opacity = document.querySelector("#opacity");
const opacityRef = document.querySelector("#opacity-value");
const inset = document.querySelector("#inset");
let insetRef = "";

const previewBox = document.querySelector("#box");

const boxRule = document.querySelector("#rules-area");
const textArea = document.querySelector("#copy");

const rule = document.querySelector("#rule span");
const webkitRule = document.querySelector("#webkit-rule span");
const mozRule = document.querySelector("#moz-rule span");

const boxShadow = new BoxShadowGenerator(
  horizontal,
  horizontalRef,
  vertical,
  verticalRef,
  blur,
  blurRef,
  spread,
  spreadRef,
  color,
  colorRef,
  opacity,
  opacityRef,
  previewBox,
  rule,
  webkitRule,
  mozRule
);

boxShadow.initialize();

// Eventos

horizontal.addEventListener("input", (e) => {
  const value = e.target.value;

  boxShadow.updateValue("horizontal", value);
});

vertical.addEventListener("input", (e) => {
  const value = e.target.value;

  boxShadow.updateValue("vertical", value);
});

spread.addEventListener("input", (e) => {
  const value = e.target.value;

  boxShadow.updateValue("spread", value);
});

blur.addEventListener("input", (e) => {
  const value = e.target.value;

  boxShadow.updateValue("blur", value);
});

color.addEventListener("input", (e) => {
  const value = e.target.value;

  boxShadow.updateValue("color", value);
});

opacity.addEventListener("input", (e) => {
  const value = e.target.value;

  boxShadow.updateValue("opacity", value / 100);
});

inset.addEventListener("input", (e) => {
  const value = e.target.checked;

  if (value) {
    insetRef = "inset";
  } else {
    insetRef = "";
  }
  boxShadow.updateValue("inset", insetRef);
});

boxRule.addEventListener("click", (e) => {
  let textoCopiado = `box-shadow: ${previewBox.style.boxShadow};
  -webkit-box-shadow: ${previewBox.style.boxShadow};
  -moz-box-shadow: ${previewBox.style.boxShadow};`;
  textArea.value = textoCopiado;
  textArea.select();
  document.execCommand("copy");
});
