# Grocery List App

A simple grocery list app made with python django rest backend and angular front end. This is a POC, the roadmap is discussed in `DISCUSSION.md`


## Quick start

The app needs an `.env` file, for simplicity, this file will be committed with default values (not meant for production).

To bring up the app, simply run:

```
docker-compose up --build -d
```

## Features

The app lets the user create a list of grocery items. To add new items, one would expand the Add item section (which remembers if it was expanded after refresh).

The user can provide the item name, the quantity (default to 1) and priority (default to medium).

Once added, the user can mark it as purchased, and also delete it.

There is also a comment section that can be accessed by expanding the row.

The user can also change the priority.

There is a search bar at the top that will filter items by name.

The app is responsive and will look good both on mobile and desktop.

The app uses material UI and the material table, which allows new features to be added with ease.


## Architecture

This repo uses docker-compose to bring up:
- backend using django
- front end using angular
- a db powered by postgres
- nginx server to handle the routing

The repo was made quickly by utilizing https://github.com/docker/awesome-compose and the templates there. Unfortunately there was no time to ensure the latest versions are being used.

## Development

To have the backend running and have front end watch for changes, one can run `npm run start` in the `ui` folder after running the docker-compose command. The ui will be served on port 4201 and call the backend on port 8000 using a proxy

## Tests

Backend has full integration tests with 100% coverage which can be ran by running `./run-tests.sh`

This will build a docker container and run the backend tests there.

Unfortunately, due to time constraints, there was no opportunity to write full front end unit tests and e2e tests using both systems.
