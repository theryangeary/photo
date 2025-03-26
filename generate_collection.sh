#!/bin/bash

output_file="collection.js"

calc(){ awk "BEGIN { print "$*" }"; }
export -f calc

function path_to_js_object() {
    path=$1
    basename="$(basename $path)"
    output="{\"name\": \"$basename\""
    fields="$(exiftool -Subject -ExifImageHeight -ExifImageWidth -Title -Rating $path)"
    tags="$(echo $fields | grep Subject | grep -Eo ":.*$" | tr -d ':' | tr -d ' ' | tr , '\n')"
    output="$output , \"tags\": ["
    first=true
    for tag in $tags; do
        if [ $first = true ]; then
            output="$output \"$tag\""
            first=false
        else
            output="$output , \"$tag\""
        fi
    done
    output="$output ]"
    height=$(echo $fields | grep "Exif Image Height" | choose -1)
    width=$(echo $fields | grep "Exif Image Width" | choose -1)
    heightRatio=$(calc $height/$width)
    output="$output , \"heightRatio\": $heightRatio"
    title="$(echo $fields | grep "Title" | choose -f ': ' 1)"
    if [[ -n $title ]]; then
        output="$output , \"title\": \"$title\""
    fi
    output="$output , \"rating\": $(echo $fields | grep "Rating" | choose -1)"
    output="$output }"
    echo "$output"
}
export -f path_to_js_object

echo "let collection=" > $output_file
find . -name '*.jpg' | xargs -n 1 -I {} bash -c 'path_to_js_object "$@"' _ {} | sort | jq --slurp . >> $output_file
echo "export {collection};" >> $output_file
