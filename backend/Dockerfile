FROM python:3.11.1-slim-bullseye

WORKDIR /usr/src/app

COPY requirements.txt ./
COPY manage.py ./
COPY startup.sh ./
COPY accounts ./
COPY applications ./
COPY comments ./
COPY listings ./
COPY notifications ./
COPY petpal ./

# DB connection stuff

RUN apt-get update
RUN apt-get install -y postgresql postgresql-contrib python3-setuptools libpq-dev python3-dev

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

CMD ["gunicorn", "--bind", "0.0.0.0:8000", "--workers=3", "--threads=3", "petpal.wsgi"]