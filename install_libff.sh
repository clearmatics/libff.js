#!/usr/bin/env bash

set -e

VERSION=$1
if [ "$VERSION" == "" ] ; then
    VERSION=ffi
fi

platform=`uname`

echo "================================"
echo "===== INSTALLING LIBFF-FFI ====="
echo "================================"
echo version: $VERSION
echo platform: ${platform}

# If necessary, manually sync the libff repo at the correct version
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

# On macos, ensure openssl libraries can be found by cmake
if [ "${platform}" == "Darwin" ]; then
    openssl_path=$(brew --prefix openssl)
    export PKG_CONFIG_PATH="${openssl_path}/lib/pkgconfig"
fi

# Create the destination directory
mkdir -p bin

# Build and install the libff-ffi shared library
mkdir -p depends/libff/build
pushd depends/libff/build
    cmake -DWITH_PROCPS=OFF ..
    make -j 5 ff-ffi
    rsync --update ffi/libff-ffi.* ../../../bin
popd
