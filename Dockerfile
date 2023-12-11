FROM python:3.11.1-slim-bullseye

WORKDIR /usr/src/app

COPY backend/requirements.txt ./
COPY backend/manage.py ./
COPY backend/startup.sh ./
COPY backend/accounts ./
COPY backend/applications ./
COPY backend/comments ./
COPY backend/listings ./
COPY backend/notifications ./
COPY backend/petpal ./
COPY backend/ docker_entry.sh ./

# DB connection stuff

RUN apt-get update
RUN apt-get install -y postgresql postgresql-contrib python3-setuptools libpq-dev python3-dev build-essential

# End of DB stuff

# Environment variables

ENV DATABASE_HOSTNAME="209.91.163.74:8000"
ENV DATABASE_USERNAME="petpal"
ENV DATABASE_PASSWORD="password"

# End of environment variables

# install python deps
RUN pip install --no-cache-dir -r requirements.txt

# create env file
RUN echo DATABASE_HOSTNAME=$DATABASE_HOSTNAME >> .env && echo DATABASE_USERNAME=$DATABASE_USERNAME >> .env && echo DATABASE_PASSWORD=$DATABASE_PASSWORD >> .env

# server port
EXPOSE 8000
# db port
EXPOSE 5432

# start gunicorn 
CMD ["source", "docker_entry.sh"]
