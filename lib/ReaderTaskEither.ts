/**
 * @since 2.0.0
 */
import { Alt3, Alt3C } from "./Alt.ts";
import {
  Applicative3,
  Applicative3C,
  getApplicativeMonoid,
} from "./Applicative.ts";
import {
  ap as ap_,
  apFirst as apFirst_,
  Apply1,
  Apply3,
  apS as apS_,
  apSecond as apSecond_,
  getApplySemigroup as getApplySemigroup_,
} from "./Apply.ts";
import { Bifunctor3 } from "./Bifunctor.ts";
import { bind as bind_, Chain3, chainFirst as chainFirst_ } from "./Chain.ts";
import {
  compact as compact_,
  Compactable3C,
  separate as separate_,
} from "./Compactable.ts";
import * as E from "./Either.ts";
import * as ET from "./EitherT.ts";
import {
  filter as filter_,
  Filterable3C,
  filterMap as filterMap_,
  partition as partition_,
  partitionMap as partitionMap_,
} from "./Filterable.ts";
import {
  chainEitherK as chainEitherK_,
  chainFirstEitherK as chainFirstEitherK_,
  chainOptionK as chainOptionK_,
  filterOrElse as filterOrElse_,
  FromEither3,
  fromEitherK as fromEitherK_,
  fromOption as fromOption_,
  fromOptionK as fromOptionK_,
  fromPredicate as fromPredicate_,
} from "./FromEither.ts";
import {
  chainFirstIOK as chainFirstIOK_,
  chainIOK as chainIOK_,
  FromIO3,
  fromIOK as fromIOK_,
} from "./FromIO.ts";
import {
  ask as ask_,
  asks as asks_,
  chainFirstReaderK as chainFirstReaderK_,
  chainReaderK as chainReaderK_,
  FromReader3,
  fromReaderK as fromReaderK_,
} from "./FromReader.ts";
import {
  chainFirstTaskK as chainFirstTaskK_,
  chainTaskK as chainTaskK_,
  FromTask3,
  fromTaskK as fromTaskK_,
} from "./FromTask.ts";
import { flow, identity, Lazy, pipe, SK } from "./function.ts";
import { bindTo as bindTo_, flap as flap_, Functor3 } from "./Functor.ts";
import * as _ from "./internal.ts";
import { IO } from "./IO.ts";
import { IOEither, URI as IEURI } from "./IOEither.ts";
import { Monad3, Monad3C } from "./Monad.ts";
import { MonadIO3 } from "./MonadIO.ts";
import { MonadTask3, MonadTask3C } from "./MonadTask.ts";
import { MonadThrow3, MonadThrow3C } from "./MonadThrow.ts";
import { Monoid } from "./Monoid.ts";
import {
  NaturalTransformation13C,
  NaturalTransformation23,
  NaturalTransformation33,
} from "./NaturalTransformation.ts";
import { URI as OURI } from "./Option.ts";
import { Pointed3 } from "./Pointed.ts";
import { Predicate } from "./Predicate.ts";
import * as R from "./Reader.ts";
import { ReaderEither, URI as REURI } from "./ReaderEither.ts";
import * as RT from "./ReaderTask.ts";
import { ReadonlyNonEmptyArray } from "./ReadonlyNonEmptyArray.ts";
import { Refinement } from "./Refinement.ts";
import { Semigroup } from "./Semigroup.ts";
import * as T from "./Task.ts";
import * as TE from "./TaskEither.ts";

import Either = E.Either;
import Task = T.Task;
import TaskEither = TE.TaskEither;
import Reader = R.Reader;
import ReaderTask = RT.ReaderTask;

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 2.0.0
 */
export interface ReaderTaskEither<R, E, A> {
  (r: R): TaskEither<E, A>;
}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @category natural transformations
 * @since 2.0.0
 */
export const fromTaskEither: NaturalTransformation23<TE.URI, URI> =
  /*#__PURE__*/
  R.of;

/**
 * @category constructors
 * @since 2.0.0
 */
export const left: <R, E = never, A = never>(
  e: E,
) => ReaderTaskEither<R, E, A> =
  /*#__PURE__*/
  ET.left(RT.Pointed);

/**
 * @category constructors
 * @since 2.0.0
 */
export const right: <R, E = never, A = never>(
  a: A,
) => ReaderTaskEither<R, E, A> =
  /*#__PURE__*/
  ET.right(RT.Pointed);

/**
 * @category constructors
 * @since 2.0.0
 */
export const rightTask: <R, E = never, A = never>(
  ma: Task<A>,
) => ReaderTaskEither<R, E, A> =
  /*#__PURE__*/
  flow(TE.rightTask, fromTaskEither);

/**
 * @category constructors
 * @since 2.0.0
 */
export const leftTask: <R, E = never, A = never>(
  me: Task<E>,
) => ReaderTaskEither<R, E, A> =
  /*#__PURE__*/
  flow(TE.leftTask, fromTaskEither);

/**
 * @category constructors
 * @since 2.0.0
 */
export const rightReader: <R, E = never, A = never>(
  ma: Reader<R, A>,
) => ReaderTaskEither<R, E, A> = (ma) => flow(ma, TE.right);

/**
 * @category constructors
 * @since 2.0.0
 */
export const leftReader: <R, E = never, A = never>(
  me: Reader<R, E>,
) => ReaderTaskEither<R, E, A> = (me) => flow(me, TE.left);

/**
 * @category constructors
 * @since 2.5.0
 */
export const rightReaderTask: <R, E = never, A = never>(
  ma: ReaderTask<R, A>,
) => ReaderTaskEither<R, E, A> =
  /*#__PURE__*/
  ET.rightF(RT.Functor);

/**
 * @category constructors
 * @since 2.5.0
 */
export const leftReaderTask: <R, E = never, A = never>(
  me: ReaderTask<R, E>,
) => ReaderTaskEither<R, E, A> =
  /*#__PURE__*/
  ET.leftF(RT.Functor);

/**
 * @category constructors
 * @since 2.0.0
 */
export const rightIO: <R, E = never, A = never>(
  ma: IO<A>,
) => ReaderTaskEither<R, E, A> =
  /*#__PURE__*/
  flow(TE.rightIO, fromTaskEither);

/**
 * @category constructors
 * @since 2.0.0
 */
export const leftIO: <R, E = never, A = never>(
  me: IO<E>,
) => ReaderTaskEither<R, E, A> =
  /*#__PURE__*/
  flow(TE.leftIO, fromTaskEither);

// -------------------------------------------------------------------------------------
// natural transformations
// -------------------------------------------------------------------------------------

/**
 * @category natural transformations
 * @since 2.0.0
 */
export const fromEither: FromEither3<URI>["fromEither"] = RT.of;

/**
 * @category natural transformations
 * @since 2.11.0
 */
export const fromReader: FromReader3<URI>["fromReader"] = rightReader;

/**
 * @category natural transformations
 * @since 2.0.0
 */
export const fromIO: FromIO3<URI>["fromIO"] = rightIO;

/**
 * @category natural transformations
 * @since 2.0.0
 */
export const fromTask: FromTask3<URI>["fromTask"] = rightTask;

/**
 * @category natural transformations
 * @since 2.0.0
 */
export const fromIOEither: NaturalTransformation23<IEURI, URI> =
  /*#__PURE__*/
  flow(TE.fromIOEither, fromTaskEither);

/**
 * @category constructors
 * @since 2.0.0
 */
export const fromReaderEither: NaturalTransformation33<REURI, URI> = (ma) =>
  flow(ma, TE.fromEither);

// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------

/**
 * @category destructors
 * @since 2.10.0
 */
export const match: <E, B, A>(
  onLeft: (e: E) => B,
  onRight: (a: A) => B,
) => <R>(ma: ReaderTaskEither<R, E, A>) => ReaderTask<R, B> =
  /*#__PURE__*/
  ET.match(RT.Functor);

/**
 * Less strict version of [`match`](#match).
 *
 * @category destructors
 * @since 2.10.0
 */
export const matchW: <E, B, A, C>(
  onLeft: (e: E) => B,
  onRight: (a: A) => C,
) => <R>(ma: ReaderTaskEither<R, E, A>) => ReaderTask<R, B | C> = match as any;

/**
 * @category destructors
 * @since 2.10.0
 */
export const matchE: <R, E, A, B>(
  onLeft: (e: E) => ReaderTask<R, B>,
  onRight: (a: A) => ReaderTask<R, B>,
) => (ma: ReaderTaskEither<R, E, A>) => ReaderTask<R, B> =
  /*#__PURE__*/
  ET.matchE(RT.Chain);

/**
 * Alias of [`matchE`](#matche).
 *
 * @category destructors
 * @since 2.0.0
 */
export const fold = matchE;

/**
 * Less strict version of [`matchE`](#matche).
 *
 * @category destructors
 * @since 2.10.0
 */
export const matchEW: <E, R2, B, A, R3, C>(
  onLeft: (e: E) => ReaderTask<R2, B>,
  onRight: (a: A) => ReaderTask<R3, C>,
) => <R1>(ma: ReaderTaskEither<R1, E, A>) => ReaderTask<R1 & R2 & R3, B | C> =
  matchE as any;

/**
 * Alias of [`matchEW`](#matchew).
 *
 * @category destructors
 * @since 2.10.0
 */
export const foldW = matchEW;

/**
 * @category destructors
 * @since 2.0.0
 */
export const getOrElse: <R, E, A>(
  onLeft: (e: E) => ReaderTask<R, A>,
) => (ma: ReaderTaskEither<R, E, A>) => ReaderTask<R, A> =
  /*#__PURE__*/
  ET.getOrElse(RT.Monad);

/**
 * Less strict version of [`getOrElse`](#getorelse).
 *
 * @category destructors
 * @since 2.6.0
 */
export const getOrElseW: <R2, E, B>(
  onLeft: (e: E) => ReaderTask<R2, B>,
) => <R1, A>(ma: ReaderTaskEither<R1, E, A>) => ReaderTask<R1 & R2, A | B> =
  getOrElse as any;

// -------------------------------------------------------------------------------------
// interop
// -------------------------------------------------------------------------------------

/**
 * @category interop
 * @since 2.10.0
 */
export const toUnion: <R, E, A>(
  fa: ReaderTaskEither<R, E, A>,
) => ReaderTask<R, E | A> =
  /*#__PURE__*/
  ET.toUnion(RT.Functor);

/**
 * @category interop
 * @since 2.12.0
 */
export const fromNullable: <E>(
  e: E,
) => <R, A>(a: A) => ReaderTaskEither<R, E, NonNullable<A>> =
  /*#__PURE__*/
  ET.fromNullable(RT.Pointed);

/**
 * @category interop
 * @since 2.12.0
 */
export const fromNullableK: <E>(
  e: E,
) => <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => B | null | undefined,
) => <R>(...a: A) => ReaderTaskEither<R, E, NonNullable<B>> =
  /*#__PURE__*/
  ET.fromNullableK(RT.Pointed);

/**
 * @category interop
 * @since 2.12.0
 */
export const chainNullableK: <E>(
  e: E,
) => <A, B>(
  f: (a: A) => B | null | undefined,
) => <R>(
  ma: ReaderTaskEither<R, E, A>,
) => ReaderTaskEither<R, E, NonNullable<B>> =
  /*#__PURE__*/
  ET.chainNullableK(RT.Monad);

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * Changes the value of the local context during the execution of the action `ma` (similar to `Contravariant`'s
 * `contramap`).
 *
 * @category combinators
 * @since 2.0.0
 */
export const local: <R2, R1>(
  f: (r2: R2) => R1,
) => <E, A>(ma: ReaderTaskEither<R1, E, A>) => ReaderTaskEither<R2, E, A> =
  R.local;

/**
 * Less strict version of [`asksReaderTaskEither`](#asksreadertaskeither).
 *
 * @category combinators
 * @since 2.11.0
 */
export const asksReaderTaskEitherW: <R1, R2, E, A>(
  f: (r1: R1) => ReaderTaskEither<R2, E, A>,
) => ReaderTaskEither<R1 & R2, E, A> = R.asksReaderW;

/**
 * Effectfully accesses the environment.
 *
 * @category combinators
 * @since 2.11.0
 */
export const asksReaderTaskEither: <R, E, A>(
  f: (r: R) => ReaderTaskEither<R, E, A>,
) => ReaderTaskEither<R, E, A> = asksReaderTaskEitherW;

/**
 * @category combinators
 * @since 2.0.0
 */
export const orElse: <R, E1, A, E2>(
  onLeft: (e: E1) => ReaderTaskEither<R, E2, A>,
) => (ma: ReaderTaskEither<R, E1, A>) => ReaderTaskEither<R, E2, A> =
  /*#__PURE__*/
  ET.orElse(RT.Monad);

/**
 * Less strict version of [`orElse`](#orelse).
 *
 * @category combinators
 * @since 2.10.0
 */
export const orElseW: <E1, R1, E2, B>(
  onLeft: (e: E1) => ReaderTaskEither<R1, E2, B>,
) => <R2, A>(
  ma: ReaderTaskEither<R2, E1, A>,
) => ReaderTaskEither<R1 & R2, E2, A | B> = orElse as any;

/**
 * @category combinators
 * @since 2.11.0
 */
export const orElseFirst: <E, R, B>(
  onLeft: (e: E) => ReaderTaskEither<R, E, B>,
) => <A>(ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, A> =
  /*#__PURE__*/
  ET.orElseFirst(RT.Monad);

/**
 * @category combinators
 * @since 2.11.0
 */
export const orElseFirstW: <E1, R2, E2, B>(
  onLeft: (e: E1) => ReaderTaskEither<R2, E2, B>,
) => <R1, A>(
  ma: ReaderTaskEither<R1, E1, A>,
) => ReaderTaskEither<R1 & R2, E1 | E2, A> = orElseFirst as any;

/**
 * @category combinators
 * @since 2.11.0
 */
export const orLeft: <E1, R, E2>(
  onLeft: (e: E1) => ReaderTask<R, E2>,
) => <A>(fa: ReaderTaskEither<R, E1, A>) => ReaderTaskEither<R, E2, A> =
  /*#__PURE__*/
  ET.orLeft(RT.Monad);

/**
 * @category combinators
 * @since 2.0.0
 */
export const swap: <R, E, A>(
  ma: ReaderTaskEither<R, E, A>,
) => ReaderTaskEither<R, A, E> =
  /*#__PURE__*/
  ET.swap(RT.Functor);

/**
 * @category combinators
 * @since 2.4.0
 */
export const fromIOEitherK = <E, A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => IOEither<E, B>,
): (<R>(...a: A) => ReaderTaskEither<R, E, B>) => flow(f, fromIOEither);

/**
 * Less strict version of [`chainIOEitherK`](#chainioeitherk).
 *
 * @category combinators
 * @since 2.6.1
 */
export const chainIOEitherKW: <E2, A, B>(
  f: (a: A) => IOEither<E2, B>,
) => <R, E1>(
  ma: ReaderTaskEither<R, E1, A>,
) => ReaderTaskEither<R, E1 | E2, B> = (f) => chainW(fromIOEitherK(f));

/**
 * @category combinators
 * @since 2.4.0
 */
export const chainIOEitherK: <E, A, B>(
  f: (a: A) => IOEither<E, B>,
) => <R>(ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, B> =
  chainIOEitherKW;

/**
 * @category combinators
 * @since 2.4.0
 */
export const fromTaskEitherK = <E, A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => TaskEither<E, B>,
): (<R>(...a: A) => ReaderTaskEither<R, E, B>) => flow(f, fromTaskEither);

/**
 * Less strict version of [`chainTaskEitherK`](#chaintaskeitherk).
 *
 * @category combinators
 * @since 2.6.1
 */
export const chainTaskEitherKW: <E2, A, B>(
  f: (a: A) => TaskEither<E2, B>,
) => <R, E1>(
  ma: ReaderTaskEither<R, E1, A>,
) => ReaderTaskEither<R, E1 | E2, B> = (f) => chainW(fromTaskEitherK(f));

/**
 * @category combinators
 * @since 2.4.0
 */
export const chainTaskEitherK: <E, A, B>(
  f: (a: A) => TaskEither<E, B>,
) => <R>(ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, B> =
  chainTaskEitherKW;

/**
 * Less strict version of [`chainFirstTaskEitherK`](#chainfirsttaskeitherk).
 *
 * @category combinators
 * @since 2.11.0
 */
export const chainFirstTaskEitherKW: <E2, A, B>(
  f: (a: A) => TaskEither<E2, B>,
) => <R, E1>(
  ma: ReaderTaskEither<R, E1, A>,
) => ReaderTaskEither<R, E1 | E2, A> = (f) => chainFirstW(fromTaskEitherK(f));

/**
 * @category combinators
 * @since 2.11.0
 */
export const chainFirstTaskEitherK: <E, A, B>(
  f: (a: A) => TaskEither<E, B>,
) => <R>(ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, A> =
  chainFirstTaskEitherKW;

/**
 * @category combinators
 * @since 2.11.0
 */
export const fromReaderEitherK = <R, E, A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => ReaderEither<R, E, B>,
): ((...a: A) => ReaderTaskEither<R, E, B>) => flow(f, fromReaderEither);

/**
 * Less strict version of [`chainReaderEitherK`](#chainreadereitherk).
 *
 * @category combinators
 * @since 2.11.0
 */
export const chainReaderEitherKW: <R2, E2, A, B>(
  f: (a: A) => ReaderEither<R2, E2, B>,
) => <R1, E1>(
  ma: ReaderTaskEither<R1, E1, A>,
) => ReaderTaskEither<R1 & R2, E1 | E2, B> = (f) =>
  chainW(fromReaderEitherK(f));

/**
 * @category combinators
 * @since 2.11.0
 */
export const chainReaderEitherK: <R, E, A, B>(
  f: (a: A) => ReaderEither<R, E, B>,
) => (ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, B> =
  chainReaderEitherKW;

/**
 * Less strict version of [`chainFirstReaderEitherK`](#chainfirstreadereitherk).
 *
 * @category combinators
 * @since 2.11.0
 */
export const chainFirstReaderEitherKW: <R2, E2, A, B>(
  f: (a: A) => ReaderEither<R2, E2, B>,
) => <R1, E1>(
  ma: ReaderTaskEither<R1, E1, A>,
) => ReaderTaskEither<R1 & R2, E1 | E2, A> = (f) =>
  chainFirstW(fromReaderEitherK(f));

/**
 * @category combinators
 * @since 2.11.0
 */
export const chainFirstReaderEitherK: <R, E, A, B>(
  f: (a: A) => ReaderEither<R, E, B>,
) => (ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, A> =
  chainFirstReaderEitherKW;

// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------

const _map: Functor3<URI>["map"] = (fa, f) => pipe(fa, map(f));
const _apPar: Apply3<URI>["ap"] = (fab, fa) => pipe(fab, ap(fa));
const _apSeq: Apply3<URI>["ap"] = (fab, fa) =>
  pipe(
    fab,
    chain((f: (a: unknown) => unknown) => pipe(fa, map(f))),
  );
/* istanbul ignore next */
const _chain: Chain3<URI>["chain"] = (ma, f) => pipe(ma, chain(f));
/* istanbul ignore next */
const _alt: Alt3<URI>["alt"] = (fa, that) => pipe(fa, alt(that));
/* istanbul ignore next */
const _bimap: Bifunctor3<URI>["bimap"] = (fa, f, g) => pipe(fa, bimap(f, g));
/* istanbul ignore next */
const _mapLeft: Bifunctor3<URI>["mapLeft"] = (fa, f) => pipe(fa, mapLeft(f));

// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------

/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 2.0.0
 */
export const map: <A, B>(
  f: (a: A) => B,
) => <R, E>(fa: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, B> =
  /*#__PURE__*/
  ET.map(RT.Functor);

/**
 * Map a pair of functions over the two last type arguments of the bifunctor.
 *
 * @category Bifunctor
 * @since 2.0.0
 */
export const bimap: <E, G, A, B>(
  f: (e: E) => G,
  g: (a: A) => B,
) => <R>(fa: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, G, B> =
  /*#__PURE__*/
  ET.bimap(RT.Functor);

/**
 * Map a function over the second type argument of a bifunctor.
 *
 * @category Bifunctor
 * @since 2.0.0
 */
export const mapLeft: <E, G>(
  f: (e: E) => G,
) => <R, A>(fa: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, G, A> =
  /*#__PURE__*/
  ET.mapLeft(RT.Functor);

/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 2.0.0
 */
export const ap: <R, E, A>(
  fa: ReaderTaskEither<R, E, A>,
) => <B>(
  fab: ReaderTaskEither<R, E, (a: A) => B>,
) => ReaderTaskEither<R, E, B> =
  /*#__PURE__*/
  ET.ap(RT.ApplyPar);

/**
 * Less strict version of [`ap`](#ap).
 *
 * @category Apply
 * @since 2.8.0
 */
export const apW: <R2, E2, A>(
  fa: ReaderTaskEither<R2, E2, A>,
) => <R1, E1, B>(
  fab: ReaderTaskEither<R1, E1, (a: A) => B>,
) => ReaderTaskEither<R1 & R2, E1 | E2, B> = ap as any;

/**
 * @category Pointed
 * @since 2.7.0
 */
export const of: <R, E = never, A = never>(a: A) => ReaderTaskEither<R, E, A> =
  right;

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Monad
 * @since 2.0.0
 */
export const chain: <R, E, A, B>(
  f: (a: A) => ReaderTaskEither<R, E, B>,
) => (ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, B> =
  /*#__PURE__*/
  ET.chain(RT.Monad);

/**
 * Less strict version of [`chain`](#chain).
 *
 * @category Monad
 * @since 2.6.0
 */
export const chainW: <R2, E2, A, B>(
  f: (a: A) => ReaderTaskEither<R2, E2, B>,
) => <R1, E1>(
  ma: ReaderTaskEither<R1, E1, A>,
) => ReaderTaskEither<R1 & R2, E1 | E2, B> = chain as any;

/**
 * Less strict version of [`flatten`](#flatten).
 *
 * @category combinators
 * @since 2.11.0
 */
export const flattenW: <R1, E1, R2, E2, A>(
  mma: ReaderTaskEither<R1, E1, ReaderTaskEither<R2, E2, A>>,
) => ReaderTaskEither<R1 & R2, E1 | E2, A> =
  /*#__PURE__*/
  chainW(identity);

/**
 * Derivable from `Chain`.
 *
 * @category combinators
 * @since 2.0.0
 */
export const flatten: <R, E, A>(
  mma: ReaderTaskEither<R, E, ReaderTaskEither<R, E, A>>,
) => ReaderTaskEither<R, E, A> = flattenW;

/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * @category Alt
 * @since 2.0.0
 */
export const alt: <R, E, A>(
  that: () => ReaderTaskEither<R, E, A>,
) => (fa: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, A> =
  /*#__PURE__*/
  ET.alt(RT.Monad);

/**
 * Less strict version of [`alt`](#alt).
 *
 * @category Alt
 * @since 2.9.0
 */
export const altW: <R2, E2, B>(
  that: () => ReaderTaskEither<R2, E2, B>,
) => <R1, E1, A>(
  fa: ReaderTaskEither<R1, E1, A>,
) => ReaderTaskEither<R1 & R2, E2, A | B> = alt as any;

/**
 * @category MonadThrow
 * @since 2.0.0
 */
export const throwError: MonadThrow3<URI>["throwError"] = left;

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 2.0.0
 */
export const URI = "ReaderTaskEither";

/**
 * @category instances
 * @since 2.0.0
 */
export type URI = typeof URI;

declare module "./HKT.ts" {
  interface URItoKind3<R, E, A> {
    readonly [URI]: ReaderTaskEither<R, E, A>;
  }
}

/**
 * @category instances
 * @since 2.10.0
 */
export const getCompactable = <E>(M: Monoid<E>): Compactable3C<URI, E> => {
  const C = E.getCompactable(M);
  return {
    URI,
    _E: undefined as any,
    compact: compact_(RT.Functor, C),
    separate: separate_(RT.Functor, C, E.Functor),
  };
};

/**
 * @category instances
 * @since 2.10.0
 */
export function getFilterable<E>(M: Monoid<E>): Filterable3C<URI, E> {
  const F = E.getFilterable(M);
  const C = getCompactable(M);

  const filter = filter_(RT.Functor, F);
  const filterMap = filterMap_(RT.Functor, F);
  const partition = partition_(RT.Functor, F);
  const partitionMap = partitionMap_(RT.Functor, F);
  return {
    URI,
    _E: undefined as any,
    map: _map,
    compact: C.compact,
    separate: C.separate,
    filter: <R, A>(fa: ReaderTaskEither<R, E, A>, predicate: Predicate<A>) =>
      pipe(fa, filter(predicate)),
    filterMap: (fa, f) => pipe(fa, filterMap(f)),
    partition: <R, A>(fa: ReaderTaskEither<R, E, A>, predicate: Predicate<A>) =>
      pipe(fa, partition(predicate)),
    partitionMap: (fa, f) => pipe(fa, partitionMap(f)),
  };
}

/**
 * @category instances
 * @since 2.7.0
 */
export function getApplicativeReaderTaskValidation<E>(
  A: Apply1<T.URI>,
  S: Semigroup<E>,
): Applicative3C<URI, E> {
  const ap = ap_(R.Apply, TE.getApplicativeTaskValidation(A, S));
  return {
    URI,
    _E: undefined as any,
    map: _map,
    ap: (fab, fa) => pipe(fab, ap(fa)),
    of,
  };
}

/**
 * @category instances
 * @since 2.7.0
 */
export function getAltReaderTaskValidation<E>(S: Semigroup<E>): Alt3C<URI, E> {
  const alt = ET.altValidation(RT.Monad, S);
  return {
    URI,
    _E: undefined as any,
    map: _map,
    alt: (fa, that) => pipe(fa, alt(that)),
  };
}

/**
 * @category instances
 * @since 2.7.0
 */
export const Functor: Functor3<URI> = {
  URI,
  map: _map,
};

/**
 * Derivable from `Functor`.
 *
 * @category combinators
 * @since 2.10.0
 */
export const flap =
  /*#__PURE__*/
  flap_(Functor);

/**
 * @category instances
 * @since 2.10.0
 */
export const Pointed: Pointed3<URI> = {
  URI,
  of,
};

/**
 * @category instances
 * @since 2.10.0
 */
export const ApplyPar: Apply3<URI> = {
  URI,
  map: _map,
  ap: _apPar,
};

/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 2.0.0
 */
export const apFirst =
  /*#__PURE__*/
  apFirst_(ApplyPar);

/**
 * Less strict version of [`apFirst`](#apfirst).
 *
 * @category combinators
 * @since 2.12.0
 */
export const apFirstW: <R2, E2, A, B>(
  second: ReaderTaskEither<R2, E2, B>,
) => <R1, E1>(
  first: ReaderTaskEither<R1, E1, A>,
) => ReaderTaskEither<R1 & R2, E1 | E2, A> = apFirst as any;

/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 2.0.0
 */
export const apSecond =
  /*#__PURE__*/
  apSecond_(ApplyPar);

/**
 * Less strict version of [`apSecond`](#apsecond).
 *
 * @category combinators
 * @since 2.12.0
 */
export const apSecondW: <R2, E2, A, B>(
  second: ReaderTaskEither<R2, E2, B>,
) => <R1, E1>(
  first: ReaderTaskEither<R1, E1, A>,
) => ReaderTaskEither<R1 & R2, E1 | E2, B> = apSecond as any;

/**
 * @category instances
 * @since 2.7.0
 */
export const ApplicativePar: Applicative3<URI> = {
  URI,
  map: _map,
  ap: _apPar,
  of,
};

/**
 * @category instances
 * @since 2.10.0
 */
export const ApplySeq: Apply3<URI> = {
  URI,
  map: _map,
  ap: _apSeq,
};

/**
 * @category instances
 * @since 2.7.0
 */
export const ApplicativeSeq: Applicative3<URI> = {
  URI,
  map: _map,
  ap: _apSeq,
  of,
};

/**
 * @category instances
 * @since 2.10.0
 */
export const Chain: Chain3<URI> = {
  URI,
  map: _map,
  ap: _apPar,
  chain: _chain,
};

/**
 * @category instances
 * @since 2.10.0
 */
export const Monad: Monad3<URI> = {
  URI,
  map: _map,
  ap: _apPar,
  chain: _chain,
  of,
};

/**
 * @category instances
 * @since 2.10.0
 */
export const MonadIO: MonadIO3<URI> = {
  URI,
  map: _map,
  ap: _apPar,
  chain: _chain,
  of,
  fromIO,
};

/**
 * @category instances
 * @since 2.10.0
 */
export const MonadTask: MonadTask3<URI> = {
  URI,
  map: _map,
  ap: _apPar,
  chain: _chain,
  of,
  fromIO,
  fromTask,
};

/**
 * @category instances
 * @since 2.10.0
 */
export const MonadThrow: MonadThrow3<URI> = {
  URI,
  map: _map,
  ap: _apPar,
  chain: _chain,
  of,
  throwError,
};

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * Derivable from `Chain`.
 *
 * @category combinators
 * @since 2.0.0
 */
export const chainFirst: <R, E, A, B>(
  f: (a: A) => ReaderTaskEither<R, E, B>,
) => (ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, A> =
  /*#__PURE__*/
  chainFirst_(Chain);

/**
 * Less strict version of [`chainFirst`](#chainfirst).
 *
 * Derivable from `Chain`.
 *
 * @category combinators
 * @since 2.8.0
 */
export const chainFirstW: <R2, E2, A, B>(
  f: (a: A) => ReaderTaskEither<R2, E2, B>,
) => <R1, E1>(
  ma: ReaderTaskEither<R1, E1, A>,
) => ReaderTaskEither<R1 & R2, E1 | E2, A> = chainFirst as any;

/**
 * @category instances
 * @since 2.7.0
 */
export const Bifunctor: Bifunctor3<URI> = {
  URI,
  bimap: _bimap,
  mapLeft: _mapLeft,
};

/**
 * @category instances
 * @since 2.7.0
 */
export const Alt: Alt3<URI> = {
  URI,
  map: _map,
  alt: _alt,
};

/**
 * @category instances
 * @since 2.11.0
 */
export const FromReader: FromReader3<URI> = {
  URI,
  fromReader,
};

/**
 * Reads the current context.
 *
 * @category constructors
 * @since 2.0.0
 */
export const ask: <R, E = never>() => ReaderTaskEither<R, E, R> =
  /*#__PURE__*/
  ask_(FromReader);

/**
 * Projects a value from the global context in a `ReaderEither`.
 *
 * @category constructors
 * @since 2.0.0
 */
export const asks: <R, A, E = never>(
  f: (r: R) => A,
) => ReaderTaskEither<R, E, A> =
  /*#__PURE__*/
  asks_(FromReader);

/**
 * @category combinators
 * @since 2.11.0
 */
export const fromReaderK: <A extends ReadonlyArray<unknown>, R, B>(
  f: (...a: A) => Reader<R, B>,
) => <E = never>(...a: A) => ReaderTaskEither<R, E, B> =
  /*#__PURE__*/
  fromReaderK_(FromReader);

/**
 * @category combinators
 * @since 2.11.0
 */
export const chainReaderK: <A, R, B>(
  f: (a: A) => Reader<R, B>,
) => <E = never>(ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, B> =
  /*#__PURE__*/
  chainReaderK_(FromReader, Chain);

/**
 * Less strict version of [`chainReaderK`](#chainreaderk).
 *
 * @category combinators
 * @since 2.11.0
 */
export const chainReaderKW: <A, R1, B>(
  f: (a: A) => R.Reader<R1, B>,
) => <R2, E = never>(
  ma: ReaderTaskEither<R2, E, A>,
) => ReaderTaskEither<R1 & R2, E, B> = chainReaderK as any;

/**
 * @category combinators
 * @since 2.11.0
 */
export const chainFirstReaderK: <A, R, B>(
  f: (a: A) => R.Reader<R, B>,
) => <E = never>(ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, A> =
  /*#__PURE__*/
  chainFirstReaderK_(FromReader, Chain);

/**
 * Less strict version of [`chainFirstReaderK`](#chainfirstreaderk).
 *
 * @category combinators
 * @since 2.11.0
 */
export const chainFirstReaderKW: <A, R1, B>(
  f: (a: A) => R.Reader<R1, B>,
) => <R2, E = never>(
  ma: ReaderTaskEither<R2, E, A>,
) => ReaderTaskEither<R1 & R2, E, A> = chainFirstReaderK as any;

/**
 * @category combinators
 * @since 2.11.0
 */
export const fromReaderTaskK = <A extends ReadonlyArray<unknown>, R, B>(
  f: (...a: A) => ReaderTask<R, B>,
): (<E = never>(...a: A) => ReaderTaskEither<R, E, B>) =>
  (...a) => rightReaderTask(f(...a));

/**
 * Less strict version of [`chainReaderTaskK`](#chainreadertaskk).
 *
 * @category combinators
 * @since 2.11.0
 */
export const chainReaderTaskKW: <A, R2, B>(
  f: (a: A) => RT.ReaderTask<R2, B>,
) => <R1, E = never>(
  ma: ReaderTaskEither<R1, E, A>,
) => ReaderTaskEither<R1 & R2, E, B> = (f) => chainW(fromReaderTaskK(f));

/**
 * @category combinators
 * @since 2.11.0
 */
export const chainReaderTaskK: <A, R, B>(
  f: (a: A) => RT.ReaderTask<R, B>,
) => <E = never>(ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, B> =
  chainReaderTaskKW;

/**
 * Less strict version of [`chainFirstReaderTaskK`](#chainfirstreadertaskk).
 *
 * @category combinators
 * @since 2.11.0
 */
export const chainFirstReaderTaskKW: <A, R2, B>(
  f: (a: A) => RT.ReaderTask<R2, B>,
) => <R1, E = never>(
  ma: ReaderTaskEither<R1, E, A>,
) => ReaderTaskEither<R1 & R2, E, A> = (f) => chainFirstW(fromReaderTaskK(f));

/**
 * @category combinators
 * @since 2.11.0
 */
export const chainFirstReaderTaskK: <A, R, B>(
  f: (a: A) => RT.ReaderTask<R, B>,
) => <E = never>(ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, A> =
  chainFirstReaderTaskKW;

/**
 * @category instances
 * @since 2.10.0
 */
export const FromEither: FromEither3<URI> = {
  URI,
  fromEither,
};

/**
 * @category natural transformations
 * @since 2.0.0
 */
export const fromOption: <E>(
  onNone: Lazy<E>,
) => NaturalTransformation13C<OURI, URI, E> =
  /*#__PURE__*/
  fromOption_(FromEither);

/**
 * @category combinators
 * @since 2.10.0
 */
export const fromOptionK =
  /*#__PURE__*/
  fromOptionK_(FromEither);

/**
 * @category combinators
 * @since 2.10.0
 */
export const chainOptionK =
  /*#__PURE__*/
  chainOptionK_(FromEither, Chain);

/**
 * @category combinators
 * @since 2.4.0
 */
export const chainEitherK: <E, A, B>(
  f: (a: A) => E.Either<E, B>,
) => <R>(ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, B> =
  /*#__PURE__*/
  chainEitherK_(FromEither, Chain);

/**
 * Less strict version of [`chainEitherK`](#chaineitherk).
 *
 * @category combinators
 * @since 2.6.1
 */
export const chainEitherKW: <E2, A, B>(
  f: (a: A) => Either<E2, B>,
) => <R, E1>(
  ma: ReaderTaskEither<R, E1, A>,
) => ReaderTaskEither<R, E1 | E2, B> = chainEitherK as any;

/**
 * @category combinators
 * @since 2.12.0
 */
export const chainFirstEitherK =
  /*#__PURE__*/
  chainFirstEitherK_(FromEither, Chain);

/**
 * Less strict version of [`chainFirstEitherK`](#chainfirsteitherk).
 *
 * @category combinators
 * @since 2.12.0
 */
export const chainFirstEitherKW: <A, E2, B>(
  f: (a: A) => Either<E2, B>,
) => <R, E1>(
  ma: ReaderTaskEither<R, E1, A>,
) => ReaderTaskEither<R, E1 | E2, A> = chainFirstEitherK as any;

/**
 * @category constructors
 * @since 2.0.0
 */
export const fromPredicate: {
  <E, A, B extends A>(
    refinement: Refinement<A, B>,
    onFalse: (a: A) => E,
  ): <R>(a: A) => ReaderTaskEither<R, E, B>;
  <E, A>(
    predicate: Predicate<A>,
    onFalse: (a: A) => E,
  ): <R, B extends A>(b: B) => ReaderTaskEither<R, E, B>;
  <E, A>(
    predicate: Predicate<A>,
    onFalse: (a: A) => E,
  ): <R>(a: A) => ReaderTaskEither<R, E, A>;
} =
  /*#__PURE__*/
  fromPredicate_(FromEither);

/**
 * @category combinators
 * @since 2.0.0
 */
export const filterOrElse: {
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <R>(
    ma: ReaderTaskEither<R, E, A>,
  ) => ReaderTaskEither<R, E, B>;
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <R, B extends A>(
    mb: ReaderTaskEither<R, E, B>,
  ) => ReaderTaskEither<R, E, B>;
  <E, A>(
    predicate: Predicate<A>,
    onFalse: (a: A) => E,
  ): <R>(ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, A>;
} =
  /*#__PURE__*/
  filterOrElse_(FromEither, Chain);

/**
 * Less strict version of [`filterOrElse`](#filterorelse).
 *
 * @category combinators
 * @since 2.9.0
 */
export const filterOrElseW: {
  <A, B extends A, E2>(
    refinement: Refinement<A, B>,
    onFalse: (a: A) => E2,
  ): <R, E1>(
    ma: ReaderTaskEither<R, E1, A>,
  ) => ReaderTaskEither<R, E1 | E2, B>;
  <A, E2>(predicate: Predicate<A>, onFalse: (a: A) => E2): <R, E1, B extends A>(
    mb: ReaderTaskEither<R, E1, B>,
  ) => ReaderTaskEither<R, E1 | E2, B>;
  <A, E2>(predicate: Predicate<A>, onFalse: (a: A) => E2): <R, E1>(
    ma: ReaderTaskEither<R, E1, A>,
  ) => ReaderTaskEither<R, E1 | E2, A>;
} = filterOrElse;

/**
 * @category combinators
 * @since 2.4.0
 */
export const fromEitherK: <E, A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => E.Either<E, B>,
) => <R>(...a: A) => ReaderTaskEither<R, E, B> =
  /*#__PURE__*/
  fromEitherK_(FromEither);

/**
 * @category instances
 * @since 2.10.0
 */
export const FromIO: FromIO3<URI> = {
  URI,
  fromIO,
};

/**
 * @category combinators
 * @since 2.10.0
 */
export const fromIOK =
  /*#__PURE__*/
  fromIOK_(FromIO);

/**
 * @category combinators
 * @since 2.10.0
 */
export const chainIOK =
  /*#__PURE__*/
  chainIOK_(FromIO, Chain);

/**
 * @category combinators
 * @since 2.10.0
 */
export const chainFirstIOK =
  /*#__PURE__*/
  chainFirstIOK_(FromIO, Chain);

/**
 * @category instances
 * @since 2.10.0
 */
export const FromTask: FromTask3<URI> = {
  URI,
  fromIO,
  fromTask,
};

/**
 * @category combinators
 * @since 2.10.0
 */
export const fromTaskK =
  /*#__PURE__*/
  fromTaskK_(FromTask);

/**
 * @category combinators
 * @since 2.10.0
 */
export const chainTaskK =
  /*#__PURE__*/
  chainTaskK_(FromTask, Chain);

/**
 * @category combinators
 * @since 2.10.0
 */
export const chainFirstTaskK =
  /*#__PURE__*/
  chainFirstTaskK_(FromTask, Chain);

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * Make sure that a resource is cleaned up in the event of an exception (\*). The release action is called regardless of
 * whether the body action throws (\*) or returns.
 *
 * (\*) i.e. returns a `Left`
 *
 * @since 2.0.4
 */
export function bracket<R, E, A, B>(
  acquire: ReaderTaskEither<R, E, A>,
  use: (a: A) => ReaderTaskEither<R, E, B>,
  release: (a: A, e: Either<E, B>) => ReaderTaskEither<R, E, void>,
): ReaderTaskEither<R, E, B> {
  return bracketW(acquire, use, release);
}

/**
 * Less strict version of [`bracket`](#bracket).
 *
 * @since 2.12.0
 */
export function bracketW<R1, E1, A, R2, E2, B, R3, E3>(
  acquire: ReaderTaskEither<R1, E1, A>,
  use: (a: A) => ReaderTaskEither<R2, E2, B>,
  release: (a: A, e: Either<E2, B>) => ReaderTaskEither<R3, E3, void>,
): ReaderTaskEither<R1 & R2 & R3, E1 | E2 | E3, B> {
  return (r) =>
    TE.bracketW(
      acquire(r),
      (a) => use(a)(r),
      (a, e) => release(a, e)(r),
    );
}

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

/**
 * @since 2.9.0
 */
export const Do: ReaderTaskEither<unknown, never, {}> =
  /*#__PURE__*/
  of(_.emptyRecord);

/**
 * @since 2.8.0
 */
export const bindTo =
  /*#__PURE__*/
  bindTo_(Functor);

/**
 * @since 2.8.0
 */
export const bind =
  /*#__PURE__*/
  bind_(Chain);

/**
 * @since 2.8.0
 */
export const bindW: <N extends string, A, R2, E2, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => ReaderTaskEither<R2, E2, B>,
) => <R1, E1>(
  fa: ReaderTaskEither<R1, E1, A>,
) => ReaderTaskEither<
  R1 & R2,
  E1 | E2,
  { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }
> = bind as any;

// -------------------------------------------------------------------------------------
// pipeable sequence S
// -------------------------------------------------------------------------------------

/**
 * @since 2.8.0
 */
export const apS =
  /*#__PURE__*/
  apS_(ApplyPar);

/**
 * @since 2.8.0
 */
export const apSW: <A, N extends string, R2, E2, B>(
  name: Exclude<N, keyof A>,
  fb: ReaderTaskEither<R2, E2, B>,
) => <R1, E1>(
  fa: ReaderTaskEither<R1, E1, A>,
) => ReaderTaskEither<
  R1 & R2,
  E1 | E2,
  { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }
> = apS as any;

// -------------------------------------------------------------------------------------
// sequence T
// -------------------------------------------------------------------------------------

/**
 * @since 2.11.0
 */
export const ApT: ReaderTaskEither<unknown, never, readonly []> =
  /*#__PURE__*/
  of(_.emptyReadonlyArray);

// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(ApplicativePar)`.
 *
 * @since 2.11.0
 */
export const traverseReadonlyNonEmptyArrayWithIndex = <A, R, E, B>(
  f: (index: number, a: A) => ReaderTaskEither<R, E, B>,
): ((
  as: ReadonlyNonEmptyArray<A>,
) => ReaderTaskEither<R, E, ReadonlyNonEmptyArray<B>>) =>
  flow(
    R.traverseReadonlyNonEmptyArrayWithIndex(f),
    R.map(TE.traverseReadonlyNonEmptyArrayWithIndex(SK)),
  );

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativePar)`.
 *
 * @since 2.11.0
 */
export const traverseReadonlyArrayWithIndex = <A, R, E, B>(
  f: (index: number, a: A) => ReaderTaskEither<R, E, B>,
): ((as: ReadonlyArray<A>) => ReaderTaskEither<R, E, ReadonlyArray<B>>) => {
  const g = traverseReadonlyNonEmptyArrayWithIndex(f);
  return (as) => (_.isNonEmpty(as) ? g(as) : ApT);
};

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(ApplicativeSeq)`.
 *
 * @since 2.11.0
 */
export const traverseReadonlyNonEmptyArrayWithIndexSeq = <A, R, E, B>(
  f: (index: number, a: A) => ReaderTaskEither<R, E, B>,
): ((
  as: ReadonlyNonEmptyArray<A>,
) => ReaderTaskEither<R, E, ReadonlyNonEmptyArray<B>>) =>
  flow(
    R.traverseReadonlyNonEmptyArrayWithIndex(f),
    R.map(TE.traverseReadonlyNonEmptyArrayWithIndexSeq(SK)),
  );

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativeSeq)`.
 *
 * @since 2.11.0
 */
export const traverseReadonlyArrayWithIndexSeq = <A, R, E, B>(
  f: (index: number, a: A) => ReaderTaskEither<R, E, B>,
): ((as: ReadonlyArray<A>) => ReaderTaskEither<R, E, ReadonlyArray<B>>) => {
  const g = traverseReadonlyNonEmptyArrayWithIndexSeq(f);
  return (as) => (_.isNonEmpty(as) ? g(as) : ApT);
};

/**
 * @since 2.9.0
 */
export const traverseArrayWithIndex: <R, E, A, B>(
  f: (index: number, a: A) => ReaderTaskEither<R, E, B>,
) => (as: ReadonlyArray<A>) => ReaderTaskEither<R, E, ReadonlyArray<B>> =
  traverseReadonlyArrayWithIndex;

/**
 * @since 2.9.0
 */
export const traverseArray = <R, E, A, B>(
  f: (a: A) => ReaderTaskEither<R, E, B>,
): ((as: ReadonlyArray<A>) => ReaderTaskEither<R, E, ReadonlyArray<B>>) =>
  traverseReadonlyArrayWithIndex((_, a) => f(a));

/**
 * @since 2.9.0
 */
export const sequenceArray: <R, E, A>(
  arr: ReadonlyArray<ReaderTaskEither<R, E, A>>,
) => ReaderTaskEither<R, E, ReadonlyArray<A>> =
  /*#__PURE__*/
  traverseArray(identity);

/**
 * @since 2.9.0
 */
export const traverseSeqArrayWithIndex: <R, E, A, B>(
  f: (index: number, a: A) => ReaderTaskEither<R, E, B>,
) => (as: ReadonlyArray<A>) => ReaderTaskEither<R, E, ReadonlyArray<B>> =
  traverseReadonlyArrayWithIndexSeq;

/**
 * @since 2.9.0
 */
export const traverseSeqArray = <R, E, A, B>(
  f: (a: A) => ReaderTaskEither<R, E, B>,
): ((as: ReadonlyArray<A>) => ReaderTaskEither<R, E, ReadonlyArray<B>>) =>
  traverseReadonlyArrayWithIndexSeq((_, a) => f(a));

/**
 * @since 2.9.0
 */
export const sequenceSeqArray: <R, E, A>(
  arr: ReadonlyArray<ReaderTaskEither<R, E, A>>,
) => ReaderTaskEither<R, E, ReadonlyArray<A>> =
  /*#__PURE__*/
  traverseSeqArray(identity);

// -------------------------------------------------------------------------------------
// deprecated
// -------------------------------------------------------------------------------------

// tslint:disable: deprecation

/**
 * Use small, specific instances instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
export const readerTaskEither:
  & Monad3<URI>
  & Bifunctor3<URI>
  & Alt3<URI>
  & MonadTask3<URI>
  & MonadThrow3<URI> = {
    URI,
    map: _map,
    of,
    ap: _apPar,
    chain: _chain,
    alt: _alt,
    bimap: _bimap,
    mapLeft: _mapLeft,
    fromIO,
    fromTask,
    throwError,
  };

/**
 * Use small, specific instances instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */

export const readerTaskEitherSeq: typeof readerTaskEither = {
  URI,
  map: _map,
  of,
  ap: _apSeq,
  chain: _chain,
  alt: _alt,
  bimap: _bimap,
  mapLeft: _mapLeft,
  fromIO,
  fromTask,
  throwError,
};

/**
 * Use [`getApplySemigroup`](./Apply.ts.html#getapplysemigroup) instead.
 *
 * Semigroup returning the left-most `Left` value. If both operands are `Right`s then the inner values
 * are concatenated using the provided `Semigroup`
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
export const getApplySemigroup: <R, E, A>(
  S: Semigroup<A>,
) => Semigroup<ReaderTaskEither<R, E, A>> =
  /*#__PURE__*/
  getApplySemigroup_(ApplySeq);

/**
 * Use [`getApplicativeMonoid`](./Applicative.ts.html#getapplicativemonoid) instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
export const getApplyMonoid: <R, E, A>(
  M: Monoid<A>,
) => Monoid<ReaderTaskEither<R, E, A>> =
  /*#__PURE__*/
  getApplicativeMonoid(ApplicativeSeq);

/**
 * Use [`getApplySemigroup`](./Apply.ts.html#getapplysemigroup) instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
export const getSemigroup = <R, E, A>(
  S: Semigroup<A>,
): Semigroup<ReaderTaskEither<R, E, A>> =>
  getApplySemigroup_(RT.ApplySeq)(E.getSemigroup(S));

/**
 * Use [`getApplicativeReaderTaskValidation`](#getapplicativereadertaskvalidation) and [`getAltReaderTaskValidation`](#getaltreadertaskvalidation) instead.
 *
 * @category instances
 * @since 2.3.0
 * @deprecated
 */
export function getReaderTaskValidation<E>(
  SE: Semigroup<E>,
):
  & Monad3C<URI, E>
  & Bifunctor3<URI>
  & Alt3C<URI, E>
  & MonadTask3C<URI, E>
  & MonadThrow3C<URI, E> {
  const applicativeReaderTaskValidation = getApplicativeReaderTaskValidation(
    T.ApplicativePar,
    SE,
  );
  const altReaderTaskValidation = getAltReaderTaskValidation(SE);
  return {
    URI,
    _E: undefined as any,
    map: _map,
    of,
    chain: _chain,
    bimap: _bimap,
    mapLeft: _mapLeft,
    ap: applicativeReaderTaskValidation.ap,
    alt: altReaderTaskValidation.alt,
    fromIO,
    fromTask,
    throwError,
  };
}

/**
 * @since 2.0.0
 * @deprecated
 */
/* istanbul ignore next */
export function run<R, E, A>(
  ma: ReaderTaskEither<R, E, A>,
  r: R,
): Promise<Either<E, A>> {
  return ma(r)();
}
