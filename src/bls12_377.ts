// Copyright (c) 2015-2021 Clearmatics Technologies Ltd
//
// SPDX-License-Identifier: LGPL-3.0+

var ffi = require('./ffi_singleton')

// Sizes taken from libff/ffi.h
export const fr_bytes = 32;
export const fq_bytes = 48;
export const g1_bytes = 96;
export const g2_bytes = 192;

(function() {
    var functions = ffi.FFI.getFunctions();
    if (!functions.bls12_377_init()) {
        throw "failed to initialize bls12_377";
    }
})();


export function ecadd(pointA: Buffer, pointB: Buffer, output: Buffer): boolean
{
    if (pointA.length !== g1_bytes ||
        pointB.length !== g1_bytes ||
        output.length !== g1_bytes) {
        console.log('bls12_761.ecadd: invalid buffer size');
        return false;
    }

    var functions = ffi.FFI.getFunctions()
    return functions.bls12_377_g1_add(
        pointA, pointA.length, pointB, pointB.length, output, output.length)
}

export function ecmul(point: Buffer, scalar: Buffer, output: Buffer): boolean
{
    if (point.length !== g1_bytes ||
        scalar.length !== fr_bytes ||
        output.length !== g1_bytes) {
        console.log('bls12_761.ecmul: invalid buffer size');
        return false;
    }

    var functions = ffi.FFI.getFunctions()
    return functions.bls12_377_g1_mul(
        point, point.length, scalar, scalar.length, output, output.length)
}

export function ecpairing(points: Buffer[]): boolean
{
    if (points.length !== 8 ||
        points[0].length !== g1_bytes ||
        points[1].length !== g2_bytes ||
        points[2].length !== g1_bytes ||
        points[3].length !== g2_bytes ||
        points[4].length !== g1_bytes ||
        points[5].length !== g2_bytes ||
        points[6].length !== g1_bytes ||
        points[7].length !== g2_bytes) {
        console.log('bls12_761.pairing: invalid buffer size');
        return false;
    }

    var functions = ffi.FFI.getFunctions()
    return functions.bls12_377_pairing(
        points[0], points[0].length,
        points[1], points[1].length,
        points[2], points[2].length,
        points[3], points[3].length,
        points[4], points[4].length,
        points[5], points[5].length,
        points[6], points[6].length,
        points[7], points[7].length);
}
