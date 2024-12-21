# Write a Python program to convert an integer to a string in any base using recursion .

num = 7
sum = 0
for i in range(1, num):
    if num % i == 0:
        sum += i
if num == sum: 
    print(True)
else: 
    print(False)