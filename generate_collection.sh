#!/bin/bash

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
    output="$output ]}"
    echo "$output"
}
export -f path_to_js_object

sed -i.bak "s/^collection=.*/$(find . -name '*.jpg' | xargs -n 1 -I {} bash -c 'path_to_js_object "$@"' _ {} | gawk 'BEGINFILE{print "collection=["}{print $0 ","}ENDFILE{print "]"}' | tr '\n' ' ')/" script.js
