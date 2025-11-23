#!/bin/bash

current=$(git rev-parse --abbrev-ref HEAD)
git checkout main
git merge "$current"
git push

git checkout "$current"
