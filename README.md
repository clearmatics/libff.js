# `libff.js` - Wrapper around libff

![libff.js CI](https://github.com/clearmatics/libff.js/workflows/libff.js%20CI/badge.svg)

| This package is currently extremely minimal, with very limited coverage of the libff library. |
| --- |

## Dependencies

1. The install will attempt to build the [libff library](https://github.com/clearmatics/libff). Hence, make sure that you have installed the following tools before proceeding:

- CMake >=2.8
- Recent gcc or clang C++ compilers
- git
- node < v10.23
- npm > 6.9

See the [libff repository](https://github.com/clearmatics/libff) for further details.

2. Install the submodules:

```console
git submodule update --init --recursive
```

## Run the tests

```console
npm install
npm run test
```

## Example

``` typescript
import libff = require('libff.js');

// Addition of elliptic curve points on the BW6-761 curve
var bw6_761 = libff.bw6_761;

const a_g1 = Buffer.from(
    "00bdd3187c4a57477dd0830d8bb83a85593798ea1a55668c8ecba3db496e132a1dd339c5fcb2cefd718d5a50f4083d3b410e83135fec7197210145ae4ddce934ec0888cb1a408ae8288edb780c1e18371da1be3a02b2f487bfa7095e760be81a009413f554540d560317eec4f050678f69354e9e935feee8baadbf7a2ec004039163ac1bf31a15f64a820dc5ae9b84c818b321d8db0883bf4861a68212b8aa03ab23a88b0115e974e18db5c0970deb0e7130dba6f54da5179dc19db66d2fdf2a",
    'hex');

const b_g1 = Buffer.from(
    "009b512f473767b3e84f621c1efb9a875b0ae1d623dd0ac1fd29354688311902fcad849275945122751e5b564e8ffd4939174982282da32feb69c2fa8d9c32d92f8e3825f390bf75fc4a8554b2c1367f1a4d92ff40539b4bfc2cba0298b46a820081b87ff3a0887d2f892a8612e47d89b11140beaccdfc5f269fe046da6355ea4a954be341b294ff4ea27bc8926192867adde574fc5ee4310bc502c42f297601f172a930d1e62b8a05ce451ede1a5d4ea67f8ecd1c49ad47388257f60a7dc91a",
    'hex');

const a_plus_b = Buffer.alloc(bw6_761.g1_bytes);
if (!bw6_761.ecadd(a, b, a_plus_b)) {
    throw "Error in curve point addition";
}
console.log("a + b = " + a_plus_b.toString('hex'));
```
