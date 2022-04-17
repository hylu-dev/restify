import requests
from random import randint, randrange, choice
import os
from faker import Faker  # Dependency: pip install faker

#Icons sourced from <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div><div>Icons made by <a href="https://www.flaticon.com/authors/bomsymbols" title="BomSymbols">BomSymbols</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div><div>Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div><div>Icons made by <a href="https://www.flaticon.com/authors/narak0rn" title="narak0rn">narak0rn</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div><div>Icons made by <a href="https://www.flaticon.com/authors/stellalunart" title="Stellalunart">Stellalunart</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div><div>Icons made by <a href="https://www.flaticon.com/authors/whitevector" title="Whitevector">Whitevector</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div><div>Icons made by <a href="https://www.flaticon.com/authors/vitaly-gorbachev" title="Vitaly Gorbachev">Vitaly Gorbachev</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>

def random_phone_num():
    n = 10
    return ''.join(["{}".format(randint(0, 9)) for num in range(0, n)])


def create_users(count):
    users = []
    for i in range(count):
        name = Faker().name().split()
        fname = name[0]
        lname = name[1]
        users.append({
            "first_name": fname,
            "last_name": lname,
            "password": f"{fname}123456789",
            "password2": f"{fname}123456789",
            "username": fname+lname,
            "email": f"{fname}.{lname}@domain.com",
            "phone_number": random_phone_num()
        })
    for user in users:
        path = choice(os.listdir("./icons"))
        icon = open(f'icons/{path}', 'rb')
        res = requests.post(
            'http://127.0.0.1:8000/accounts/api/register/', data=user, files={'avatar': icon})
        if res.status_code == 201:
            print(
                f"{res.status_code}: Created user {user['first_name']} {user['last_name']}")
        else:
            print(
                f"{res.status_code}: Failed to create {user['first_name']} {user['last_name']}")


def create_owners(count):
    users = []
    for i in range(count):
        name = Faker().name().split()
        fname = name[0]
        lname = name[1]
        users.append({
            "first_name": fname,
            "last_name": lname,
            "password": f"{fname}123456789",
            "password2": f"{fname}123456789",
            "username": fname+lname,
            "email": f"{fname}.{lname}@domain.com",
            "phone_number": random_phone_num()
        })
    for user in users:
        path = choice(os.listdir("./icons"))
        icon = open(f'icons/{path}', 'rb')
        res = requests.post(
            'http://127.0.0.1:8000/accounts/api/register/', data=user, files={'avatar': icon})
        print(f"{res.status_code}: User Create {name}")
        if res.status_code == 201:
            create_restaurant(login(user['username'], user['password']))


def login(username, password):
    res = requests.post('http://127.0.0.1:8000/accounts/api/login/', {
        'username': username,
        'password': password
    })
    return res.json()['access']


def create_restaurant(token):
    name = f"{Faker().text(max_nb_chars=10)} Restaurant"
    path = choice(os.listdir("./icons"))
    logo = open(f'icons/{path}', 'rb')
    data = {
        "name": name,
        "address": Faker().street_address(),
        "postal_code": Faker().postcode(),
        "phone_number": random_phone_num()
    }
    res = requests.post('http://127.0.0.1:8000/restaurants/api/restaurant/create/', data=data,
                        headers={"Authorization": f"Bearer {token}"}, files={'logo': logo})
    print(f"{res.status_code}: Restaurant Create {name}")
    if res.status_code == 201:
        add_foods(token)
        add_photos(token)
        add_posts(token)


def add_foods(token):
    for i in range(randint(5, 10)):
        data = {
            "name": choice(os.listdir("./foods")).split('.')[0],
            "description": Faker().paragraph(nb_sentences=randint(2, 5)),
            "price": randint(0, 20)
        }
        res = requests.post("http://127.0.0.1:8000/restaurants/api/restaurant/item/add/", data=data,
                            headers={"Authorization": f"Bearer {token}"})
        print(f"{res.status_code}: Add Food Item {data['name']}")


def add_photos(token):
    for i in range(randint(5, 10)):
        path = choice(os.listdir("./foods"))
        image = open(f'foods/{path}', 'rb')
        res = requests.post("http://127.0.0.1:8000/restaurants/api/restaurant/photo/add/",
                            headers={"Authorization": f"Bearer {token}"},
                            files={'image': image})
        print(f"{res.status_code}: Add photo {path}")


def add_posts(token):
    for i in range(randint(5, 10)):
        data = {
            "body": Faker().paragraph(nb_sentences=randint(5, 10)),
        }
        res = requests.post("http://127.0.0.1:8000/restaurants/api/restaurant/post/", data=data,
                            headers={"Authorization": f"Bearer {token}"})
        print(f"{res.status_code}: Add Post")


def main():
    # Make sure you're current working directory is inside populate-db
    # Ensure django server is running
    create_users(25)
    create_owners(25)


if __name__ == "__main__":
    main()
