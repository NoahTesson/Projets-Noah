FROM python:3.10.8

WORKDIR /app

COPY . /app

RUN pip install -r requirements.txt

EXPOSE 8080

CMD ["python", "manage.py", "runserver", "0.0.0.0:8080"]

# CMD ["python", "manage.py", "test", "backendNew/test"]
