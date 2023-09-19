FROM python:3.11
WORKDIR /app

COPY requirements.txt /app
RUN pip install -U pip
RUN pip install -r requirements.txt

EXPOSE 5000
ENTRYPOINT [ "gunicorn", "--bind", "0.0.0.0:5000", "app:app" ]