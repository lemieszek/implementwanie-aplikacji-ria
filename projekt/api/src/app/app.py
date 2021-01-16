from flask import Flask, jsonify, request
import psycopg2


app = Flask(__name__)


cars = [
    {'id': 3, 'name': 'Toyota3', 'price': 20003, 'milage': '200003', 'link': 'https://toyota.com/model/123'},
    {'id': 4, 'name': 'Toyota4', 'price': 20004, 'milage': '200004', 'link': 'https://toyota.com/model/124'},
    {'id': 5, 'name': 'Toyota5', 'price': 20005, 'milage': '200005', 'link': 'https://toyota.com/model/125'},
    {'id': 6, 'name': 'Toyota6', 'price': 20006, 'milage': '200006', 'link': 'https://toyota.com/model/126'},
]


class CarRepository:
    def __init__(self, cursor):
        self.cursor = cursor

    def get_all_cars(self, **filter):
        return cars

    def create_user(self, data):
        cars.append(data)
        return data


class CarsRepositoryPostgres:
    def __init__(self):
        self.connection = psycopg2.connect(user='postgres', password='postgres', host='postgres', port='5432', database='db_name')
        self.cursor = self.connection.cursor()

    def get_all_cars(self):
        sql = 'SELECT * FROM cars'
        self.cursor.execute(sql)
        # Not sure what data type is returned from fetchall() list of tuples ???
        records = self.cursor.fetchall()
        return records


@app.route('/cars', methods=['GET'])
def list_users():
    cars = CarRepository(None).get_all_cars()
    return jsonify({'result': cars})


@app.route('/cars', methods=['POST'])
def create_user():
    user = CarRepository(None).create_user(**request.json)
    return jsonify({'result': user})


if __name__ == '__main__':
    app.run('0.0.0.0', 8000, debug=True)

