/**
 * Type defunctionalization (as describe in [Lightweight higher-kinded polymorphism](https://www.cl.cam.ac.uk/~jdy22/papers/lightweight-higher-kinded-polymorphism.pdf))
 *
 * @since 2.0.0
 */

/**
 * `* -> *` constructors
 * @since 2.0.0
 */
export interface HKT<URI, A> {
  readonly _URI: URI;
  readonly _A: A;
}

/**
 * `* -> * -> *` constructors
 * @since 2.0.0
 */
export interface HKT2<URI, E, A> extends HKT<URI, A> {
  readonly _E: E;
}

/**
 * `* -> * -> * -> *` constructors
 * @since 2.0.0
 */
export interface HKT3<URI, R, E, A> extends HKT2<URI, E, A> {
  readonly _R: R;
}

/**
 * `* -> * -> * -> * -> *` constructors
 * @since 2.0.0
 */
export interface HKT4<URI, S, R, E, A> extends HKT3<URI, R, E, A> {
  readonly _S: S;
}

//
// inj: type-level dictionaries for HKTs: URI -> concrete type
//

/**
 * `* -> *` constructors
 * @since 2.0.0
 */
export interface URItoKind<A> {}

/**
 * `* -> * -> *` constructors
 * @since 2.0.0
 */
export interface URItoKind2<E, A> {}

/**
 * `* -> * -> * -> *` constructors
 * @since 2.0.0
 */
export interface URItoKind3<R, E, A> {}

/**
 * `* -> * -> * -> * -> *` constructors
 * @since 2.0.0
 */
export interface URItoKind4<S, R, E, A> {}

//
// unions of URIs
//

/**
 * `* -> *` constructors
 * @since 2.0.0
 */
export type URIS = string;

/**
 * `* -> * -> *` constructors
 * @since 2.0.0
 */
export type URIS2 = string;

/**
 * `* -> * -> * -> *` constructors
 * @since 2.0.0
 */
export type URIS3 = string;

/**
 * `* -> * -> * -> * -> *` constructors
 * @since 2.0.0
 */
export type URIS4 = string;

//
// prj
//

/**
 * `* -> *` constructors
 * @since 2.0.0
 */
export type Kind<URI extends URIS, A> = URI extends keyof URItoKind<A>
  ? URItoKind<A>[URI]
  : any;

/**
 * `* -> * -> *` constructors
 * @since 2.0.0
 */
export type Kind2<URI extends URIS2, E, A> = URI extends keyof URItoKind2<E, A>
  ? URItoKind2<E, A>[URI]
  : any;

/**
 * `* -> * -> * -> *` constructors
 * @since 2.0.0
 */
export type Kind3<URI extends URIS3, R, E, A> = URI extends
  keyof URItoKind3<R, E, A> ? URItoKind3<R, E, A>[URI]
  : any;

/**
 * `* -> * -> * -> * -> *` constructors
 * @since 2.0.0
 */
export type Kind4<URI extends URIS4, S, R, E, A> = URI extends
  keyof URItoKind4<S, R, E, A> ? URItoKind4<S, R, E, A>[URI]
  : any;
