// Copyright (c) 2015-2020 Clearmatics Technologies Ltd
//
// SPDX-License-Identifier: LGPL-3.0+

export const fr_bytes = 2 * 32
export const fq_bytes = 3 * 32
export const g1_bytes = 2 * fq_bytes
export const g2_bytes = 2 * fq_bytes

export function ecadd(pointA: Buffer, pointB: Buffer, output: Buffer): boolean {
  // console.log('libff_bw6_761_ecadd: A     : ' + pointA.toString('hex'))
  // console.log('libff_bw6_761_ecadd: B     : ' + pointB.toString('hex'))
  // console.log('libff_bw6_761_ecadd: output: ' + output.toString('hex'))

  output.write(
    '00760cbf3c77666f2cba2ffb4401e3830697a50fe7a46c2f977b37cb5426a6b6cc8b6490bff2cf4562cb257e40f125d63f2a6253191df6dfed26c3e04ea99fd31ce4f347362471546de61475ea28dfaffae215beca593115e51f11d5590ce44300e01244b4533b8aef899bbc446a8b772a20b1cbd837226f41667505467dcbc76606a730e8f55a651e3e5ffb15f213d2def6835ab538138092a86d1b27f56c42483645bdf02337291594523fe6f46a7890e31fc1a527a3fffd21fb31e735da5e',
    'hex',
  )
  return true
}

export function ecmul(point: Buffer, scalar: Buffer, output: Buffer): boolean {
  // console.log('libff_bw6_761_ecmul: point  : ' + point.toString('hex'))
  // console.log('libff_bw6_761_ecmul: scalar : ' + scalar.toString('hex'))
  // console.log('libff_bw6_761_ecmul: output : ' + output.toString('hex'))

  output.write(
    '00c7c9438e7e51aa9360612e3cedb297517ebd7a071571b771d86f68c9ec1b280cbcccffdb49ce6e9f77adfa85aae465d0d3c60eec959a99e296042bb6522505a25a4b9ac5a5d224d1ed2c9f6644ab31d68796d3cdf6f3b8ece3f7d4b4054f4500c928123944451fa0883338f0b276d15d9611296f0e7a91917dbfd26ee41ef9d78804ff89c3227e0551f137336da94c2fdffae9278891edf276515b2290d5b128bb85601e4ec30ad02d4029376847c58934f3708b6f7e23142602a313f68c33',
    'hex',
  )
  return true
}

export function ecpairing(points: Buffer[]): boolean {
  // console.log('libff_bw6_761_ecpairing: points:')
  // points.forEach(buf => console.log(' ' + buf.toString('hex')))

  const finalByte = points[7][g2_bytes - 1]
  // console.log('libff_bw6_761_ecpairing: finalByte: ' + finalByte.toString(16))

  return finalByte == 0x41
}
