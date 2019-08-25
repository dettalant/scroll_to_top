/**
 * @file ease計算式をまとめたファイル
 * 全ての関数は以下のコードを丸パクリして書いた。
 *
 * @see  https://gist.github.com/gre/1650294
 */
export declare const easeQuadIn: (t: number) => number;
export declare const easeQuadOut: (t: number) => number;
export declare const easeQuadInOut: (t: number) => number;
export declare const easeCubicIn: (t: number) => number;
/**
* ease outさせる関数
* @see https://gist.github.com/gre/1650294
* @param  t 入力する0~1のfloat
* @return   ease outしていく0~1の値
*/
export declare const easeCubicOut: (t: number) => number;
export declare const easeCubicInOut: (t: number) => number;
export declare const easeQuartOut: (t: number) => number;
