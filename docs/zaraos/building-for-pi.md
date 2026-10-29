---
title: Building for Raspberry Pi 5
sidebar_label: Building for Pi 5
sidebar_position: 4
---

# Building for Raspberry Pi 5

This page covers building the **ZaraOS kernel** (kernel image, device trees, and modules)
for a Raspberry Pi 5 and installing it on a Pi that is already running ZaraOS.

The full flashable SD card image (`sdcard.img`) is built with Buildroot using
`ZaraOS/configs/zaraos_pi5_defconfig`. This page only covers the faster kernel-only build.

## Prerequisites

- [Nix package manager](https://nixos.org/download/) with flakes enabled
    - [Determinate Nix](https://determinate.systems/install/) enables flakes by default
- About 10 GB of free disk space for the kernel source and build output

The Nix dev shell defined in `flake.nix` provides everything else: the aarch64 cross
compiler, GNU Make, and the kernel build tools.

### macOS: use a case-sensitive volume

The Linux kernel source has files whose names differ only by case (for example
`ipt_ECN.h` and `ipt_ecn.h`). The default macOS disk is case-insensitive, so one file
overwrites the other and the Pi 5 build fails with errors such as
`'IPT_ECN_OP_SET_CWR' undeclared` in `net/ipv4/netfilter/ipt_ECN.c`.

Linux hosts are not affected and can skip this step.

Create and mount a case-sensitive disk image once, then point the build at it with
`WORK_DIR`:

```bash
hdiutil create -size 30g -type SPARSE -fs "Case-sensitive APFS" \
    -volname zaraos-build ~/zaraos-build.sparseimage
hdiutil attach ~/zaraos-build.sparseimage   # mounts at /Volumes/zaraos-build

export WORK_DIR=/Volumes/zaraos-build/kernel-build
```

After a reboot, run `hdiutil attach ~/zaraos-build.sparseimage` again and re-export
`WORK_DIR` before building.

If you already ran a build on the case-insensitive disk, its kernel source is corrupted.
Delete it (`rm -rf ../kernel-build/downloads`) or build in the new `WORK_DIR`.

## Compiling

All commands below are run from the **root of the ZaraOS repository** (the directory
containing `flake.nix`).

```bash
nix develop                              # enter the dev shell
./ZaraOS/scripts/build-kernel-local.sh   # build for Pi 5 (the default target)
```

The first build takes about 10 to 15 minutes, including downloading the kernel source.
Rebuilds are much faster because the source is reused and `ccache` caches compiled objects.

**What this does:**
1. Clones the Raspberry Pi Linux kernel (`stable_20250916`)
2. Applies the Pi 5 configuration (`bcm2712_defconfig` + `kernel-fragments/linux-pi5.fragment`)
3. Compiles the kernel, device trees, and modules
4. Packages them into a deployment archive

### Build Options

```bash
# Set the number of parallel jobs (defaults to the number of CPU cores)
./ZaraOS/scripts/build-kernel-local.sh -j 8

# Interactive kernel configuration (menuconfig)
./ZaraOS/scripts/build-kernel-local.sh --menuconfig

# Delete the downloaded source and build directory
./ZaraOS/scripts/build-kernel-local.sh --clean
```

### Output Files

By default, output goes to `kernel-build/` **next to** the ZaraOS repository, not inside
it (for example `~/MQP/kernel-build` if the repo is at `~/MQP/ZaraOS`). If you set
`WORK_DIR`, output goes to `$WORK_DIR/output` instead.

```
kernel-build/output/
├── Image                       # Kernel image (16K pages)
├── dtb/                        # Device trees (bcm2712-rpi-5-b.dtb, bcm2712d0-rpi-5-b.dtb, ...)
├── modules/lib/modules/<ver>/  # Kernel modules, e.g. 6.12.47-v8-16k+
├── build.log                   # Full compiler output
└── zaraos-kernel-*.tar.gz      # Image + dtb/ + modules/, ready to deploy
```

## Deploying to a Raspberry Pi 5

ZaraOS mounts the boot partition at `/boot` and boots the kernel named `Image`
(`kernel=Image` in `config.txt`). There is no `pi` user or `sudo` on ZaraOS, so the
commands below are run as `root`.

Install the base device tree files (`*.dtb`) into the **root** of the boot partition, not
into `overlays/`. The firmware only loads them from there. A device tree that doesn't
match the kernel leaves the RP1 chip unconfigured, which breaks USB, Ethernet, and GPIO.

### Method 1: Copy Over SSH

**On your build machine** (from the ZaraOS repo root; replace `zaraos` with the Pi's IP
address if the hostname doesn't resolve):
```bash
scp ../kernel-build/output/zaraos-kernel-*.tar.gz pi@zaraos:/tmp/
```

**On the Raspberry Pi 5:**
```bash
ssh pi@zaraos

cd /tmp
tar xzf zaraos-kernel-*.tar.gz

# Back up the current kernel and device trees
cp /boot/Image /boot/Image.backup
cp /boot/bcm2712-rpi-5-b.dtb /boot/bcm2712-rpi-5-b.dtb.backup
cp /boot/bcm2712d0-rpi-5-b.dtb /boot/bcm2712d0-rpi-5-b.dtb.backup

# Install the new kernel and Pi 5 device trees
cp Image /boot/
cp dtb/bcm2712-rpi-5-b.dtb dtb/bcm2712d0-rpi-5-b.dtb /boot/

# Install modules
cp -r modules/lib/modules/* /lib/modules/
depmod -a

sync
reboot
```

### Method 2: SD Card

1. Power off the Pi and put its SD card in your build machine.
2. Copy the kernel and device trees into the boot (FAT) partition. Replace
   `<boot-partition>` with where your OS mounted it:
   ```bash
   cp kernel-build/output/Image <boot-partition>/
   cp kernel-build/output/dtb/bcm2712-rpi-5-b.dtb \
      kernel-build/output/dtb/bcm2712d0-rpi-5-b.dtb <boot-partition>/
   ```
3. Modules live on the ext4 root partition, which macOS can't mount. If the kernel
   version changed, install the modules over SSH after booting (see Method 1).

### Verifying the Installation

After the reboot:
```bash
ssh pi@zaraos
uname -a          # should show the new version
lsmod             # check that modules loaded
dmesg | head -30  # look for errors early in boot
```

If the Pi doesn't boot, put the SD card in your build machine and copy `Image.backup`
(and the `.dtb.backup` files) back over the originals in the boot partition.

## Kernel Configuration

### Pi 5 Fragment (`ZaraOS/kernel-fragments/linux-pi5.fragment`)
- 16K page size (Pi 5 optimization)
- GPU: VC4/V3D DRM drivers
- WiFi: Broadcom brcmfmac
- I/O: GPIO, I2C, SPI, PWM, USB serial
- Container support (namespaces, cgroups, overlay FS, seccomp)

### Customizing the Configuration

```bash
./ZaraOS/scripts/build-kernel-local.sh --menuconfig
```
## Further Reading

- [Buildroot Manual](https://buildroot.org/downloads/manual/manual.html)
- [Raspberry Pi Kernel Build](https://www.raspberrypi.com/documentation/computers/linux_kernel.html)
- [Linux Kernel Configuration](https://www.kernel.org/doc/html/latest/admin-guide/index.html)
