/**
 * @since 2.0.0
 */
import * as E from './Eq.ts'
import * as M from './Monoid.ts'
import * as S from './Semigroup.ts'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 2.0.0
 */
export type Ordering = -1 | 0 | 1

// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------

/**
 * Less strict version of [`match`](#match).
 *
 * @category destructors
 * @since 2.12.0
 */
export const matchW = <A, B, C>(onLessThan: () => A, onEqual: () => B, onGreaterThan: () => C) => (
  o: Ordering
): A | B | C => (o === -1 ? onLessThan() : o === 0 ? onEqual() : onGreaterThan())

/**
 * @category destructors
 * @since 2.10.0
 */
export const match: <A>(onLessThan: () => A, onEqual: () => A, onGreaterThan: () => A) => (o: Ordering) => A = matchW

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @category combinators
 * @since 2.10.0
 */
export const reverse = (o: Ordering): Ordering => (o === -1 ? 1 : o === 1 ? -1 : 0)

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 2.10.0
 */
export const Eq: E.Eq<Ordering> = {
  equals: (x, y) => x === y
}

/**
 * @category instances
 * @since 2.10.0
 */
export const Semigroup: S.Semigroup<Ordering> = {
  concat: (x, y) => (x !== 0 ? x : y)
}

/**
 * @category instances
 * @since 2.10.0
 */
export const Monoid: M.Monoid<Ordering> = {
  concat: Semigroup.concat,
  empty: 0
}

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * @since 2.0.0
 */
export const sign = (n: number): Ordering => (n <= -1 ? -1 : n >= 1 ? 1 : 0)

// -------------------------------------------------------------------------------------
// deprecated
// -------------------------------------------------------------------------------------

/**
 * Use [`reverse`](#reverse) instead.
 *
 * @since 2.0.0
 * @deprecated
 */
export const invert = reverse

/**
 * Use [`Semigroup`](#semigroup) instead
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
export const semigroupOrdering: S.Semigroup<Ordering> = Semigroup

/**
 * Use [`Eq`](#eq) instead
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
export const eqOrdering: E.Eq<Ordering> = Eq

/**
 * Use [`Monoid`](#monoid) instead
 *
 * @category instances
 * @since 2.4.0
 * @deprecated
 */
export const monoidOrdering: M.Monoid<Ordering> = Monoid
