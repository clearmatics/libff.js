#!/usr/bin/env bash

set -e

VERSION=$1
if [ "$VERSION" == "" ] ; then
    VERSION=ffi
fi

echo "================================"
echo "===== INSTALLING LIBFF-FFI ====="
echo "================================"
echo version: $VERSION

if ! [ -e depends/libff ] ; then
    echo "depends/libff not present. downloading version: $VERSION"
    mkdir -p depends
    pushd depends
        git clone -b $VERSION https://github.com/clearmatics/libff
        pushd libff
            git submodule update --init --recursive
        popd
    popd
fi

mkdir -p bin
pushd depends/libff

  mkdir -p build
  pushd build
    cmake -DWITH_PROCPS=OFF ..
    make -j 5 ff-ffi
    rsync --update ffi/libff-ffi.* ../../../bin
  popd
popd
