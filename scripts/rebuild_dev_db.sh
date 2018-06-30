#!/bin/bash

dropdb elated_dev
createdb -O dev_user elated_dev
echo "elated_dev database has been rebuilt!"