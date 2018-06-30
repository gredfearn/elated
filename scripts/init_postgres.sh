#!/bin/bash
createuser dev_user -d -l -s 
createdb -O dev_user elated_dev
