import numpy as np
import matplotlib.pyplot as plt
import tkinter as tk
from tkinter import ttk
from tkinter import messagebox
from tkinter import filedialog

def generar_sinusoidal(A=1, f=1, phi=0, dur=2, fs=1000, mostrar=True, nombre_archivo=None):
    t = np.linspace(0, dur, int(fs*dur), endpoint=True)
    # Ajustar para que la onda empiece y termine en cero
    y = A * np.sin(2 * np.pi * f * t + phi)
    # Forzar el primer y último punto a cero
    y[0] = 0
    y[-1] = 0
    y = A * np.sin(2 * np.pi * f * t + phi)
    fig, ax = plt.subplots(figsize=(10, 4))
    ax.plot(t, y, linewidth=2)
    ax.set_xlabel("Tiempo [s]")
    ax.set_ylabel("Amplitud")
    ax.set_ylim(-10, 10)
    # Línea del medio más gruesa
    ax.axhline(0, color="black", linewidth=1)
    # Línea vertical en el eje Y
    ax.axvline(0, color="black", linewidth=1)
    # Quitar recuadro
    for spine in ax.spines.values():
        spine.set_visible(False)
    # Valores del eje x en la línea del medio
    ax.xaxis.set_ticks_position('bottom')
    ax.xaxis.set_label_position('bottom')
    ax.yaxis.set_ticks_position('left')
    ax.yaxis.set_label_position('left')
    ax.tick_params(axis='x', direction='out', length=6, width=1)
    ax.tick_params(axis='y', direction='out', length=6, width=1)
    ax.grid(True, axis='y', linestyle='--', alpha=0.5)
    plt.tight_layout()
    if nombre_archivo:
        plt.savefig(nombre_archivo)
    if mostrar:
        plt.show()
    else:
        plt.close()

def guardar_grafico():
    try:
        A = int(intensidad_var.get())
        f = float(frecuencia_var.get())
        phi = float(fase_var.get())
        dur = float(duracion_var.get())
        fs = int(fs_var.get())
        archivo = filedialog.asksaveasfilename(defaultextension=".png", filetypes=[("PNG files", "*.png")])
        if archivo:
            generar_sinusoidal(A, f, phi, dur, fs, mostrar=False, nombre_archivo=archivo)
            messagebox.showinfo("Guardado", f"Gráfico guardado como {archivo}")
    except Exception as e:
        messagebox.showerror("Error", str(e))

def mostrar_grafico():
    try:
        A = int(intensidad_var.get())
        f = float(frecuencia_var.get())
        phi = float(fase_var.get())
        dur = float(duracion_var.get())
        fs = int(fs_var.get())
        generar_sinusoidal(A, f, phi, dur, fs, mostrar=True)
    except Exception as e:
        messagebox.showerror("Error", str(e))

root = tk.Tk()
root.title("Generador de ondas sinusoidales")

mainframe = ttk.Frame(root, padding="12 12 12 12")
mainframe.grid(row=0, column=0, sticky=("N", "W", "E", "S"))

ttk.Label(mainframe, text="Frecuencia (Hz):").grid(row=0, column=0, sticky="W")
frecuencia_var = tk.StringVar(value="1")
ttk.Entry(mainframe, textvariable=frecuencia_var, width=10).grid(row=0, column=1)

ttk.Label(mainframe, text="Intensidad (entero):").grid(row=1, column=0, sticky="W")
intensidad_var = tk.StringVar(value="1")
ttk.Entry(mainframe, textvariable=intensidad_var, width=10).grid(row=1, column=1)

ttk.Label(mainframe, text="Fase inicial (rad):").grid(row=2, column=0, sticky="W")
fase_var = tk.StringVar(value="0")
ttk.Entry(mainframe, textvariable=fase_var, width=10).grid(row=2, column=1)

ttk.Label(mainframe, text="Duración (s):").grid(row=3, column=0, sticky="W")
duracion_var = tk.StringVar(value="2")
ttk.Entry(mainframe, textvariable=duracion_var, width=10).grid(row=3, column=1)

ttk.Label(mainframe, text="Frecuencia de muestreo (Hz):").grid(row=4, column=0, sticky="W")
fs_var = tk.StringVar(value="1000")
ttk.Entry(mainframe, textvariable=fs_var, width=10).grid(row=4, column=1)

ttk.Button(mainframe, text="Mostrar gráfica", command=mostrar_grafico).grid(row=5, column=0, pady=10)
ttk.Button(mainframe, text="Guardar gráfica", command=guardar_grafico).grid(row=5, column=1, pady=10)

root.mainloop()
