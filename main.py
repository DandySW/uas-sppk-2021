import eel
import pandas as pd
import numpy as np

eel.init('web')


# Membaca file csv, menghitung baris dan kolom
def read_csv(csv_name):
    df = pd.read_csv(csv_name)
    cols = df.columns.values
    rows = df.values

    return(cols, rows)


# Fungsi untuk Kriteria
@eel.expose
def kriteria(csv_name):
    # Memanggil fungsi read_csv
    cols, rows = read_csv(csv_name)

    # Membuat array menggunakan Numpy yang berisi nama, kategori, dan bobot alternatif.
    kriteria = np.array([cols[1:], rows[4][1:], rows[5][1:]])

    # Tolist berfungsi untuk mengubah Numpy menjadi array biasa
    kriteria = kriteria.tolist()

    return(kriteria)


# Fungsi untuk Alternatif
@eel.expose
def alternatif(csv_name):
    # Memanggil fungsi read_csv
    rows = read_csv(csv_name)[1]

    # Menggunakan Tolist untuk mengubah DataFrame menjadi array biasa
    alternatif = rows[:-2, :1].tolist()

    # Menggunakan Sum untuk menggabungkan array
    alternatif = sum(alternatif, [])

    return(alternatif)


eel.start('kriteria.html', size=(1280, 720))
