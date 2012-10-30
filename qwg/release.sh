#!/bin/bash -e
#
# Purpose: Package txtension and upload it to github

if test $# -ne 1; then
  echo "Usage: release.sh <version>"
  exit 1
fi

version=$1

echo "Packaging..."
./tools/crxmake.sh src qwg.pem

mv src.crx artifacts/qwg-$version.crx
echo "Created... artifacts/qwg-$version.crx"

ruby ./tools/github-upload.rb artifacts/qwg-$version.crx daviddenton/qwg -f