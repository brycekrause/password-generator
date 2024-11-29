# TODO: gui

import random

length = input("Password length? ")
count = input("Generate how many passwords? ")

numbers = str("1234567890")
symbols = str("!@#$%^&*()-~+><")
letters = str("ABCDEFGHIJKLMNOPQRSTUVWXYZ")

all_characters = []
for char in numbers:    
    all_characters.append(char)
for char in symbols:
    all_characters.append(char)
for char in letters: 
    all_characters.append(char)
for char in letters.lower():
    all_characters.append(char)

password = []

for x in range(int(count)):
    for x in range(int(length)):
        password.append(random.choice(all_characters))
    result = ''.join(password)
    print(result)
    password = []
    result = ''