#!/usr/bin/env bash

set -e

echo "================================"
echo "===== INSTALLING LIBFF-FFI ====="
echo "================================"

git submodule update --init --recursive
mkdir -p dist

pushd depends/libff

  mkdir -p build
  pushd build

    cmake -DWITH_PROCPS=OFF ..
    make -j 5 ff-ffi
    rsync --update ffi/libff-ffi.* ../../../dist

  popd

popd
