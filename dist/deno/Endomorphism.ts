/**
 * @since 2.11.0
 */

import { flow, identity } from './function.ts'
import { Monoid } from './Monoid.ts'
import { Semigroup } from './Semigroup.ts'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @since 2.11.0
 */
export interface Endomorphism<A> {
  (a: A): A
}

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 2.11.0
 */
export const URI = 'Endomorphism'

/**
 * @category instances
 * @since 2.11.0
 */
export type URI = typeof URI

declare module './HKT.ts' {
  interface URItoKind<A> {
    readonly [URI]: Endomorphism<A>
  }
}

/**
 * Endomorphism form a `Semigroup` where the `concat` operation is the usual function composition.
 *
 * @category instances
 * @since 2.11.0
 */
export const getSemigroup = <A = never>(): Semigroup<Endomorphism<A>> => ({
  concat: (first, second) => flow(first, second)
})

/**
 * Endomorphism form a `Monoid` where the `empty` value is the `identity` function.
 *
 * @category instances
 * @since 2.11.0
 */
export const getMonoid = <A = never>(): Monoid<Endomorphism<A>> => ({
  concat: getSemigroup<A>().concat,
  empty: identity
})
