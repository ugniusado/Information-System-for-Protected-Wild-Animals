from flask import Flask, render_template
import csv

app = Flask(__name__)

def read_csv_file(file_path):
    with open(file_path, mode='r', encoding='utf-8-sig') as f:
        reader = csv.DictReader(f)
        rows = list(reader)
    return rows

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/species')
def species():
    species_list = read_csv_file('species.csv')
    return render_template('species.html', species_list=species_list)

if __name__ == '__main__':
    app.run(debug=True)
