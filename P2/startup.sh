echo "First Time Install"

# Create the virtual environment and activate it
virtualenv -p 'python3.9' venv
source venv/bin/activate

# Install all requirements on the venv
pip install -r requirements.txt

# Run all migrations
./manage.py makemigrations
./manage.py migrate