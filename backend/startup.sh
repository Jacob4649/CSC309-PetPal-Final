#!/usr/bin/env bash

# RUN 'bash ./startup.sh' IN TERMINAL

# install relevant python version
sudo apt-get install python3.8

# install pillow deps and pip
sudo apt-get install python3-pip python3-dev python3-setuptools

# install venv
sudo apt-get install python3.8-venv

# create virtual environment
python3 -m venv env

# activate virtual environment
source env/bin/activate

# install from requirements file
pip install -r requirements.txt

# makemigrations
python3 manage.py makemigrations

# migrate
python3 manage.py migrate
