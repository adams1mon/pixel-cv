#!/bin/bash

push_flags=''
if [ $# -gt 0 ]
then
    if [ $1 == '-f' ]
    then
        echo "using force push..."
        push_flags="$flags -f"
    fi
fi

current=$(git rev-parse --abbrev-ref HEAD)
git checkout main
git merge "$current"
git push $push_flags

git checkout "$current"
