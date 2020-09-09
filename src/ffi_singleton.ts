// Copyright (c) 2015-2020 Clearmatics Technologies Ltd
//
// SPDX-License-Identifier: LGPL-3.0+

var path = require('path')
var ffi = require('@saleae/ffi')

// bool *_init();
var init_decl = [
    "bool",
    []
]

// bool *_g1_add(
//     const void *a_g1, size_t a_g1_size,
//     const void *b_g1, size_t b_g1_size,
//     void *out_g1, size_t out_g1_size);
var g1_add_decl = [
    "bool",
    ["void *", "size_t", "void *", "size_t", "void *", "size_t"]
]

// bool *_g1_mul(
//     const void *p_g1,
//     size_t p_g1_size,
//     const void *s_fr,
//     size_t s_fr_size,
//     void *out_g1,
//     size_t out_g1_size);
var g1_mul_decl = [
    "bool",
    ["void *", "size_t", "void *", "size_t", "void *", "size_t"]
]

// bool *_pairing(
//     const void *a_g1, size_t a_g1_size,
//     const void *b_g2, size_t b_g2_size,
//     const void *c_g1, size_t c_g1_size,
//     const void *d_g2, size_t d_g2_size,
//     const void *e_g1, size_t e_g1_size,
//     const void *f_g2, size_t f_g2_size,
//     const void *g_g1, size_t g_g1_size,
//     const void *h_g2, size_t h_g2_size);
var pairing_decl = [
    "bool",
    ["void *", "size_t", "void *", "size_t", "void *", "size_t", "void *", "size_t",
     "void *", "size_t", "void *", "size_t", "void *", "size_t", "void *", "size_t"]
]

const function_declarations = {
    // BLS12-377
    bls12_377_init: init_decl,
    bls12_377_g1_add: g1_add_decl,
    bls12_377_g1_mul: g1_mul_decl,
    bls12_377_pairing: pairing_decl,

    // BW6-761
    bw6_761_init: init_decl,
    bw6_761_g1_add: g1_add_decl,
    bw6_761_g1_mul: g1_mul_decl,
    bw6_761_pairing: pairing_decl,
}

/// Interface matching the entry points in libff-ffi
export interface FFIFunctions
{
    bls12_377_init() : boolean;
    bls12_377_g1_add(
        a_g1: Buffer,
        a_g1_size: number,
        b_g1: Buffer,
        b_g1_size: number,
        out_g1: Buffer,
        out_g1_size: number): boolean;
    bls12_377_g1_mul(
        p_g1: Buffer,
        p_g1_size: number,
        s_fr: Buffer,
        s_fr_size: number,
        out_g1: Buffer,
        out_g1_size: number): boolean;
    bls12_377_pairing(
        a_g1: Buffer,
        a_g1_size: number,
        b_g2: Buffer,
        b_g2_size: number,
        c_g1: Buffer,
        c_g1_size: number,
        d_g2: Buffer,
        d_g2_size: number,
        e_g1: Buffer,
        e_g1_size: number,
        f_g2: Buffer,
        f_g2_size: number,
        g_g1: Buffer,
        g_g1_size: number,
        h_g2: Buffer,
        h_g2_size: number): boolean;
}

export class FFI
{
    private static ffi_functions: FFIFunctions;

    public static getFunctions(): FFIFunctions
    {
        if (!FFI.ffi_functions) {
            // TOOD: try multiple alternatives. libff-ffi should be
            // installed in the dist or bin dir.
            var lib = path.join(
                __dirname, "..", "dist", "libff-ffi")
            // console.log("lib: " + lib)
            this.ffi_functions = <FFIFunctions>
                ffi.Library(lib, function_declarations)
        }

        return FFI.ffi_functions;
    }
}
