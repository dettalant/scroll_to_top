/*!
 *   smoothScroller.js
 * See {@link https://github.com/dettalant/smoothScroller}
 *
 * @author dettalant
 * @version v0.1.3
 * @license MIT License
 */
var smoothScroller = (function (exports) {
  'use strict';

  /**
   * @file ease計算式をまとめたファイル
   * 全ての関数は以下のコードを丸パクリして書いた。
   *
   * @see  https://gist.github.com/gre/1650294
   */
  /**
  * ease outさせる関数
  * @see https://gist.github.com/gre/1650294
  * @param  t 入力する0~1のfloat
  * @return   ease outしていく0~1の値
  */
  const easeCubicOut = (t) => {
      return (--t) * t * t + 1;
  };

  /**
   * 二つの数値での線形補間を行う
   * @param x0 座標数値その一
   * @param x1 座標数値その二
   * @param t  線形補間の上での中点位置(0~1のfloatを入力)
   * @return [description]
   */
  const interpolation = (x0, x1, t) => {
      return x0 * (1 - t) + x1 * t;
  };
  const scrollTo = (moveToPos, durationTime) => {
      const targetPos = (moveToPos) ? moveToPos : 0;
      const pageCurrentY = window.pageYOffset;
      // アニメーション時間をミリ秒指定
      const duration = (durationTime) ? durationTime : 500;
      let now = 0;
      const render = (timestamp) => {
          if (!now)
              now = timestamp;
          let progress = (timestamp - now) / duration;
          if (progress > 1) {
              progress = 1;
          }
          const tmpY = interpolation(pageCurrentY, targetPos, easeCubicOut(progress));
          // ウィンドウスクロール処理
          window.scroll(0, tmpY);
          if (progress < 1) {
              requestAnimationFrame(render);
          }
      };
      requestAnimationFrame(render);
  };

  exports.scrollTo = scrollTo;

  return exports;

}({}));
