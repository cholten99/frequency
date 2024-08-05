from flask import Flask, render_template
import os

app = Flask(__name__)

def read_config(file_path):
    items = []
    with open(file_path, 'r') as file:
        for line in file:
            name, frequency, text, link = line.strip().split(',')
            items.append({
                "name": name,
                "frequency": int(frequency),
                "text": text,
                "link": link
            })
    return items

@app.route('/')
def index():
    config_file_path = os.path.join(os.path.dirname(__file__), 'config.txt')
    items = read_config(config_file_path)
    return render_template('index.html', items=items)

if __name__ == '__main__':
    app.run(debug=True)
