/**
 * @file ease計算式をまとめたファイル
 * 全ての関数は以下のコードを丸パクリして書いた。
 *
 * @see  https://gist.github.com/gre/1650294
 */


export const easeQuadIn = (t: number) => {
  return t * t;
}

export const easeQuadOut = (t: number) => {
  return t * (2 - t);
}

export const easeQuadInOut = (t: number) => {
  return (t < .5) ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

export const easeCubicIn = (t: number) => {
  return t * t * t;
}

/**
* ease outさせる関数
* @see https://gist.github.com/gre/1650294
* @param  t 入力する0~1のfloat
* @return   ease outしていく0~1の値
*/
export const easeCubicOut = (t: number) => {
  return (--t) * t * t + 1;
}

export const easeCubicInOut = (t: number) => {
  return (t < .5) ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
}

export const easeQuartOut = (t: number) => {
  return 1 - (--t) * t * t * t;
}
