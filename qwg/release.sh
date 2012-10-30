#!/bin/bash -e
#
# Purpose: Package extension and upload it to github

if test $# -ne 1; then
  echo "Usage: release.sh <version>"
  exit 1
fi

version=$1

echo "Cleaning..."
rm -rf artifacts
mkdir artifacts

echo "Preparing..."
cp -R src artifacts/qwg-$version
sed 's/\$VERSION\$/'$version'/g' src/manifest.json > artifacts/qwg-$version/manifest.json
sed 's/\$VERSION\$/'$version'/g' update_template.xml > artifacts/update.xml

echo "Packing extension..."
./tools/crxmake.sh artifacts/qwg-$version qwg.pem

echo "Created... artifacts/qwg-$version.crx"

ruby ./tools/github-upload.rb artifacts/update.xml daviddenton/qwg -f
ruby ./tools/github-upload.rb artifacts/qwg-$version.crx daviddenton/qwg -f

echo "Released!... v"$version
