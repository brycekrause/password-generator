# TODO: 

import random

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



def generate_password(length):
    password = []
    for x in range(int(length)):
        password.append(random.choice(all_characters))
    result = ''.join(password)
    print(result)
        

    return result