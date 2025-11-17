#!/bin/sh

# this variable ensures that SQLite is used in test mode
export RUN_TESTS=true

# run pytest with coverage and check the exit code of pytest
if ! coverage run -m pytest;
then
    echo "Tests failed"
    exit 1
fi

coverage report -m
