#!/bin/bash -e

if [ "$TRAVIS_PULL_REQUEST" != "false" -o "$TRAVIS_BRANCH" != "master" ] ; then
  echo "skip deployment for branch $GIT_BRANCH"
  exit 0
fi

git config --global user.email "nobody@nobody.org"
git config --global user.name "Travis CI"

cd build
git init
git add .
git commit -m "Deploy to Github Pages"
git push --force "https://${GITHUB_TOKEN}@github.com/catapulte/catinder-front.git" master:gh-pages
