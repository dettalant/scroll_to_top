import { easeCubicOut } from "./ease";

const SCROLL_BUTTON_CLASSNAME = "scroll_to_top";
const SCROLL_BUTTON_ID = "scrollToTop";
const DEVICE_CLICK_EVENT_TYPE = (window.ontouchend === null) ? "touchend" : "click";

const appendScrollToTopButton = () => {
  const buttonEl = document.createElement("button");
  buttonEl.type = "button";
  buttonEl.className = SCROLL_BUTTON_CLASSNAME;
  buttonEl.id = SCROLL_BUTTON_ID;
  //buttonEl.textContent = "トップへ戻る（仮）";

  const svgIcon = createSvgIcon();
  buttonEl.appendChild(svgIcon);

  buttonEl.addEventListener(DEVICE_CLICK_EVENT_TYPE, () => scrollToTop());
  document.body.appendChild(buttonEl);
}

const scrollToTop = () => {
  const pageTopY = 0;
  const pageCurrentY = window.pageYOffset;
  // アニメーション時間をミリ秒指定
  const duration = 500;
  let now = 0;

  const render = (timestamp: number) => {
    if (!now) now = timestamp;

    let progress = (timestamp - now) / duration;
    if (progress > 1) {
      progress = 1;
    }

    const tmpY = interpolation(pageCurrentY, pageTopY, easeCubicOut(progress));

    // ウィンドウスクロール処理
    window.scroll(0, tmpY);

    if (progress < 1) {
      requestAnimationFrame(render);
    }
  }
  requestAnimationFrame(render);
}

/**
 * 二つの数値での線形補間を行う
 * @param x0 座標数値その一
 * @param x1 座標数値その二
 * @param t  線形補間の上での中点位置(0~1のfloatを入力)
 * @return [description]
 */
const interpolation = (x0: number, x1: number, t: number): number => {
  return x0 * (1 - t) + x1 * t;
}

/**
 * ページトップへ戻るアイコンとなるSVG要素を生成して返す
 * icon material: material.io baseline-arrow_upward
 * @return 生成したSVG要素
 */
const createSvgIcon = (): SVGElement => {
  // XML namespace
  const NAMESPACE = "http://www.w3.org/2000/svg";

  // create svg element
  const svgEl = document.createElementNS(NAMESPACE,"svg");
  svgEl.setAttribute("viewBox", "0 0 24 24");
  svgEl.setAttribute("class", "svg_icon icon_arrow_up");

  // create svg title element
  const titleEl = document.createElementNS(NAMESPACE,"title");
  titleEl.textContent = "ページトップへ戻る";
  svgEl.appendChild(titleEl);

  // create svg path element
  const pathEl = document.createElementNS(NAMESPACE,"path");
  pathEl.setAttribute("class", "svg_main_color");
  pathEl.setAttribute("d", "M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z");
  svgEl.appendChild(pathEl);

  return svgEl;
}

appendScrollToTopButton();
