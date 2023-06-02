#!/bin/bash
set -e

PACKAGE_NAME="$(node -e "console.log(require('./package.json')['name'])")"
CURRENT_VERSION="$(node -e "console.log(require('./package.json')['version'])")"

if [ -d build ]; then
  echo ""
  echo 'Clearing build directory'
  echo '---------------------------'
  rm -rf build
fi

if [ -d deploy ]; then
  echo ""
  echo 'Clearing deploy directory'
  echo '---------------------------'
  rm -rf deploy
fi

echo ""
echo 'Creating build directory'
echo '---------------------------'
npm run build:mfe

mkdir -p deploy/latest
mkdir -p deploy/v$CURRENT_VERSION

cp -a -R build/. deploy/latest
cp -a -R build/. deploy/v$CURRENT_VERSION

# Removing build directory
rm -rf build

# Renaming deploy directory to build
mv -v deploy build

echo ""
echo 'Build created successfully'
echo '---------------------------'
echo 'Done!'