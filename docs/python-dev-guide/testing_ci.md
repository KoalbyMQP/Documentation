---
id: testing_ci
title: Testing & Continuous Integration
sidebar_label: Testing & Continuous Integration
sidebar_position: 4
---

# Testing and Continuous Integration Guide

This guide covers everything you need to know about testing Python code and setting up continuous integration (CI) pipelines. Whether you're new to testing or looking to improve your CI practices, this guide will help you establish robust testing workflows.

## Understanding Testing in Python

### Types of Tests

1. **Unit Tests**
   - Test individual components in isolation
   - Fast and focused
   - Should cover edge cases

2. **Integration Tests**
   - Test multiple components together
   - Verify component interactions
   - More complex setup

3. **Functional Tests**
   - Test complete features
   - End-to-end scenarios
   - User-centric testing

## Testing with pytest

### Basic Test Structure

```python
# test_calculator.py
def test_addition():
    assert 2 + 2 == 4

def test_string_length():
    assert len("hello") == 5
```

### Fixtures

```python
# conftest.py
import pytest
from database import Database

@pytest.fixture
def db():
    """Provide a database connection for tests."""
    db = Database()
    db.connect()
    yield db
    db.disconnect()

# test_database.py
def test_save_user(db):
    user = {"name": "John"}
    assert db.save_user(user) is True
```

### Parameterized Tests

```python
import pytest

@pytest.mark.parametrize("input,expected", [
    ("hello", 5),
    ("python", 6),
    ("", 0),
])
def test_string_length(input, expected):
    assert len(input) == expected
```

### Testing Exceptions

```python
def divide(a, b):
    if b == 0:
        raise ValueError("Cannot divide by zero")
    return a / b

def test_divide_by_zero():
    with pytest.raises(ValueError) as exc_info:
        divide(1, 0)
    assert str(exc_info.value) == "Cannot divide by zero"
```

## Mock Objects and Patching

### Using unittest.mock

```python
from unittest.mock import Mock, patch
import requests

def get_user_data(user_id):
    response = requests.get(f"https://api.example.com/users/{user_id}")
    return response.json()

def test_get_user_data():
    # Mock the requests.get call
    with patch('requests.get') as mock_get:
        mock_get.return_value.json.return_value = {"id": 1, "name": "John"}
        result = get_user_data(1)
        assert result["name"] == "John"
        mock_get.assert_called_once_with("https://api.example.com/users/1")
```

### Mock Context Managers

```python
from unittest.mock import patch, mock_open

def read_config():
    with open('config.json') as f:
        return f.read()

def test_read_config():
    mock_data = '{"setting": "value"}'
    with patch('builtins.open', mock_open(read_data=mock_data)):
        result = read_config()
        assert result == mock_data
```

## Code Coverage

### Using pytest-cov

```bash
# Install pytest-cov
pip install pytest-cov

# Run tests with coverage
pytest --cov=mypackage tests/

# Generate HTML report
pytest --cov=mypackage --cov-report=html tests/
```

### Coverage Configuration (.coveragerc)
```ini
[run]
source = mypackage
omit = tests/*

[report]
exclude_lines =
    pragma: no cover
    def __repr__
    raise NotImplementedError
```

## Continuous Integration

### GitHub Actions

```yaml
# .github/workflows/python-tests.yml
name: Python Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        python-version: [3.8, 3.9, "3.10"]

    steps:
    - uses: actions/checkout@v2
    
    - name: Set up Python ${{ matrix.python-version }}
      uses: actions/setup-python@v2
      with:
        python-version: ${{ matrix.python-version }}
    
    - name: Install dependencies
      run: |
        python -m pip install --upgrade pip
        pip install -r requirements.txt
        pip install pytest pytest-cov
    
    - name: Run tests
      run: |
        pytest --cov=./ --cov-report=xml
    
    - name: Upload coverage
      uses: codecov/codecov-action@v2
```

### GitLab CI

```yaml
# .gitlab-ci.yml
image: python:3.9

stages:
  - test
  - deploy

before_script:
  - pip install -r requirements.txt

test:
  stage: test
  script:
    - pip install pytest pytest-cov
    - pytest --cov=./ --cov-report=term-missing
  coverage: '/TOTAL.+ ([0-9]{1,3}%)/'
```

## Best Practices

### 1. Test Organization

```
my_project/
├── src/
│   └── mypackage/
│       ├── __init__.py
│       └── module.py
└── tests/
    ├── __init__.py
    ├── conftest.py
    ├── test_unit/
    │   └── test_module.py
    └── test_integration/
        └── test_features.py
```

### 2. Testing Standards

1. **Naming Conventions**
   - Test files: `test_*.py`
   - Test functions: `test_*`
   - Test classes: `Test*`

2. **FIRST Principles**
   - **F**ast: Tests should run quickly
   - **I**solated: Tests shouldn't depend on each other
   - **R**epeatable: Same results every time
   - **S**elf-validating: Pass/fail without manual checking
   - **T**imely: Written before or with code

### 3. Test Documentation

```python
def test_user_registration():
    """
    Test user registration process.
    
    Steps:
    1. Create user data
    2. Submit registration
    3. Verify user exists
    4. Check welcome email
    """
    # Test implementation
```

## Common Testing Patterns

### 1. Factory Pattern

```python
# tests/factories.py
from faker import Faker

fake = Faker()

def create_user(**kwargs):
    """Create a test user with random data."""
    return {
        "username": kwargs.get("username", fake.user_name()),
        "email": kwargs.get("email", fake.email()),
        "password": kwargs.get("password", fake.password())
    }
```

### 2. Test Doubles

```python
# Test stub
class StubPaymentGateway:
    def process_payment(self, amount):
        return True

# Test spy
class SpyEmailService:
    def __init__(self):
        self.sent_emails = []
    
    def send_email(self, to, subject, body):
        self.sent_emails.append({"to": to, "subject": subject})
        return True
```

## Debugging Tests

### Using pdb

```python
def test_complex_operation():
    import pdb; pdb.set_trace()  # Or use breakpoint() in Python 3.7+
    result = complex_operation()
    assert result == expected_value
```

### pytest Options

```bash
# Show print statements
pytest -s

# Show local variables in errors
pytest --showlocals

# Stop on first failure
pytest -x

# Run specific test
pytest tests/test_module.py::test_function
```

## Performance Testing

```python
import pytest
import time

@pytest.mark.benchmark
def test_performance(benchmark):
    def slow_function():
        time.sleep(0.1)
        return sum(range(1000))
    
    result = benchmark(slow_function)
    assert result == 499500
```

Remember: Testing is an investment in your code's reliability and maintainability. Start with simple tests and gradually build up your test suite as your project grows.