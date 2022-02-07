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


@eel.expose
def kriteria(csv_name):
    cols, rows = read_csv(csv_name)

    # Membuat array menggunakan Numpy yang berisi nama, kategori, dan bobot alternatif.
    kriteria = np.array([cols[1:], rows[4][1:], rows[5][1:]])

    # Tolist berfungsi untuk mengubah Numpy menjadi array biasa
    kriteria = kriteria.tolist()

    return(kriteria)


@eel.expose
def alternatif(csv_name):
    rows = read_csv(csv_name)[1]

    # Menggunakan Tolist untuk mengubah DataFrame menjadi array biasa
    alternatif = rows[:-2, :1].tolist()

    # Menggunakan Sum untuk menggabungkan array
    alternatif = sum(alternatif, [])

    return(alternatif)


# Fungsi untuk Tabel Kecocokan
@eel.expose
def tabel_kecocokan(csv_name):
    cols, rows = read_csv(csv_name)

    # Membuat array untuk Kriteria dan Alternatif
    kriteria = np.array(cols).tolist()
    alternatif = np.array(rows)[:-2].tolist()

    return(kriteria, alternatif)


@eel.expose
def matriks_ternormalisasi(csv_name):
    kriteria, alternatif = tabel_kecocokan(csv_name)

    alternatif = pd.DataFrame(alternatif)
    alt_name = np.array(alternatif[0]).tolist()
    alt_value = alternatif.iloc[:, 1:].astype(int)

    alt_sqrt = (alt_value**2).sum()**0.5
    alt_value /= alt_sqrt

    alt_value = np.array(alt_value).tolist()
    return(kriteria, alt_name, alt_value)


@eel.expose
def bobot_ternormalisasi(csv_name):
    kriteria, alt_name, alt_value = matriks_ternormalisasi(csv_name)
    bobot = read_csv(csv_name)[1][5][1:].astype(int)

    alt_value *= bobot
    alt_value = np.array(alt_value).tolist()

    return(kriteria, alt_name, alt_value)


eel.start('kriteria.html', size=(1280, 720))
