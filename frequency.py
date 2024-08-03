from flask import Flask, render_template
import csv

app = Flask(__name__)

def read_config(filename):
    items = []
    with open(filename, 'r') as file:
        reader = csv.reader(file)
        for row in reader:
            items.append({'name': row[0], 'frequency': int(row[1])})
    return items

@app.route('/')
def index():
    items = read_config('config.txt')
    return render_template('index.html', items=items)

if __name__ == '__main__':
    app.run(debug=True)
