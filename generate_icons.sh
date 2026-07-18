#!/bin/bash
set -e

SRC_IMG="/Users/nabanilchatterjee/.gemini/antigravity/brain/bf190de5-2fae-4c56-9c66-f38efafbea2d/big_monogram_1784393845456.png"
ROOT_DIR="/Users/nabanilchatterjee/Documents/Work/MyBareRNApp"

# 1. Copy to local assets
mkdir -p "$ROOT_DIR/src/assets/images"
cp "$SRC_IMG" "$ROOT_DIR/src/assets/images/logo.png"

# 2. Resize for iOS Icons
IOS_DIR="$ROOT_DIR/ios/MyBareRNApp/Images.xcassets/AppIcon.appiconset"
mkdir -p "$IOS_DIR"

sips -z 40 40 "$SRC_IMG" --out "$IOS_DIR/icon-20@2x.png"
sips -z 60 60 "$SRC_IMG" --out "$IOS_DIR/icon-20@3x.png"
sips -z 58 58 "$SRC_IMG" --out "$IOS_DIR/icon-29@2x.png"
sips -z 87 87 "$SRC_IMG" --out "$IOS_DIR/icon-29@3x.png"
sips -z 80 80 "$SRC_IMG" --out "$IOS_DIR/icon-40@2x.png"
sips -z 120 120 "$SRC_IMG" --out "$IOS_DIR/icon-40@3x.png"
sips -z 120 120 "$SRC_IMG" --out "$IOS_DIR/icon-60@2x.png"
sips -z 180 180 "$SRC_IMG" --out "$IOS_DIR/icon-60@3x.png"
sips -z 1024 1024 "$SRC_IMG" --out "$IOS_DIR/icon-1024.png"

# Write Contents.json
cat << 'EOF' > "$IOS_DIR/Contents.json"
{
  "images" : [
    {
      "idiom" : "iphone",
      "scale" : "2x",
      "size" : "20x20",
      "filename" : "icon-20@2x.png"
    },
    {
      "idiom" : "iphone",
      "scale" : "3x",
      "size" : "20x20",
      "filename" : "icon-20@3x.png"
    },
    {
      "idiom" : "iphone",
      "scale" : "2x",
      "size" : "29x29",
      "filename" : "icon-29@2x.png"
    },
    {
      "idiom" : "iphone",
      "scale" : "3x",
      "size" : "29x29",
      "filename" : "icon-29@3x.png"
    },
    {
      "idiom" : "iphone",
      "scale" : "2x",
      "size" : "40x40",
      "filename" : "icon-40@2x.png"
    },
    {
      "idiom" : "iphone",
      "scale" : "3x",
      "size" : "40x40",
      "filename" : "icon-40@3x.png"
    },
    {
      "idiom" : "iphone",
      "scale" : "2x",
      "size" : "60x60",
      "filename" : "icon-60@2x.png"
    },
    {
      "idiom" : "iphone",
      "scale" : "3x",
      "size" : "60x60",
      "filename" : "icon-60@3x.png"
    },
    {
      "idiom" : "ios-marketing",
      "scale" : "1x",
      "size" : "1024x1024",
      "filename" : "icon-1024.png"
    }
  ],
  "info" : {
    "author" : "xcode",
    "version" : 1
  }
}
EOF

# 3. Resize for Android Icons
AND_RES="$ROOT_DIR/android/app/src/main/res"

sips -z 48 48 "$SRC_IMG" --out "$AND_RES/mipmap-mdpi/ic_launcher.png"
sips -z 48 48 "$SRC_IMG" --out "$AND_RES/mipmap-mdpi/ic_launcher_round.png"

sips -z 72 72 "$SRC_IMG" --out "$AND_RES/mipmap-hdpi/ic_launcher.png"
sips -z 72 72 "$SRC_IMG" --out "$AND_RES/mipmap-hdpi/ic_launcher_round.png"

sips -z 96 96 "$SRC_IMG" --out "$AND_RES/mipmap-xhdpi/ic_launcher.png"
sips -z 96 96 "$SRC_IMG" --out "$AND_RES/mipmap-xhdpi/ic_launcher_round.png"

sips -z 144 144 "$SRC_IMG" --out "$AND_RES/mipmap-xxhdpi/ic_launcher.png"
sips -z 144 144 "$SRC_IMG" --out "$AND_RES/mipmap-xxhdpi/ic_launcher_round.png"

sips -z 192 192 "$SRC_IMG" --out "$AND_RES/mipmap-xxxhdpi/ic_launcher.png"
sips -z 192 192 "$SRC_IMG" --out "$AND_RES/mipmap-xxxhdpi/ic_launcher_round.png"

echo "All icons generated successfully!"
