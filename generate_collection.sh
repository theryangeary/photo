#!/bin/bash
sed -i.bak "s/^collection=.*/$(find . -name '*.jpg' | xargs basename | gawk 'BEGINFILE{print "collection=["}{print "\"" $1 "\","}ENDFILE{print "]"}' | tr '\n' ' ')/" script.js
