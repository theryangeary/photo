#!/bin/bash

calc(){ awk "BEGIN { print "$*" }"; }
export -f calc

function path_to_js_object() {
    path=$1
    basename="$(basename $path)"
    output="{\"name\": \"$basename\""
    tags="$(exiftool -All $path | grep -E "^Subject" | grep -Eo ":.*$" | tr -d ':' | tr -d ' ' | tr , '\n')"
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
    height=$(exiftool -All $path | grep -E "Exif Image Height" | choose -1)
    width=$(exiftool -All $path | grep -E "Exif Image Width" | choose -1)
    heightRatio=$(calc $height/$width)
    output="$output , \"heightRatio\": $heightRatio"
    title="$(exiftool -All $path | grep -E "Title" | choose -f ': ' 1)"
    if [[ -n $title ]]; then
        output="$output , \"title\": \"$title\""
    fi
    output="$output }"
    echo "$output"
}
export -f path_to_js_object

sed -i.bak "s/^collection=.*/$(find . -name '*.jpg' | xargs -n 1 -I {} bash -c 'path_to_js_object "$@"' _ {} | sort | gawk 'BEGINFILE{print "collection=["}{print $0 ","}ENDFILE{print "]"}' | tr '\n' ' ' )/" script.js
