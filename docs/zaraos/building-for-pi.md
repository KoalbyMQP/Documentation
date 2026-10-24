---
title: Building for Raspberry Pi 5
sidebar_label: Building for Pi 5
sidebar_position: 4
---

# Building for Raspberry Pi

:::warning
Building ZaraOS from source can take upwards of 30 minutes the first time you do it. Plan
accordingly
:::

## Prerequisites

Install the following dependencies:
- [Nix package manager](https://nixos.org/download/)
    - Note: you can also use [nix determinate](https://determinate.systems/install/)


The nix development shell in `flake.nix` contains all the dependencies needed to build
ZaraOS. Enter the dev shell by running the following command from the same directory
containing `flake.nix`:

```sh
nix develop
```
## Setup

### MacOS
```bash
# Install build tools
brew install make gcc@14 bison flex

# Install cross-compiler (required for both Pi 5 and QEMU builds)
brew tap messense/macos-cross-toolchains
brew install aarch64-unknown-linux-gnu

# Install QEMU for local testing
brew install qemu
```

### Linux (Ubuntu/Debian)
```bash
# Install build tools and cross-compiler
sudo apt install build-essential bison flex libssl-dev gcc-aarch64-linux-gnu

# Install QEMU
sudo apt install qemu-system-arm
```

## Compiling
The first build will take anywhere from 5 to 15 minutes depending on your CPU.
Rebuilds will be much faster, aroudn 2 to 3 minutes.

```bash
cd ZaraOS/scripts
./build-kernel-local.sh
```

**What this does:**
1. Downloads the Raspberry Pi Linux kernel (stable_20250916)
2. Applies Pi 5 configuration (`bcm2712_defconfig` + `linux-pi5.fragment`)
3. Compiles kernel, modules, and copies device trees
4. Creates a deployment-ready archive

### Build Options

```bash
# Use 8 parallel jobs (faster on multi-core)
./build-kernel-local.sh -j 8

# Interactive kernel configuration (menuconfig)
./build-kernel-local.sh --menuconfig

# Clean all previous builds
./build-kernel-local.sh --clean

# QEMU build with menuconfig
./build-kernel-local.sh --qemu --menuconfig -j 8
```

### Output Files
```
kernel-build/output/
├── Image                       # Kernel image (copy to Pi /boot/)
├── dtb/                        # Device tree files
├── modules/                    # Compiled kernel modules
└── zaraos-kernel-*.tar.gz      # Ready-to-deploy archive
```

#todo check `ZaraOS/ZaraOS/KERNEL_BUILD.md`

#todo future sections
- Instructions for how to load onto the pi
- Getting the pi connected to the Wi-Fi

