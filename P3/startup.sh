echo "First Time Install"

cd ../P2

# Create the virtual environment and activate it
virtualenv venv
source venv/bin/activate

# Install all requirements on the venv
pip install -r requirements.txt

# Run all migrations
./manage.py makemigrations
./manage.py migrate

cd ../P3