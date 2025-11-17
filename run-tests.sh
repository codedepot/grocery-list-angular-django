#/bin/bash

# backend tests
docker build -t grocery-backend ./backend && docker run --rm -v $(pwd)/backend:/usr/src/backend grocery-backend ./pytest.sh

# UI tests ... (TBD)
