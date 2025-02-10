---
id: coding_style_quality
title: Python Coding Style and Quality
sidebar_label: Coding Style & Quality
sidebar_position: 3
---

# Python Coding Style and Quality Guide

Writing clean, readable, and maintainable Python code is essential for successful projects. This guide will help you understand Python's coding conventions and how to maintain high code quality, regardless of your experience level.

## Understanding PEP 8

PEP 8 is Python's official style guide. It provides coding conventions that make Python code more consistent and readable.

### Key PEP 8 Rules

#### 1. Indentation and Line Length

- Use 4 spaces for indentation (not tabs)
- Limit lines to 79 characters for code (or 88 if using Black formatter)
- Limit lines to 72 characters for docstrings/comments

```python
# Good indentation
def calculate_total(items):
    total = 0
    for item in items:
        total += item.price
    return total

# Bad indentation (using tabs or incorrect spaces)
def calculate_total(items):
  total = 0
  for item in items:
      total += item.price
  return total
```

#### 2. Imports

- Imports should be on separate lines
- Order imports in three groups, separated by a blank line:
  1. Standard library imports
  2. Third-party imports
  3. Local application imports

```python
# Good import organization
import os
import sys

import pandas as pd
import requests

from myproject.utils import helper
from myproject.models import User

# Bad import organization
import os, sys
import pandas as pd, requests
from myproject.utils import helper, User
```

#### 3. Naming Conventions

- Function and variable names: `lowercase_with_underscores`
- Class names: `CapitalizedWords`
- Constants: `UPPERCASE_WITH_UNDERSCORES`
- Protected instance attributes: `_leading_underscore`
- Private instance attributes: `__double_leading_underscore`

```python
# Good naming
class UserAccount:
    MAX_LOGIN_ATTEMPTS = 3
    
    def __init__(self):
        self.username = ""
        self._account_status = "active"
        self.__password_hash = None
    
    def validate_login(self):
        pass

# Bad naming
class userAccount:
    maxLoginAttempts = 3
    
    def __init__(self):
        self.UserName = ""
        self.accountStatus = "active"
        self.passwordHash = None
```

#### 4. Whitespace

- Use blank lines to separate functions and classes
- Use blank lines sparingly inside functions to indicate logical sections
- No whitespace at the end of lines
- Surround operators with single spaces

```python
# Good whitespace usage
def process_data(data):
    # Process raw data
    cleaned_data = clean_data(data)
    
    # Perform calculations
    result = calculate_statistics(cleaned_data)
    return result

# Bad whitespace usage
def process_data(data):
    cleaned_data=clean_data(data)    
    result=calculate_statistics(cleaned_data)
    return result     
```

## Code Quality Tools

### 1. Linters

#### Flake8

Flake8 combines multiple tools to check your code:

- PyFlakes for logic errors
- pycodestyle for PEP 8 compliance
- McCabe for complexity checking

Installation and usage:

```bash
# Install Flake8
pip install flake8

# Run Flake8
flake8 your_code.py
```

#### Pylint

A more comprehensive linter that checks for coding standards and error detection:

```bash
# Install Pylint
pip install pylint

# Run Pylint
pylint your_code.py
```

### 2. Code Formatters

#### Black

Black is an uncompromising code formatter that automatically formats your code:

```bash
# Install Black
pip install black

# Run Black
black your_code.py

# Check what would be formatted without making changes
black --check your_code.py
```

#### YAPF (Yet Another Python Formatter)

Google's Python formatter with configurable formatting style:

```bash
# Install YAPF
pip install yapf

# Run YAPF
yapf -i your_code.py
```

### 3. Type Checkers

#### Mypy

Static type checker for Python that helps catch type-related errors:

```bash
# Install Mypy
pip install mypy

# Run Mypy
mypy your_code.py
```

Example of type hints:

```python
from typing import List, Dict, Optional

def process_users(users: List[str]) -> Dict[str, int]:
    result: Dict[str, int] = {}
    for user in users:
        result[user] = len(user)
    return result

def get_user(user_id: int) -> Optional[str]:
    # Might return None if user not found
    pass
```

## Best Practices

### 1. Documentation

#### Docstrings

Use docstrings for modules, classes, and functions:

```python
def calculate_discount(price: float, percentage: float) -> float:
    """
    Calculate the discounted price.

    Args:
        price (float): Original price
        percentage (float): Discount percentage (0-100)

    Returns:
        float: Discounted price

    Raises:
        ValueError: If percentage is not between 0 and 100
    """
    if not 0 <= percentage <= 100:
        raise ValueError("Percentage must be between 0 and 100")
    return price * (1 - percentage / 100)
```

### 2. Error Handling

```python
# Good error handling
def read_config(filename: str) -> dict:
    try:
        with open(filename, 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        logger.error(f"Config file {filename} not found")
        raise
    except json.JSONDecodeError as e:
        logger.error(f"Invalid JSON in config file: {e}")
        raise ValueError("Invalid config file format")
```

### 3. Testing

Write tests using pytest:

```python
# test_calculator.py
import pytest
from calculator import add

def test_add_positive_numbers():
    assert add(1, 2) == 3

def test_add_negative_numbers():
    assert add(-1, -2) == -3

def test_add_zero():
    assert add(0, 5) == 5
```

## Setting Up Your Development Environment

### 1. IDE Configuration

#### VS Code

Install these extensions for Python development:

- Python (Microsoft)
- Pylance
- Python Test Explorer
- Python Docstring Generator

Add this to your VS Code settings:

```json
{
    "python.linting.enabled": true,
    "python.linting.pylintEnabled": true,
    "python.formatting.provider": "black",
    "editor.formatOnSave": true,
    "python.analysis.typeCheckingMode": "basic"
}
```

#### PyCharm

Enable these features:

- PEP 8 checking
- Type checking
- Auto-formatting on save

### 2. Pre-commit Hooks

Set up pre-commit hooks to automatically check code quality before commits:

```yaml
# .pre-commit-config.yaml
repos:
-   repo: https://github.com/psf/black
    rev: 22.3.0
    hooks:
    -   id: black
-   repo: https://github.com/PyCQA/flake8
    rev: 4.0.1
    hooks:
    -   id: flake8
-   repo: https://github.com/pre-commit/mirrors-mypy
    rev: v0.950
    hooks:
    -   id: mypy
```

Install and set up pre-commit:

```bash
# Install pre-commit
pip install pre-commit

# Install the git hook scripts
pre-commit install

# Run against all files
pre-commit run --all-files
```

## Common Issues and Solutions

1. **Inconsistent Code Style**:
   - Solution: Use Black formatter with pre-commit hooks
   - Configure your IDE to format on save

2. **Missing Type Hints**:
   - Solution: Enable Mypy in your IDE
   - Use stub files for third-party libraries

3. **Poor Documentation**:
   - Solution: Use documentation generators
   - Configure IDE to auto-generate docstring templates

4. **Complex Functions**:
   - Solution: Use McCabe complexity checker
   - Break down functions with complexity > 10

Remember: Good code quality is a continuous process. Regular code reviews, automated checks, and consistent application of these practices will help maintain high-quality Python code.
