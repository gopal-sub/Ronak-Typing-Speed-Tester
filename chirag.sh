#!/bin/sh

for i in $(seq 1 100)
do
  git add *
  git commit -m"$i"
done

