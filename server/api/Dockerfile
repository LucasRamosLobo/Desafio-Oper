FROM python:3.9
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED=1
WORKDIR /app
COPY . /app/
COPY requirements.txt .
RUN python -m pip install --upgrade pip
RUN pip install -r requirements.txt
COPY . .
COPY ./entrypoint.sh /
ENTRYPOINT ["sh", "/entrypoint.sh"]