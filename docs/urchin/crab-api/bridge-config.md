---
title: Bridge File
sidebar_label: Bridge File
sidebar_position: 3
---

# Bridge File

The **bridge file** is a file titled `bridge.toml` that maps high-level hardware names to
underlying hardware numbers and specifications. It is parsed on initialization of a crab
instance.

## File structure

The bridge file follows the [TOML](https://toml.io/en/) format.

It must begin with a `meta` [table](https://toml.io/en/v1.1.0#table) with a `Version` key.
As of 11/05/2026, this should always be set to 0.1.

```toml
[meta]
Version = "0.1"
```

It then should contain one or more `Motor` tables (expressed as an 
[array of tables](https://toml.io/en/v1.1.0#array-of-tables))
containing the fields in the table below.

| Fields           | Description                                   |
| ---------------- | --------------------------------------------- |
| `MotorNum`       | Number printed on the motor                   |
| `MotorBrand`     | Brand of the motor (e.g., "HurkuleX")         |
| `MotorModel`     | Model of the motor (e.g., "0601")             |
| `JointName`      | The name of the joint from the URDF *exactly* |
| `Bounds`         | Motor bounds (from CAD software)              |
| `AlignmentAngle` | Angle the motor should be in from assembly    |

Example:

```toml
[[Motor]]
MotorNum = 7 
MotorBrand = "HerkuleX"
MotorModel = "0601"
JointName = "Shoulder"
Bounds = [-45,45]
AlignmentAngle = 0
```

