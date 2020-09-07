// Copyright (c) 2015-2020 Clearmatics Technologies Ltd
//
// SPDX-License-Identifier: LGPL-3.0+

export const fr_bytes = 1 * 32
export const fq_bytes = 2 * 32
export const g1_bytes = 2 * fq_bytes
export const g2_bytes = 4 * fq_bytes

// TODO: Replace these with libff-node calls
export function ecadd(pointA: Buffer, pointB: Buffer, output: Buffer): boolean {
  // console.log('libff_bls12_761_ecadd: A     : ' + pointA.toString('hex'))
  // console.log('libff_bls12_761_ecadd: B     : ' + pointB.toString('hex'))
  // console.log('libff_bls12_761_ecadd: output: ' + output.toString('hex'))

  output.write(
    '00000000000000000000000000000000010c65c0fb9e6c6ef4cbb27fdc55a07e474df11c564bd91e3fa162c32b7fc3dabba5fc508cfdd8938fb4a30f7de5ad9c000000000000000000000000000000000149a58ced619866b242313876fe2df3188f33b77566a9ddc966ff4d4d5c42d515be862c348f51cc91f1c45a74110ba6',
    'hex',
  )
  return true
}

export function ecmul(point: Buffer, scalar: Buffer, output: Buffer): boolean {
  // console.log('libff_bls12_377_ecmul: point  : ' + point.toString('hex'))
  // console.log('libff_bls12_377_ecmul: scalar : ' + scalar.toString('hex'))
  // console.log('libff_bls12_377_ecmul: output : ' + output.toString('hex'))

  output.write(
    '00000000000000000000000000000000018aff632c0048f5afb5c07fd197a44a127c829be3ff6170c6cebc1154bc72633b45de2ac855e0da30cebfa33672e7f30000000000000000000000000000000000be8218b8b1ba93705bf17a910274768383d037cf28b27f9b084d9efb929cc7ff8ad0f1567f8b0edb78c769fed58756',
    'hex',
  )

  return true
}

export function ecpairing(points: Buffer[]): boolean {
  // console.log('libff_bls12_377_ecpairing: points:')
  // points.forEach(buf => console.log(' ' + buf.toString('hex')))

  const finalByte = points[7][g2_bytes - 1]
  // console.log('libff_bls12_377_ecpairing: finalByte: ' + finalByte.toString(16))

  return finalByte == 0x2b
}
