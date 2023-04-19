sleep 30 &&
python manage.py makemigrations myapp --noinput &&
python manage.py migrate &&
python manage.py runserver 0.0.0.0:8000