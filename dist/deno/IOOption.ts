/**
 * @since 2.12.0
 */
import { Alt1 } from './Alt.ts'
import { Alternative1 } from './Alternative.ts'
import { Applicative1 } from './Applicative.ts'
import { apFirst as apFirst_, Apply1, apS as apS_, apSecond as apSecond_ } from './Apply.ts'
import { bind as bind_, Chain1, chainFirst as chainFirst_ } from './Chain.ts'
import { compact as compact_, Compactable1, separate as separate_ } from './Compactable.ts'
import { Either } from './Either.ts'
import {
  filter as filter_,
  Filterable1,
  filterMap as filterMap_,
  partition as partition_,
  partitionMap as partitionMap_
} from './Filterable.ts'
import {
  FromEither1,
  chainEitherK as chainEitherK_,
  chainFirstEitherK as chainFirstEitherK_,
  fromEitherK as fromEitherK_
} from './FromEither.ts'
import { chainFirstIOK as chainFirstIOK_, chainIOK as chainIOK_, FromIO1, fromIOK as fromIOK_ } from './FromIO.ts'
import { flow, identity, Lazy, pipe, SK } from './function.ts'
import { bindTo as bindTo_, flap as flap_, Functor1 } from './Functor.ts'
import * as _ from './internal.ts'
import { Monad1 } from './Monad.ts'
import { MonadIO1 } from './MonadIO.ts'
import { NaturalTransformation11, NaturalTransformation21 } from './NaturalTransformation.ts'
import * as O from './Option.ts'
import * as OT from './OptionT.ts'
import { Pointed1 } from './Pointed.ts'
import { Predicate } from './Predicate.ts'
import { ReadonlyNonEmptyArray } from './ReadonlyNonEmptyArray.ts'
import { Refinement } from './Refinement.ts'
import { Separated } from './Separated.ts'
import * as I from './IO.ts'
import { URI as IEURI } from './IOEither.ts'
import { Zero1, guard as guard_ } from './Zero.ts'

import IO = I.IO
import Option = O.Option

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 2.12.0
 */
export interface IOOption<A> extends IO<Option<A>> {}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @category constructors
 * @since 2.12.0
 */
export const some: <A>(a: A) => IOOption<A> =
  /*#__PURE__*/
  OT.some(I.Pointed)

/**
 * @category constructors
 * @since 2.12.0
 */
export const fromPredicate: {
  <A, B extends A>(refinement: Refinement<A, B>): (a: A) => IOOption<B>
  <A>(predicate: Predicate<A>): <B extends A>(b: B) => IOOption<B>
  <A>(predicate: Predicate<A>): (a: A) => IOOption<A>
} =
  /*#__PURE__*/
  OT.fromPredicate(I.Pointed)

// -------------------------------------------------------------------------------------
// natural transformations
// -------------------------------------------------------------------------------------

/**
 * @category natural transformations
 * @since 2.12.0
 */
export const fromOption: NaturalTransformation11<O.URI, URI> = I.of

/**
 * @category natural transformations
 * @since 2.12.0
 */
export const fromEither: FromEither1<URI>['fromEither'] =
  /*#__PURE__*/
  OT.fromEither(I.Pointed)

/**
 * @category natural transformations
 * @since 2.12.0
 */
export const fromIO: FromIO1<URI>['fromIO'] =
  /*#__PURE__*/
  OT.fromF(I.Functor)

/**
 * @category natural transformations
 * @since 2.12.0
 */
export const fromIOEither: NaturalTransformation21<IEURI, URI> =
  /*#__PURE__*/
  I.map(O.fromEither)

// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------

/**
 * @category destructors
 * @since 2.12.0
 */
export const match: <B, A>(onNone: () => B, onSome: (a: A) => B) => (ma: IOOption<A>) => IO<B> =
  /*#__PURE__*/
  OT.match(I.Functor)

/**
 * Less strict version of [`match`](#match).
 *
 * @category destructors
 * @since 2.12.0
 */
export const matchW: <B, A, C>(onNone: () => B, onSome: (a: A) => C) => (ma: IOOption<A>) => IO<B | C> = match as any

/**
 * @category destructors
 * @since 2.12.0
 */
export const matchE: <B, A>(onNone: () => IO<B>, onSome: (a: A) => IO<B>) => (ma: IOOption<A>) => IO<B> =
  /*#__PURE__*/
  OT.matchE(I.Chain)

/**
 * Alias of [`matchE`](#matche).
 *
 * @category destructors
 * @since 2.12.0
 */
export const fold = matchE

/**
 * Less strict version of [`matchE`](#matche).
 *
 * @category destructors
 * @since 2.12.0
 */
export const matchEW: <B, C, A>(
  onNone: () => IO<B>,
  onSome: (a: A) => IO<C>
) => (ma: IOOption<A>) => IO<B | C> = matchE as any

/**
 * @category destructors
 * @since 2.12.0
 */
export const getOrElse: <A>(onNone: Lazy<IO<A>>) => (fa: IOOption<A>) => IO<A> =
  /*#__PURE__*/
  OT.getOrElse(I.Monad)

/**
 * Less strict version of [`getOrElse`](#getorelse).
 *
 * @category destructors
 * @since 2.12.0
 */
export const getOrElseW: <B>(onNone: Lazy<IO<B>>) => <A>(ma: IOOption<A>) => IO<A | B> = getOrElse as any

/**
 * @category destructors
 * @since 2.12.0
 */
export const toUndefined: <A>(ma: IOOption<A>) => IO<A | undefined> = I.map(O.toUndefined)

/**
 * @category destructors
 * @since 2.12.0
 */
export const toNullable: <A>(ma: IOOption<A>) => IO<A | null> = I.map(O.toNullable)

// -------------------------------------------------------------------------------------
// interop
// -------------------------------------------------------------------------------------

/**
 * @category interop
 * @since 2.12.0
 */
export const fromNullable: <A>(a: A) => IOOption<NonNullable<A>> =
  /*#__PURE__*/
  OT.fromNullable(I.Pointed)

/**
 * @category interop
 * @since 2.12.0
 */
export const fromNullableK: <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => B | null | undefined
) => (...a: A) => IOOption<NonNullable<B>> =
  /*#__PURE__*/
  OT.fromNullableK(I.Pointed)

/**
 * @category interop
 * @since 2.12.0
 */
export const chainNullableK: <A, B>(
  f: (a: A) => B | null | undefined
) => (ma: IOOption<A>) => IOOption<NonNullable<B>> =
  /*#__PURE__*/
  OT.chainNullableK(I.Monad)

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @category combinators
 * @since 2.12.0
 */
export const fromOptionK: <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Option<B>) => (...a: A) => IOOption<B> =
  /*#__PURE__*/
  OT.fromOptionK(I.Pointed)

/**
 * @category combinators
 * @since 2.12.0
 */
export const chainOptionK: <A, B>(f: (a: A) => Option<B>) => (ma: IOOption<A>) => IOOption<B> =
  /*#__PURE__*/
  OT.chainOptionK(I.Monad)

// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------

/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 2.12.0
 */
export const map: <A, B>(f: (a: A) => B) => (fa: IOOption<A>) => IOOption<B> =
  /*#__PURE__*/
  OT.map(I.Functor)

/**
 * @category Apply
 * @since 2.12.0
 */
export const ap: <A>(fa: IOOption<A>) => <B>(fab: IOOption<(a: A) => B>) => IOOption<B> =
  /*#__PURE__*/
  OT.ap(I.Apply)

/**
 * @category Pointed
 * @since 2.12.0
 */
export const of: Pointed1<URI>['of'] = some

/**
 * @category Monad
 * @since 2.12.0
 */
export const chain: <A, B>(f: (a: A) => IOOption<B>) => (ma: IOOption<A>) => IOOption<B> =
  /*#__PURE__*/
  OT.chain(I.Monad)

/**
 * Derivable from `Chain`.
 *
 * @category combinators
 * @since 2.12.0
 */
export const flatten: <A>(mma: IOOption<IOOption<A>>) => IOOption<A> =
  /*#__PURE__*/
  chain(identity)

/**
 * @category Alt
 * @since 2.12.0
 */
export const alt: <A>(second: Lazy<IOOption<A>>) => (first: IOOption<A>) => IOOption<A> =
  /*#__PURE__*/
  OT.alt(I.Monad)

/**
 * Less strict version of [`alt`](#alt).
 *
 * @category Alt
 * @since 2.12.0
 */
export const altW: <B>(second: Lazy<IOOption<B>>) => <A>(first: IOOption<A>) => IOOption<A | B> = alt as any

/**
 * @category Zero
 * @since 2.12.0
 */
export const zero: Zero1<URI>['zero'] =
  /*#__PURE__*/
  OT.zero(I.Pointed)

/**
 * @category constructors
 * @since 2.12.0
 */
export const none: IOOption<never> =
  /*#__PURE__*/
  zero()

/**
 * @category Compactable
 * @since 2.12.0
 */
export const compact: Compactable1<URI>['compact'] =
  /*#__PURE__*/
  compact_(I.Functor, O.Compactable)

/**
 * @category Compactable
 * @since 2.12.0
 */
export const separate: Compactable1<URI>['separate'] =
  /*#__PURE__*/
  separate_(I.Functor, O.Compactable, O.Functor)

/**
 * @category Filterable
 * @since 2.12.0
 */
export const filter: {
  <A, B extends A>(refinement: Refinement<A, B>): (fb: IOOption<A>) => IOOption<B>
  <A>(predicate: Predicate<A>): <B extends A>(fb: IOOption<B>) => IOOption<B>
  <A>(predicate: Predicate<A>): (fa: IOOption<A>) => IOOption<A>
} =
  /*#__PURE__*/
  filter_(I.Functor, O.Filterable)

/**
 * @category Filterable
 * @since 2.12.0
 */
export const filterMap: <A, B>(f: (a: A) => Option<B>) => (fga: IOOption<A>) => IOOption<B> =
  /*#__PURE__*/
  filterMap_(I.Functor, O.Filterable)

/**
 * @category Filterable
 * @since 2.12.0
 */
export const partition: {
  <A, B extends A>(refinement: Refinement<A, B>): (fb: IOOption<A>) => Separated<IOOption<A>, IOOption<B>>
  <A>(predicate: Predicate<A>): <B extends A>(fb: IOOption<B>) => Separated<IOOption<B>, IOOption<B>>
  <A>(predicate: Predicate<A>): (fa: IOOption<A>) => Separated<IOOption<A>, IOOption<A>>
} =
  /*#__PURE__*/
  partition_(I.Functor, O.Filterable)

/**
 * @category Filterable
 * @since 2.12.0
 */
export const partitionMap: <A, B, C>(
  f: (a: A) => Either<B, C>
) => (fa: IOOption<A>) => Separated<IOOption<B>, IOOption<C>> =
  /*#__PURE__*/
  partitionMap_(I.Functor, O.Filterable)

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

const _map: Functor1<URI>['map'] = (fa, f) => pipe(fa, map(f))
/* istanbul ignore next */
const _ap: Apply1<URI>['ap'] = (fab, fa) => pipe(fab, ap(fa))
/* istanbul ignore next */
const _chain: Monad1<URI>['chain'] = (ma, f) => pipe(ma, chain(f))
/* istanbul ignore next */
const _alt: Alt1<URI>['alt'] = (fa, that) => pipe(fa, alt(that))
/* istanbul ignore next */
const _filter: Filterable1<URI>['filter'] = <A>(fa: IOOption<A>, predicate: Predicate<A>) => pipe(fa, filter(predicate))
/* istanbul ignore next */
const _filterMap: Filterable1<URI>['filterMap'] = (fa, f) => pipe(fa, filterMap(f))
/* istanbul ignore next */
const _partition: Filterable1<URI>['partition'] = <A>(fa: IOOption<A>, predicate: Predicate<A>) =>
  pipe(fa, partition(predicate))
/* istanbul ignore next */
const _partitionMap: Filterable1<URI>['partitionMap'] = (fa, f) => pipe(fa, partitionMap(f))

/**
 * @category instances
 * @since 2.12.0
 */
const URI = 'IOOption'

/**
 * @category instances
 * @since 2.12.0
 */
export type URI = typeof URI

declare module './HKT.ts' {
  interface URItoKind<A> {
    readonly [URI]: IOOption<A>
  }
}

/**
 * @category instances
 * @since 2.12.0
 */
export const Functor: Functor1<URI> = {
  URI,
  map: _map
}

/**
 * Derivable from `Functor`.
 *
 * @category combinators
 * @since 2.12.0
 */
export const flap =
  /*#__PURE__*/
  flap_(Functor)

/**
 * @category instances
 * @since 2.12.0
 */
export const Pointed: Pointed1<URI> = {
  URI,
  of
}

/**
 * @category instances
 * @since 2.12.0
 */
export const Apply: Apply1<URI> = {
  URI,
  map: _map,
  ap: _ap
}

/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 2.12.0
 */
export const apFirst =
  /*#__PURE__*/
  apFirst_(Apply)

/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 2.12.0
 */
export const apSecond =
  /*#__PURE__*/
  apSecond_(Apply)

/**
 * @category instances
 * @since 2.12.0
 */
export const Applicative: Applicative1<URI> = {
  URI,
  map: _map,
  ap: _ap,
  of
}

/**
 * @category instances
 * @since 2.12.0
 */
export const Chain: Chain1<URI> = {
  URI,
  map: _map,
  ap: _ap,
  chain: _chain
}

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * Derivable from `Chain`.
 *
 * @category combinators
 * @since 2.12.0
 */
export const chainFirst =
  /*#__PURE__*/
  chainFirst_(Chain)

/**
 * @category instances
 * @since 2.12.0
 */
export const Alt: Alt1<URI> = {
  URI,
  map: _map,
  alt: _alt
}

/**
 * @category instances
 * @since 2.12.0
 */
export const Zero: Zero1<URI> = {
  URI,
  zero
}

/**
 * @category constructors
 * @since 2.12.0
 */
export const guard =
  /*#__PURE__*/
  guard_(Zero, Pointed)

/**
 * @category instances
 * @since 2.12.0
 */
export const Alternative: Alternative1<URI> = {
  URI,
  map: _map,
  ap: _ap,
  of,
  alt: _alt,
  zero
}

/**
 * @category instances
 * @since 2.12.0
 */
export const Monad: Monad1<URI> = {
  URI,
  map: _map,
  ap: _ap,
  of,
  chain: _chain
}

/**
 * @category instances
 * @since 2.12.0
 */
export const MonadIO: MonadIO1<URI> = {
  URI,
  map: _map,
  ap: _ap,
  of,
  chain: _chain,
  fromIO
}

/**
 * @category instances
 * @since 2.12.0
 */
export const Compactable: Compactable1<URI> = {
  URI,
  compact,
  separate
}

/**
 * @category instances
 * @since 2.12.0
 */
export const Filterable: Filterable1<URI> = {
  URI,
  map: _map,
  compact,
  separate,
  filter: _filter,
  filterMap: _filterMap,
  partition: _partition,
  partitionMap: _partitionMap
}

/**
 * @category instances
 * @since 2.12.0
 */
export const FromIO: FromIO1<URI> = {
  URI,
  fromIO
}

/**
 * @category combinators
 * @since 2.12.0
 */
export const fromIOK =
  /*#__PURE__*/
  fromIOK_(FromIO)

/**
 * @category combinators
 * @since 2.12.0
 */
export const chainIOK =
  /*#__PURE__*/
  chainIOK_(FromIO, Chain)

/**
 * @category combinators
 * @since 2.12.0
 */
export const chainFirstIOK =
  /*#__PURE__*/
  chainFirstIOK_(FromIO, Chain)

/**
 * @category instances
 * @since 2.12.0
 */
export const FromEither: FromEither1<URI> = {
  URI,
  fromEither
}

/**
 * @category combinators
 * @since 2.12.0
 */
export const fromEitherK =
  /*#__PURE__*/
  fromEitherK_(FromEither)

/**
 * @category combinators
 * @since 2.12.0
 */
export const chainEitherK: <E, A, B>(f: (a: A) => Either<E, B>) => (ma: IOOption<A>) => IOOption<B> =
  /*#__PURE__*/
  chainEitherK_(FromEither, Chain)

/**
 * @category combinators
 * @since 2.12.0
 */
export const chainFirstEitherK =
  /*#__PURE__*/
  chainFirstEitherK_(FromEither, Chain)

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

/**
 * @since 2.12.0
 */
export const Do: IOOption<{}> =
  /*#__PURE__*/
  of(_.emptyRecord)

/**
 * @since 2.12.0
 */
export const bindTo =
  /*#__PURE__*/
  bindTo_(Functor)

/**
 * @since 2.12.0
 */
export const bind =
  /*#__PURE__*/
  bind_(Chain)

// -------------------------------------------------------------------------------------
// sequence S
// -------------------------------------------------------------------------------------

/**
 * @since 2.12.0
 */
export const apS =
  /*#__PURE__*/
  apS_(Apply)

// -------------------------------------------------------------------------------------
// sequence T
// -------------------------------------------------------------------------------------

/**
 * @since 2.12.0
 */
export const ApT: IOOption<readonly []> =
  /*#__PURE__*/
  of(_.emptyReadonlyArray)

// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------

/**
 * @since 2.12.0
 */
export const traverseReadonlyNonEmptyArrayWithIndex = <A, B>(
  f: (index: number, a: A) => IOOption<B>
): ((as: ReadonlyNonEmptyArray<A>) => IOOption<ReadonlyNonEmptyArray<B>>) =>
  flow(I.traverseReadonlyNonEmptyArrayWithIndex(f), I.map(O.traverseReadonlyNonEmptyArrayWithIndex(SK)))

/**
 * @since 2.12.0
 */
export const traverseReadonlyArrayWithIndex = <A, B>(
  f: (index: number, a: A) => IOOption<B>
): ((as: ReadonlyArray<A>) => IOOption<ReadonlyArray<B>>) => {
  const g = traverseReadonlyNonEmptyArrayWithIndex(f)
  return (as) => (_.isNonEmpty(as) ? g(as) : ApT)
}
