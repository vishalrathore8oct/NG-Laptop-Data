# 1. Write a Python program to calculate the sum of a list of numbers using recursion.

arr = [1, 2, 3, 4, 5]

def sum_list(num_list):
    if len(num_list) == 1:
        return num_list[0]
    else:
        return num_list[0] + sum_list(num_list[1:])

print(sum_list(arr))
