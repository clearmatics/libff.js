// Copyright (c) 2015-2020 Clearmatics Technologies Ltd
//
// SPDX-License-Identifier: LGPL-3.0+

import * as bls12_377 from '../src/bls12_377'

const fr_minus_2 = Buffer.from(
    "12ab655e9a2ca55660b44d1e5c37b00159aa76fed00000010a117fffffffffff",
    'hex')

const g1_2 = Buffer.from(
    "00ed453141939e91056edb5a4b5452ed7e61f7f3dd2a4b7ee90e97c9a2301955880661656781dc90857aed6d6a41639000cfb0b9717bc8e5ae04601813171337ad99cdae42c561cae80b12f135c64479d6a23f5675ed5ca7e2dd5e8727d7c7ed",
    'hex')

const g1_3 = Buffer.from(
    "01252b781171f507db36291b433a1f911a46543890a20ca9712e11f66a5d216e63d817bd8d96cef715abc604dcf6ec2e014a00fa77c727e8987cc438b51bbe012c823a19955ae692c54ce572a61f0ea1fe5cd981533df419fd1330d1f6e6d802",
    'hex')

const g1_4 = Buffer.from(
    "00c1090c0750892fa132043a3ec67b5dfb5aa24b4772bef1724153a759353c27a216259fecad4b19be1f169b2739bd26003f820683c042b943bfb056956d1c8dbc16939f19bd1131ab15caced9f05b7fd009962b3d13907fde8175d86f72e3a4",
    'hex')

const g1_6 = Buffer.from(
    "010c65c0fb9e6c6ef4cbb27fdc55a07e474df11c564bd91e3fa162c32b7fc3dabba5fc508cfdd8938fb4a30f7de5ad9c0149a58ced619866b242313876fe2df3188f33b77566a9ddc966ff4d4d5c42d515be862c348f51cc91f1c45a74110ba6",
    'hex')

const g1_minus_8 = Buffer.from(
    "018aff632c0048f5afb5c07fd197a44a127c829be3ff6170c6cebc1154bc72633b45de2ac855e0da30cebfa33672e7f300be8218b8b1ba93705bf17a910274768383d037cf28b27f9b084d9efb929cc7ff8ad0f1567f8b0edb78c769fed58756",
    'hex')

const g2_4 = Buffer.from(
    "008deeab95264cf16b9e9b87ce615b9c8ccff86332b286332c00d4f0f0bb4c9c0fc0923d83231e5e3a3a961c8e26665100a54cee57ec21b53167f636a9bb1d81691edf259b4164867760b250049bbd722021968ab0b927ee5b0d44c70db106f50113d2333add9290fe17235e413f2d8c7f448406f586aefaad39284ac6d80fb7f1741fb37f91c5c6299038063a34bb250045e1d96afde76075237a8c3472473f1c4debf2bf79abf2c8b22fd4ccc5c3da30ee409c293094115bddd5da7de0da8a",
    'hex')

const g2_8 = Buffer.from(
    "019ece89be3c82b561d87e7898ddfc928d2e86fafa21febc222d8ff38a752fe95b25e19b25410205800385fb047ca1cf016251c985d96e59d07cc363290ec7146682da9bde87ed3d64ccad05403992cc9f3704c7f9a1df34116840d220edba27012c74d25dd0ca3264d6141945dc309b94be879fc67835ab3db6b1faad807bca3e21e122184678fe4ea38affe654e15f002f302a2d6f3c2a5b53edb53d73c1e3f1771c3b929563c62e74e3330adb0f75b1b164fef915d00aa35b5e668524ef2b",
    'hex')


test('bls12_377_ecadd', () => {
  var output = Buffer.alloc(bls12_377.g1_bytes)
  expect(bls12_377.ecadd(g1_2, g1_4, output)).toBe(true)
  expect(output).toStrictEqual(g1_6)
})

test('bls12_377_ecmul', () => {
  var output = Buffer.alloc(bls12_377.g1_bytes)
  expect(bls12_377.ecmul(g1_4, fr_minus_2, output)).toBe(true)
  expect(output).toStrictEqual(g1_minus_8)
})

test('bls12_377_ecpairing', () => {
  expect(bls12_377.ecpairing([
    g1_6, g2_4, g1_3, g2_8, g1_4, g2_4, g1_minus_8, g2_8,
  ])).toBe(true)

  expect(bls12_377.ecpairing([
    g1_6, g2_4, g1_3, g2_8, g1_4, g2_4, g1_minus_8, g2_4
  ])).toBe(false)
})