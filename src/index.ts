import { easeCubicOut } from "./ease";

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

export const scrollTo = (moveToPos: number, durationTime?: number) => {
  const targetPos = (moveToPos) ? moveToPos : 0;
  const scrollY = window.pageYOffset;

  if (Math.floor(targetPos) === Math.floor(scrollY)) {
    // スクロールする必要がない場合は
    // 処理を即終了させる
    return;
  }

  // アニメーション時間をミリ秒指定
  const duration = (durationTime) ? durationTime : 500;
  let now = 0;

  const render = (timestamp: number) => {
    if (!now) now = timestamp;

    let progress = (timestamp - now) / duration;
    if (progress > 1) {
      progress = 1;
    }

    const tmpY = interpolation(scrollY, targetPos, easeCubicOut(progress));

    // ウィンドウスクロール処理
    window.scroll(0, tmpY);

    if (progress < 1) {
      requestAnimationFrame(render);
    }
  }
  requestAnimationFrame(render);
}
