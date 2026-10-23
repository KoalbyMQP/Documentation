---
title: ZaraOS Overview
sidebar_label: ZaraOS Overview
sidebar_position: 1
---

# ZaraOS Overview

**ZaraOS** is the operating system that runs on the Raspberry Pi of the robot. It is an
ultra lightweight, custom-built OS based on Linux, which makes it more capable of running
user programs (such as machine learning models) compared to mainstream distributions like
Debian or Raspberry Pi OS.

## Big picture

ZaraOS sits right in the middle of the software stack, between the Driver Station
(frontend web interface) and Urchin (firmware).


- Communicates with Driver Station over HTTP using Cortex
- Communicates with Urchin over USB using Crab API


