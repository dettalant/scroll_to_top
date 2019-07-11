import { easeCubicOut } from "./ease";

const SCROLL_BUTTON_CLASSNAME = "scroll_to_top";
const SCROLL_BUTTON_ID = "scrollToTop";
const DEVICE_CLICK_EVENT_TYPE = (window.ontouchend === null) ? "touchend" : "click";

const addScrollToTopButton = () => {
  const buttonEl = document.createElement("button");
  buttonEl.type = "button";
  buttonEl.className = SCROLL_BUTTON_CLASSNAME;
  buttonEl.id = SCROLL_BUTTON_ID;
  buttonEl.textContent = "トップへ戻る（仮）";

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

addScrollToTopButton();
