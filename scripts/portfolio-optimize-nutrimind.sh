#!/bin/bash

# 1. Tworzenie folderu na oryginały, jeśli jeszcze nie istnieje
mkdir -p OLD

echo "--- Start konwersji wideo (MP4 -> lekki MP4) ---"
for vid in *.mp4; do
    # Sprawdzenie czy pliki istnieją, żeby uniknąć błędów
    [ -e "$vid" ] || continue
    
    echo "Przetwarzam wideo: $vid"
    
    # KROK 1: Przenosimy oryginał do folderu OLD, zanim cokolwiek zmienimy
    mv "$vid" OLD/
    
    # KROK 2 i 3: Pobieramy plik z "OLD/$vid", a wynik zapisujemy jako "$vid" w bieżącym folderze
    # -an usuwa dźwięk
    # -vf scale=1500:-2 ustawia szerokość na 1500px
    # -crf 24 to świetna jakość i lekki plik
    ffmpeg -i "OLD/$vid" -an -vf "scale=1500:-2" -c:v libx264 -crf 18 "$vid"
done

echo "--- Start konwersji zdjęć (JPG/PNG -> WebP) ---"
# Pętla obsługuje najpopularniejsze formaty (małe i duże litery rozszerzeń)
for img in *.[jJ][pP][gG] *.[jJ][pP][eE][gG] *.[pP][nN][gG]; do
    [ -e "$img" ] || continue
    
    echo "Przetwarzam zdjęcie: $img"
    
    # Wyciągamy nazwę pliku bez rozszerzenia
    filename="${img%.*}"
    
    # KROK 1: Przenosimy oryginalne zdjęcie do folderu OLD
    mv "$img" OLD/
    
    # KROK 2 i 3: Pobieramy obrazek z folderu OLD i zapisujemy jako lekki .webp w folderze głównym
    # -resize 1500x zmienia szerokość do 1500px zachowując proporcje
    # -quality 80 to świetna jakość dla WebP
    magick "OLD/$img" -resize 1500x -quality 80 "${filename}.webp"
done

echo "--- Gotowe! Nowe, lekkie pliki są w folderze głównym, a oryginały czekają w bezpiecznym podfolderze OLD. ---"