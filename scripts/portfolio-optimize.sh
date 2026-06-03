#!/bin/bash
# Run from a portfolio asset folder, e.g. public/portfolio/nutrimind-rag/
# Converts PNG/JPG to WebP and compresses MP4 demos.

mkdir -p OLD

echo "--- Start konwersji wideo (MP4 -> lekki MP4) ---"
for vid in *.mp4; do
    [ -e "$vid" ] || continue
    echo "Przetwarzam wideo: $vid"
    mv "$vid" OLD/
    ffmpeg -i "OLD/$vid" -an -vf "scale=1500:-2" -c:v libx264 -crf 18 "$vid"
done

echo "--- Start konwersji zdjec (JPG/PNG -> WebP) ---"
for img in *.[jJ][pP][gG] *.[jJ][pP][eE][gG] *.[pP][nN][gG]; do
    [ -e "$img" ] || continue
    echo "Przetwarzam zdjecie: $img"
    filename="${img%.*}"
    mv "$img" OLD/
    magick "OLD/$img" -resize 1500x -quality 80 "${filename}.webp"
done

echo "--- Gotowe ---"
