import tkinter as tk
from tkinter import ttk
import main

def update_output():
    length = length_slider.get()
    count = count_slider.get()
    passwords = ''
    for x in range(int(count)):
        passwords += main.generate_password(length) + '\n'

    print(passwords)
    password_output.config(state=tk.NORMAL)
    password_output.delete('1.0', tk.END)
    password_output.insert(tk.END, passwords)
    password_output.config(state=tk.DISABLED)

# Create the main window
root = tk.Tk()
root.title("Password Generator")
root.geometry("400x450")
root.configure(bg="#2c3e50")

# Create style for sliders and button
style = ttk.Style()
style.configure("TScale", background="#2c3e50", troughcolor="#34495e", sliderrelief="flat", slidercolor="#16a085")
style.map("TButton", background=[("active", "#16a085"), ("disabled", "#7f8c8d")])

title_label = tk.Label(root, text="Password Generator", bg="#2c3e50", fg="white", font=28)
title_label.pack(pady=(20, 0))

# Sliders and labels
# Length
length_label = tk.Label(root, text="Password Length", bg="#2c3e50", fg="white")
length_label.pack(pady=(20, 0))

length_frame = tk.Frame(root, bg="#2c3e50")
length_frame.pack(pady=10, padx=20, fill=tk.X)

length_start_label = tk.Label(length_frame, text='0', bg="#2c3e50", fg="white")
length_start_label.pack(side=tk.LEFT)

length_slider = ttk.Scale(length_frame, from_=0, to=100, orient="horizontal")
length_slider.pack(pady=10, padx=20, fill=tk.X)

length_end_label = tk.Label(length_frame, text='100', bg="#2c3e50", fg="white")
length_end_label.pack(side=tk.RIGHT)

# Count
count_label = tk.Label(root, text="Password Count", bg="#2c3e50", fg="white")
count_label.pack(pady=(20, 0))

count_frame = tk.Frame(root, bg="#2c3e50")
count_frame.pack(pady=10, padx=20, fill=tk.X)

count_start_label = tk.Label(count_frame, text='0', bg="#2c3e50", fg="white")
count_start_label.pack(side=tk.LEFT)


count_slider = ttk.Scale(count_frame, from_=0, to=100, orient="horizontal")
count_slider.pack(padx=20, fill=tk.X)

count_end_label = tk.Label(count_frame, text='100', bg="#2c3e50", fg="white")
count_end_label.pack(side=tk.RIGHT)

# Create button
generate_button = ttk.Button(root, text="Generate", command=update_output)
generate_button.pack(pady=10)

# Create text output area
password_output = tk.Text(root, height=5, width=40, bg="#34495e", fg="white", highlightbackground="#16a085")
password_output.pack(pady=10, padx=20)
password_output.config(state=tk.DISABLED)

# Run the application
root.mainloop()
