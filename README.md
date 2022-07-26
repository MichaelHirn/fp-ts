<h1 align="center">
`fp-ts` for [Deno 🦕](https://github.com/denoland/deno)
</h1>

[fp-ts](https://github.com/gcanti/fp-ts) is a library for _typed functional programming_ in TypeScript.

Unfortunately fp-ts is not available for Deno, because:

1. fp-ts's Gcanti does not want to support Deno (yet)
2. Esm.sh keeps breaking and doesn't support all types (Jul 2022)
3. Skypack fails to support fp-ts (Jul 2022)
4. Garronej's deno.land port ([fp_ts](https://deno.land/x/fp_ts)) does not work; HKT type issues (Jul 2022)

This repo is the first working Deno port I am aware of. Feel free to open an issue here if you experience any problems.

[`io-ts` for Deno is also available](https://github.com/michaelhirn/io-ts).

# Installation / Usage

> Note: This package is only available for version `fp-ts@2.12.1` for now

```ts
import * as A from 'https://raw.githubusercontent.com/michaelhirn/fp-ts/master/lib/Array.ts'
```

## ToDo

- [ ] setup [deno.land/x](https://deno.land/x) CI/CD
