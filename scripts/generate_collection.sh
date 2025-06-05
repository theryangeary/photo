#!/bin/bash

# Change to git repository root
REPO_ROOT=$(git rev-parse --show-toplevel)
cd "$REPO_ROOT"

output_file="collection.js"

calc(){ awk "BEGIN { print "$*" }"; }
export -f calc

function path_to_js_object() {
    path=$1
    basename="$(basename $path)"
    output="{\"name\": \"$basename\""
    
    # Single exiftool call to get all metadata
    exif_data=$(exiftool -Subject -ExifImageHeight -ExifImageWidth -Title -Rating "$path")
    
    # Extract tags from Subject field
    tags="$(echo "$exif_data" | grep "Subject" | grep -Eo ":.*$" | tr -d ':' | tr -d ' ' | tr , '\n')"
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
    
    # Extract height and width
    height=$(echo "$exif_data" | grep "Exif Image Height" | choose -1)
    width=$(echo "$exif_data" | grep "Exif Image Width" | choose -1)
    heightRatio=$(calc $height/$width)
    output="$output , \"heightRatio\": $heightRatio"
    
    # Extract title
    title="$(echo "$exif_data" | grep "Title" | choose -f ': ' 1)"
    if [[ -n $title ]]; then
        output="$output , \"title\": \"$title\""
    fi
    
    # Extract rating
    rating=$(echo "$exif_data" | grep "Rating" | choose -1)
    output="$output , \"rating\": $rating"
    output="$output }"
    echo "$output"
}
export -f path_to_js_object

echo "let collection=" > $output_file
find . -name '*.jpg' | xargs -n 1 -I {} bash -c 'path_to_js_object "$@"' _ {} | sort | jq --slurp . >> $output_file
echo "export {collection};" >> $output_file
