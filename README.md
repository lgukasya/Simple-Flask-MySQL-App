
# Simple Flask App
#### - Versions
- Python 3.9.7
- Flask 2.0.2
- Werkzeug 2.0.3

### First step
```shell=
git clone https://github.com/lgukasya/Simple-Flask-App.git
```

### 1. Install pip
```shell=
sudo apt-get install python3-pip
```

### 2. Install Python Virtual Environment
```shell=
apt install python3-venv
```

### 3. Create a virtual environment inside the project folder
```shell=
python3 -m venv venv
```

### 4. Activate the virtual environment
```shell=
. venv/bin/activate
```
### 5. Install all required dependencies
```shell=
pip install -r requirements.txt
```

### 6. Specify the main file
```shell=
export FLASK_APP=main.py
```

If you want to run this application in development mode, add this configuration.
```shell=
export FLASK_ENV=development
```

### Final step, run the Application
```shell=
flask run
```

## License

MIT
