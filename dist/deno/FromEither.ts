/**
 * The `FromEither` type class represents those data types which support errors.
 *
 * @since 2.10.0
 */

import { Chain, Chain1, Chain2, Chain2C, Chain3, Chain3C, Chain4, chainFirst } from './Chain.ts'
import { Either, URI as EURI } from './Either.ts'
import { flow, Lazy } from './function.ts'
import { HKT2, Kind, Kind2, Kind3, Kind4, URIS, URIS2, URIS3, URIS4 } from './HKT.ts'
import * as _ from './internal.ts'
import {
  NaturalTransformation12C,
  NaturalTransformation13C,
  NaturalTransformation14C,
  NaturalTransformation21,
  NaturalTransformation22,
  NaturalTransformation22C,
  NaturalTransformation23,
  NaturalTransformation23C,
  NaturalTransformation24
} from './NaturalTransformation.ts'
import { Option, URI as OURI } from './Option.ts'
import { Predicate } from './Predicate.ts'
import { Refinement } from './Refinement.ts'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 2.10.0
 */
export interface FromEither<F> {
  readonly URI: F
  readonly fromEither: <E, A>(e: Either<E, A>) => HKT2<F, E, A>
}

/**
 * @category type classes
 * @since 2.11.0
 */
export interface FromEither1<F extends URIS> {
  readonly URI: F
  readonly fromEither: NaturalTransformation21<EURI, F>
}

/**
 * @category type classes
 * @since 2.10.0
 */
export interface FromEither2<F extends URIS2> {
  readonly URI: F
  readonly fromEither: NaturalTransformation22<EURI, F>
}

/**
 * @category type classes
 * @since 2.10.0
 */
export interface FromEither2C<F extends URIS2, E> {
  readonly URI: F
  readonly _E: E
  readonly fromEither: NaturalTransformation22C<EURI, F, E>
}

/**
 * @category type classes
 * @since 2.10.0
 */
export interface FromEither3<F extends URIS3> {
  readonly URI: F
  readonly fromEither: NaturalTransformation23<EURI, F>
}

/**
 * @category type classes
 * @since 2.10.0
 */
export interface FromEither3C<F extends URIS3, E> {
  readonly URI: F
  readonly _E: E
  readonly fromEither: NaturalTransformation23C<EURI, F, E>
}

/**
 * @category type classes
 * @since 2.10.0
 */
export interface FromEither4<F extends URIS4> {
  readonly URI: F
  readonly fromEither: NaturalTransformation24<EURI, F>
}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @category constructors
 * @since 2.10.0
 */
export function fromOption<F extends URIS4>(
  F: FromEither4<F>
): <E>(onNone: Lazy<E>) => NaturalTransformation14C<OURI, F, E>
export function fromOption<F extends URIS3>(
  F: FromEither3<F>
): <E>(onNone: Lazy<E>) => NaturalTransformation13C<OURI, F, E>
export function fromOption<F extends URIS3, E>(
  F: FromEither3C<F, E>
): (onNone: Lazy<E>) => NaturalTransformation13C<OURI, F, E>
export function fromOption<F extends URIS2>(
  F: FromEither2<F>
): <E>(onNone: Lazy<E>) => NaturalTransformation12C<OURI, F, E>
export function fromOption<F extends URIS2, E>(
  F: FromEither2C<F, E>
): (onNone: Lazy<E>) => NaturalTransformation12C<OURI, F, E>
export function fromOption<F>(F: FromEither<F>): <E>(onNone: Lazy<E>) => <A>(ma: Option<A>) => HKT2<F, E, A>
export function fromOption<F>(F: FromEither<F>): <E>(onNone: Lazy<E>) => <A>(ma: Option<A>) => HKT2<F, E, A> {
  return (onNone) => (ma) => F.fromEither(_.isNone(ma) ? _.left(onNone()) : _.right(ma.value))
}

/**
 * @category constructors
 * @since 2.10.0
 */
export function fromPredicate<F extends URIS4>(
  F: FromEither4<F>
): {
  <A, B extends A, E>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <S, R>(a: A) => Kind4<F, S, R, E, B>
  <A, E>(predicate: Predicate<A>, onFalse: (a: A) => E): <S, R, B extends A>(b: B) => Kind4<F, S, R, E, B>
  <A, E>(predicate: Predicate<A>, onFalse: (a: A) => E): <S, R>(a: A) => Kind4<F, S, R, E, A>
}
export function fromPredicate<F extends URIS3>(
  F: FromEither3<F>
): {
  <A, B extends A, E>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <R>(a: A) => Kind3<F, R, E, B>
  <A, E>(predicate: Predicate<A>, onFalse: (a: A) => E): <R, B extends A>(b: B) => Kind3<F, R, E, B>
  <A, E>(predicate: Predicate<A>, onFalse: (a: A) => E): <R>(a: A) => Kind3<F, R, E, A>
}
export function fromPredicate<F extends URIS3, E>(
  F: FromEither3C<F, E>
): {
  <A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <R>(a: A) => Kind3<F, R, E, B>
  <A>(predicate: Predicate<A>, onFalse: (a: A) => E): <R, B extends A>(b: B) => Kind3<F, R, E, B>
  <A>(predicate: Predicate<A>, onFalse: (a: A) => E): <R>(a: A) => Kind3<F, R, E, A>
}
export function fromPredicate<F extends URIS2>(
  F: FromEither2<F>
): {
  <A, B extends A, E>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (a: A) => Kind2<F, E, B>
  <A, E>(predicate: Predicate<A>, onFalse: (a: A) => E): <B extends A>(b: B) => Kind2<F, E, B>
  <A, E>(predicate: Predicate<A>, onFalse: (a: A) => E): (a: A) => Kind2<F, E, A>
}
export function fromPredicate<F extends URIS2, E>(
  F: FromEither2C<F, E>
): {
  <A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (a: A) => Kind2<F, E, B>
  <A>(predicate: Predicate<A>, onFalse: (a: A) => E): <B extends A>(b: B) => Kind2<F, E, B>
  <A>(predicate: Predicate<A>, onFalse: (a: A) => E): (a: A) => Kind2<F, E, A>
}
export function fromPredicate<F>(
  F: FromEither<F>
): {
  <A, B extends A, E>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (a: A) => HKT2<F, E, B>
  <A, E>(predicate: Predicate<A>, onFalse: (a: A) => E): <B extends A>(b: B) => HKT2<F, E, B>
  <A, E>(predicate: Predicate<A>, onFalse: (a: A) => E): (a: A) => HKT2<F, E, A>
}
export function fromPredicate<F>(
  F: FromEither<F>
): {
  <A, B extends A, E>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (a: A) => HKT2<F, E, B>
  <A, E>(predicate: Predicate<A>, onFalse: (a: A) => E): <B extends A>(b: B) => HKT2<F, E, B>
  <A, E>(predicate: Predicate<A>, onFalse: (a: A) => E): (a: A) => HKT2<F, E, A>
} {
  return <A, E>(predicate: Predicate<A>, onFalse: (a: A) => E) => (a: A) =>
    F.fromEither(predicate(a) ? _.right(a) : _.left(onFalse(a)))
}

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @category combinators
 * @since 2.10.0
 */
export function fromOptionK<F extends URIS4>(
  F: FromEither4<F>
): <E>(
  onNone: Lazy<E>
) => <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Option<B>) => <S, R>(...a: A) => Kind4<F, S, R, E, B>
export function fromOptionK<F extends URIS3>(
  F: FromEither3<F>
): <E>(
  onNone: Lazy<E>
) => <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Option<B>) => <R>(...a: A) => Kind3<F, R, E, B>
export function fromOptionK<F extends URIS3, E>(
  F: FromEither3C<F, E>
): (
  onNone: Lazy<E>
) => <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Option<B>) => <R>(...a: A) => Kind3<F, R, E, B>
export function fromOptionK<F extends URIS2>(
  F: FromEither2<F>
): <E>(
  onNone: Lazy<E>
) => <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Option<B>) => (...a: A) => Kind2<F, E, B>
export function fromOptionK<F extends URIS2, E>(
  F: FromEither2C<F, E>
): (onNone: Lazy<E>) => <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Option<B>) => (...a: A) => Kind2<F, E, B>
export function fromOptionK<F>(
  F: FromEither<F>
): <E>(
  onNone: Lazy<E>
) => <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Option<B>) => (...a: A) => HKT2<F, E, B>
export function fromOptionK<F>(
  F: FromEither<F>
): <E>(
  onNone: Lazy<E>
) => <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Option<B>) => (...a: A) => HKT2<F, E, B> {
  const fromOptionF = fromOption(F)
  return (onNone) => {
    const from = fromOptionF(onNone)
    return (f) => flow(f, from)
  }
}

/**
 * @category combinators
 * @since 2.10.0
 */
export function chainOptionK<F extends URIS4>(
  F: FromEither4<F>,
  M: Chain4<F>
): <E>(onNone: Lazy<E>) => <A, B>(f: (a: A) => Option<B>) => <S, R>(ma: Kind4<F, S, R, E, A>) => Kind4<F, S, R, E, B>
export function chainOptionK<F extends URIS3>(
  F: FromEither3<F>,
  M: Chain3<F>
): <E>(onNone: Lazy<E>) => <A, B>(f: (a: A) => Option<B>) => <R>(ma: Kind3<F, R, E, A>) => Kind3<F, R, E, B>
export function chainOptionK<F extends URIS3, E>(
  F: FromEither3C<F, E>,
  M: Chain3C<F, E>
): (onNone: Lazy<E>) => <A, B>(f: (a: A) => Option<B>) => <R>(ma: Kind3<F, R, E, A>) => Kind3<F, R, E, B>
export function chainOptionK<F extends URIS2>(
  F: FromEither2<F>,
  M: Chain2<F>
): <E>(onNone: Lazy<E>) => <A, B>(f: (a: A) => Option<B>) => (ma: Kind2<F, E, A>) => Kind2<F, E, B>
export function chainOptionK<F extends URIS2, E>(
  F: FromEither2C<F, E>,
  M: Chain2C<F, E>
): (onNone: Lazy<E>) => <A, B>(f: (a: A) => Option<B>) => (ma: Kind2<F, E, A>) => Kind2<F, E, B>
export function chainOptionK<F>(
  F: FromEither<F>,
  M: Chain<F>
): <E>(onNone: Lazy<E>) => <A, B>(f: (a: A) => Option<B>) => (ma: HKT2<F, E, A>) => HKT2<F, E, B>
export function chainOptionK<F extends URIS2>(
  F: FromEither2<F>,
  M: Chain2<F>
): <E>(onNone: Lazy<E>) => <A, B>(f: (a: A) => Option<B>) => (ma: Kind2<F, E, A>) => Kind2<F, E, B> {
  const fromOptionKF = fromOptionK(F)
  return (onNone) => {
    const from = fromOptionKF(onNone)
    return (f) => (ma) => M.chain(ma, from(f))
  }
}

/**
 * @category combinators
 * @since 2.10.0
 */
export function fromEitherK<F extends URIS4>(
  F: FromEither4<F>
): <A extends ReadonlyArray<unknown>, E, B>(f: (...a: A) => Either<E, B>) => <S, R>(...a: A) => Kind4<F, S, R, E, B>
export function fromEitherK<F extends URIS3>(
  F: FromEither3<F>
): <A extends ReadonlyArray<unknown>, E, B>(f: (...a: A) => Either<E, B>) => <R>(...a: A) => Kind3<F, R, E, B>
export function fromEitherK<F extends URIS3, E>(
  F: FromEither3C<F, E>
): <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Either<E, B>) => <R>(...a: A) => Kind3<F, R, E, B>
export function fromEitherK<F extends URIS2>(
  F: FromEither2<F>
): <A extends ReadonlyArray<unknown>, E, B>(f: (...a: A) => Either<E, B>) => (...a: A) => Kind2<F, E, B>
export function fromEitherK<F extends URIS2, E>(
  F: FromEither2C<F, E>
): <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Either<E, B>) => (...a: A) => Kind2<F, E, B>
export function fromEitherK<F extends URIS>(
  F: FromEither1<F>
): <E, A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Either<E, B>) => (...a: A) => Kind<F, B>
export function fromEitherK<F>(
  F: FromEither<F>
): <A extends ReadonlyArray<unknown>, E, B>(f: (...a: A) => Either<E, B>) => (...a: A) => HKT2<F, E, B>
export function fromEitherK<F>(
  F: FromEither<F>
): <A extends ReadonlyArray<unknown>, E, B>(f: (...a: A) => Either<E, B>) => (...a: A) => HKT2<F, E, B> {
  return (f) => flow(f, F.fromEither)
}

/**
 * @category combinators
 * @since 2.10.0
 */
export function chainEitherK<M extends URIS4>(
  F: FromEither4<M>,
  M: Chain4<M>
): <A, E, B>(f: (a: A) => Either<E, B>) => <S, R>(ma: Kind4<M, S, R, E, A>) => Kind4<M, S, R, E, B>
export function chainEitherK<M extends URIS3>(
  F: FromEither3<M>,
  M: Chain3<M>
): <A, E, B>(f: (a: A) => Either<E, B>) => <R>(ma: Kind3<M, R, E, A>) => Kind3<M, R, E, B>
export function chainEitherK<M extends URIS3, E>(
  F: FromEither3C<M, E>,
  M: Chain3C<M, E>
): <A, B>(f: (a: A) => Either<E, B>) => <R>(ma: Kind3<M, R, E, A>) => Kind3<M, R, E, B>
export function chainEitherK<M extends URIS2>(
  F: FromEither2<M>,
  M: Chain2<M>
): <A, E, B>(f: (a: A) => Either<E, B>) => (ma: Kind2<M, E, A>) => Kind2<M, E, B>
export function chainEitherK<M extends URIS2, E>(
  F: FromEither2C<M, E>,
  M: Chain2C<M, E>
): <A, B>(f: (a: A) => Either<E, B>) => (ma: Kind2<M, E, A>) => Kind2<M, E, B>
export function chainEitherK<M extends URIS>(
  F: FromEither1<M>,
  M: Chain1<M>
): <E, A, B>(f: (a: A) => Either<E, B>) => (ma: Kind<M, A>) => Kind<M, B>
export function chainEitherK<M>(
  F: FromEither<M>,
  M: Chain<M>
): <A, E, B>(f: (a: A) => Either<E, B>) => (ma: HKT2<M, E, A>) => HKT2<M, E, B>
export function chainEitherK<M extends URIS2>(
  F: FromEither2<M>,
  M: Chain2<M>
): <A, E, B>(f: (a: A) => Either<E, B>) => (ma: Kind2<M, E, A>) => Kind2<M, E, B> {
  const fromEitherKF = fromEitherK(F)
  return (f) => (ma) => M.chain(ma, fromEitherKF(f))
}

/**
 * @category combinators
 * @since 2.12.0
 */
export function chainFirstEitherK<M extends URIS4>(
  F: FromEither4<M>,
  M: Chain4<M>
): <A, E, B>(f: (a: A) => Either<E, B>) => <S, R>(ma: Kind4<M, S, R, E, A>) => Kind4<M, S, R, E, A>
export function chainFirstEitherK<M extends URIS3>(
  F: FromEither3<M>,
  M: Chain3<M>
): <A, E, B>(f: (a: A) => Either<E, B>) => <R>(ma: Kind3<M, R, E, A>) => Kind3<M, R, E, A>
export function chainFirstEitherK<M extends URIS3, E>(
  F: FromEither3C<M, E>,
  M: Chain3C<M, E>
): <A, B>(f: (a: A) => Either<E, B>) => <R>(ma: Kind3<M, R, E, A>) => Kind3<M, R, E, A>
export function chainFirstEitherK<M extends URIS2>(
  F: FromEither2<M>,
  M: Chain2<M>
): <A, E, B>(f: (a: A) => Either<E, B>) => (ma: Kind2<M, E, A>) => Kind2<M, E, A>
export function chainFirstEitherK<M extends URIS2, E>(
  F: FromEither2C<M, E>,
  M: Chain2C<M, E>
): <A, B>(f: (a: A) => Either<E, B>) => (ma: Kind2<M, E, A>) => Kind2<M, E, A>
export function chainFirstEitherK<M extends URIS>(
  F: FromEither1<M>,
  M: Chain1<M>
): <E, A, B>(f: (a: A) => Either<E, B>) => (ma: Kind<M, A>) => Kind<M, A>
export function chainFirstEitherK<M>(
  F: FromEither<M>,
  M: Chain<M>
): <A, E, B>(f: (a: A) => Either<E, B>) => (ma: HKT2<M, E, A>) => HKT2<M, E, A>
export function chainFirstEitherK<M extends URIS2>(
  F: FromEither2<M>,
  M: Chain2<M>
): <A, E, B>(f: (a: A) => Either<E, B>) => (ma: Kind2<M, E, A>) => Kind2<M, E, A> {
  return flow(fromEitherK(F), chainFirst(M))
}

/**
 * @category combinators
 * @since 2.10.0
 */
export function filterOrElse<M extends URIS4>(
  F: FromEither4<M>,
  M: Chain4<M>
): {
  <A, B extends A, E>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <S, R>(
    ma: Kind4<M, S, R, E, A>
  ) => Kind4<M, S, R, E, B>
  <A, E>(predicate: Predicate<A>, onFalse: (a: A) => E): <S, R, B extends A>(
    mb: Kind4<M, S, R, E, B>
  ) => Kind4<M, S, R, E, B>
  <A, E>(predicate: Predicate<A>, onFalse: (a: A) => E): <S, R>(ma: Kind4<M, S, R, E, A>) => Kind4<M, S, R, E, A>
}
export function filterOrElse<M extends URIS3>(
  F: FromEither3<M>,
  M: Chain3<M>
): {
  <A, B extends A, E>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <R>(
    ma: Kind3<M, R, E, A>
  ) => Kind3<M, R, E, B>
  <A, E>(predicate: Predicate<A>, onFalse: (a: A) => E): <R, B extends A>(mb: Kind3<M, R, E, B>) => Kind3<M, R, E, B>
  <A, E>(predicate: Predicate<A>, onFalse: (a: A) => E): <R>(ma: Kind3<M, R, E, A>) => Kind3<M, R, E, A>
}
export function filterOrElse<M extends URIS3, E>(
  F: FromEither3C<M, E>,
  M: Chain3C<M, E>
): {
  <A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <R>(ma: Kind3<M, R, E, A>) => Kind3<M, R, E, B>
  <A>(predicate: Predicate<A>, onFalse: (a: A) => E): <R, B extends A>(mb: Kind3<M, R, E, B>) => Kind3<M, R, E, B>
  <A>(predicate: Predicate<A>, onFalse: (a: A) => E): <R>(ma: Kind3<M, R, E, A>) => Kind3<M, R, E, A>
}
export function filterOrElse<M extends URIS2>(
  F: FromEither2<M>,
  M: Chain2<M>
): {
  <A, B extends A, E>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (ma: Kind2<M, E, A>) => Kind2<M, E, B>
  <A, E>(predicate: Predicate<A>, onFalse: (a: A) => E): <B extends A>(mb: Kind2<M, E, B>) => Kind2<M, E, B>
  <A, E>(predicate: Predicate<A>, onFalse: (a: A) => E): (ma: Kind2<M, E, A>) => Kind2<M, E, A>
}
export function filterOrElse<M extends URIS2, E>(
  F: FromEither2C<M, E>,
  M: Chain2C<M, E>
): {
  <A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (ma: Kind2<M, E, A>) => Kind2<M, E, B>
  <A>(predicate: Predicate<A>, onFalse: (a: A) => E): <B extends A>(mb: Kind2<M, E, B>) => Kind2<M, E, B>
  <A>(predicate: Predicate<A>, onFalse: (a: A) => E): (ma: Kind2<M, E, A>) => Kind2<M, E, A>
}
export function filterOrElse<M extends URIS2>(
  F: FromEither<M>,
  M: Chain<M>
): {
  <A, B extends A, E>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (ma: HKT2<M, E, A>) => HKT2<M, E, B>
  <A, E>(predicate: Predicate<A>, onFalse: (a: A) => E): <B extends A>(mb: HKT2<M, E, B>) => HKT2<M, E, B>
  <A, E>(predicate: Predicate<A>, onFalse: (a: A) => E): (ma: HKT2<M, E, A>) => HKT2<M, E, A>
}
export function filterOrElse<M extends URIS2>(
  F: FromEither2<M>,
  M: Chain2<M>
): {
  <A, B extends A, E>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (ma: Kind2<M, E, A>) => Kind2<M, E, B>
  <A, E>(predicate: Predicate<A>, onFalse: (a: A) => E): <B extends A>(mb: Kind2<M, E, B>) => Kind2<M, E, B>
  <A, E>(predicate: Predicate<A>, onFalse: (a: A) => E): (ma: Kind2<M, E, A>) => Kind2<M, E, A>
} {
  return <A, E>(predicate: Predicate<A>, onFalse: (a: A) => E) => (ma: Kind2<M, E, A>): Kind2<M, E, A> =>
    M.chain(ma, (a) => F.fromEither(predicate(a) ? _.right(a) : _.left(onFalse(a))))
}
