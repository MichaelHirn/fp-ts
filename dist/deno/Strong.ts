/**
 * The `Strong` class extends `Profunctor` with combinators for working with product types.
 *
 * `first` and `second` lift values in a `Profunctor` to act on the first and second components of a tuple,
 * respectively.
 *
 * Another way to think about Strong is to piggyback on the intuition of
 * inputs and outputs.  Rewriting the type signature in this light then yields:
 *
 * ```purescript
 * first ::  forall input output a. p input output -> p (Tuple input a) (Tuple output a)
 * second :: forall input output a. p input output -> p (Tuple a input) (Tuple a output)
 * ```
 *
 * If we specialize the profunctor p to the function arrow, we get the following type
 * signatures, which may look a bit more familiar:
 *
 * ```purescript
 * first ::  forall input output a. (input -> output) -> (Tuple input a) -> (Tuple output a)
 * second :: forall input output a. (input -> output) -> (Tuple a input) -> (Tuple a output)
 * ```
 *
 * So, when the `profunctor` is `Function` application, `first` essentially applies your function
 * to the first element of a tuple, and `second` applies it to the second element (same as `map` would do).
 *
 * Adapted from https://github.com/purescript/purescript-profunctor/blob/master/src/Data/Profunctor/Strong.purs
 *
 * @since 2.0.0
 */
import { Category, Category2, Category3, Category4 } from './Category.ts'
import { identity } from './function.ts'
import { HKT2, Kind2, Kind3, URIS2, URIS3, URIS4, Kind4 } from './HKT.ts'
import { Profunctor, Profunctor2, Profunctor3, Profunctor4 } from './Profunctor.ts'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Strong<F> extends Profunctor<F> {
  readonly first: <A, B, C>(pab: HKT2<F, A, B>) => HKT2<F, [A, C], [B, C]>
  readonly second: <A, B, C>(pab: HKT2<F, B, C>) => HKT2<F, [A, B], [A, C]>
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Strong2<F extends URIS2> extends Profunctor2<F> {
  readonly first: <A, B, C>(pab: Kind2<F, A, B>) => Kind2<F, [A, C], [B, C]>
  readonly second: <A, B, C>(pab: Kind2<F, B, C>) => Kind2<F, [A, B], [A, C]>
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Strong3<F extends URIS3> extends Profunctor3<F> {
  readonly first: <R, A, B, C>(pab: Kind3<F, R, A, B>) => Kind3<F, R, [A, C], [B, C]>
  readonly second: <R, A, B, C>(pab: Kind3<F, R, B, C>) => Kind3<F, R, [A, B], [A, C]>
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Strong4<F extends URIS4> extends Profunctor4<F> {
  readonly first: <S, R, A, B, C>(pab: Kind4<F, S, R, A, B>) => Kind4<F, S, R, [A, C], [B, C]>
  readonly second: <S, R, A, B, C>(pab: Kind4<F, S, R, B, C>) => Kind4<F, S, R, [A, B], [A, C]>
}

/**
 * Compose a value acting on a tuple from two values, each acting on one of the components of the tuple.
 *
 * Specializing `split` to function application would look like this:
 *
 * ```purescript
 * split :: forall a b c d. (a -> b) -> (c -> d) -> (Tuple a c) -> (Tuple b d)
 * ```
 *
 * We take two functions, `f` and `g`, and we transform them into a single function which takes a tuple and maps `f`
 * over the first element and `g` over the second.  Just like `bi-map` would do for the `bi-functor` instance of tuple.
 *
 * @since 2.10.0
 */
export function split<F extends URIS4>(
  S: Strong4<F>,
  C: Category4<F>
): <S, R, A, B, C, D>(pab: Kind4<F, S, R, A, B>, pcd: Kind4<F, S, R, C, D>) => Kind4<F, S, R, [A, C], [B, D]>
export function split<F extends URIS3>(
  S: Strong3<F>,
  C: Category3<F>
): <R, A, B, C, D>(pab: Kind3<F, R, A, B>, pcd: Kind3<F, R, C, D>) => Kind3<F, R, [A, C], [B, D]>
export function split<F extends URIS2>(
  S: Strong2<F>,
  C: Category2<F>
): <A, B, C, D>(pab: Kind2<F, A, B>, pcd: Kind2<F, C, D>) => Kind2<F, [A, C], [B, D]>
export function split<F>(
  S: Strong<F>,
  C: Category<F>
): <A, B, C, D>(pab: HKT2<F, A, B>, pcd: HKT2<F, C, D>) => HKT2<F, [A, C], [B, D]>
export function split<F>(
  S: Strong<F>,
  C: Category<F>
): <A, B, C, D>(pab: HKT2<F, A, B>, pcd: HKT2<F, C, D>) => HKT2<F, [A, C], [B, D]> {
  return <A, B, C, D>(pab: HKT2<F, A, B>, pcd: HKT2<F, C, D>) =>
    C.compose(S.second<B, C, D>(pcd), S.first<A, B, C>(pab))
}

/**
 * Compose a value which introduces a tuple from two values, each introducing one side of the tuple.
 *
 * This combinator is useful when assembling values from smaller components, because it provides a way to support two
 * different types of output.
 *
 * Specializing `fanOut` to function application would look like this:
 *
 * ```purescript
 * fanOut :: forall a b c. (a -> b) -> (a -> c) -> (a -> (Tuple b c))
 * ```
 *
 * We take two functions, `f` and `g`, with the same parameter type and we transform them into a single function which
 * takes one parameter and returns a tuple of the results of running `f` and `g` on the parameter, respectively.  This
 * allows us to run two parallel computations on the same input and return both results in a tuple.
 *
 * @since 2.10.0
 */
export function fanOut<F extends URIS4>(
  S: Strong4<F>,
  C: Category4<F>
): <S, R, A, B, C>(pab: Kind4<F, S, R, A, B>, pac: Kind4<F, S, R, A, C>) => Kind4<F, S, R, A, [B, C]>
export function fanOut<F extends URIS3>(
  S: Strong3<F>,
  C: Category3<F>
): <R, A, B, C>(pab: Kind3<F, R, A, B>, pac: Kind3<F, R, A, C>) => Kind3<F, R, A, [B, C]>
export function fanOut<F extends URIS2>(
  S: Strong2<F>,
  C: Category2<F>
): <A, B, C>(pab: Kind2<F, A, B>, pac: Kind2<F, A, C>) => Kind2<F, A, [B, C]>
export function fanOut<F>(
  S: Strong<F>,
  C: Category<F>
): <A, B, C>(pab: HKT2<F, A, B>, pac: HKT2<F, A, C>) => HKT2<F, A, [B, C]>
export function fanOut<F>(
  S: Strong<F>,
  C: Category<F>
): <A, B, C>(pab: HKT2<F, A, B>, pac: HKT2<F, A, C>) => HKT2<F, A, [B, C]> {
  const splitSC = split(S, C)
  return <A, B, C>(pab: HKT2<F, A, B>, pac: HKT2<F, A, C>): HKT2<F, A, [B, C]> =>
    C.compose(
      splitSC(pab, pac),
      S.promap<A, A, A, [A, A]>(C.id<A>(), identity, (a) => [a, a])
    )
}

// -------------------------------------------------------------------------------------
// deprecated
// -------------------------------------------------------------------------------------

/**
 * Use [`split`](#split) instead.
 *
 * @since 2.0.0
 * @deprecated
 */
export function splitStrong<F extends URIS4>(
  F: Category4<F> & Strong4<F>
): <S, R, A, B, C, D>(pab: Kind4<F, S, R, A, B>, pcd: Kind4<F, S, R, C, D>) => Kind4<F, S, R, [A, C], [B, D]>
/** @deprecated */
export function splitStrong<F extends URIS3>(
  F: Category3<F> & Strong3<F>
): <R, A, B, C, D>(pab: Kind3<F, R, A, B>, pcd: Kind3<F, R, C, D>) => Kind3<F, R, [A, C], [B, D]>
/** @deprecated */
export function splitStrong<F extends URIS2>(
  F: Category2<F> & Strong2<F>
): <A, B, C, D>(pab: Kind2<F, A, B>, pcd: Kind2<F, C, D>) => Kind2<F, [A, C], [B, D]>
/** @deprecated */
export function splitStrong<F>(
  F: Category<F> & Strong<F>
): <A, B, C, D>(pab: HKT2<F, A, B>, pcd: HKT2<F, C, D>) => HKT2<F, [A, C], [B, D]>
export function splitStrong<F>(
  F: Category<F> & Strong<F>
): <A, B, C, D>(pab: HKT2<F, A, B>, pcd: HKT2<F, C, D>) => HKT2<F, [A, C], [B, D]> {
  return split(F, F)
}

/**
 * Use [`fanOut`](#fanout) instead.
 *
 * @since 2.0.0
 * @deprecated
 */
export function fanout<F extends URIS4>(
  F: Category4<F> & Strong4<F>
): <S, R, A, B, C>(pab: Kind4<F, S, R, A, B>, pac: Kind4<F, S, R, A, C>) => Kind4<F, S, R, A, [B, C]>
/** @deprecated */
export function fanout<F extends URIS3>(
  F: Category3<F> & Strong3<F>
): <R, A, B, C>(pab: Kind3<F, R, A, B>, pac: Kind3<F, R, A, C>) => Kind3<F, R, A, [B, C]>
/** @deprecated */
export function fanout<F extends URIS2>(
  F: Category2<F> & Strong2<F>
): <A, B, C>(pab: Kind2<F, A, B>, pac: Kind2<F, A, C>) => Kind2<F, A, [B, C]>
/** @deprecated */
export function fanout<F>(
  F: Category<F> & Strong<F>
): <A, B, C>(pab: HKT2<F, A, B>, pac: HKT2<F, A, C>) => HKT2<F, A, [B, C]>
export function fanout<F>(
  F: Category<F> & Strong<F>
): <A, B, C>(pab: HKT2<F, A, B>, pac: HKT2<F, A, C>) => HKT2<F, A, [B, C]> {
  return fanOut(F, F)
}
