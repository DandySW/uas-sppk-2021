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
    kriteria = np.array(
        [cols[1:], rows[len(rows)-2][1:], rows[len(rows)-1][1:]])

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

    bobot = read_csv(csv_name)[1][-1][1:].astype(int)
    alt_value *= bobot
    alt_value = np.array(alt_value).tolist()

    return(kriteria, alt_name, alt_value)


@eel.expose
def solusi_ideal(csv_name):
    kriteria = bobot_ternormalisasi(csv_name)[0]
    alt_value = np.array(bobot_ternormalisasi(csv_name)[2])
    cols = read_csv(csv_name)[0][1:]
    kategori = read_csv(csv_name)[1][-2][1:]

    A_plus = []
    A_minus = []
    for column in range(0, len(cols)):
        if kategori[column] == 'cost':
            A_plus.append(alt_value[:, column].min())
            A_minus.append(alt_value[:, column].max())

        elif kategori[column] == 'benefit':
            A_plus.append(alt_value[:, column].max())
            A_minus.append(alt_value[:, column].min())

        else:
            A_plus.append(0)
            A_minus.append(0)
            print(kategori[column])
    return(kriteria, A_plus, A_minus)


@eel.expose
def jarak_solusi_ideal(csv_name):
    bobot_ternomalisasi = np.array(bobot_ternormalisasi(csv_name)[2])
    A_plus, A_minus = solusi_ideal(csv_name)[1:3]
    rows = read_csv(csv_name)[1][:-2]
    alt = alternatif(csv_name)

    D_plus = []
    D_minus = []

    D_plus_square = (bobot_ternomalisasi - A_plus)**2
    D_minus_square = (bobot_ternomalisasi - A_minus)**2

    for row in range(len(rows)):
        D_plus_sqrt = (D_plus_square[row].sum())**0.5
        D_minus_sqrt = (D_minus_square[row].sum())**0.5

        D_plus.append(D_plus_sqrt)
        D_minus.append(D_minus_sqrt)
    return(alt, D_plus, D_minus)


@eel.expose
def nilai_preferensi(csv_name):
    alt, D_plus, D_minus = jarak_solusi_ideal(csv_name)

    data = {
        'alterantif': alt,
        'nilai': []
    }
    for row in range(len(alt)):
        V = D_minus[row] / (D_minus[row] + D_plus[row])
        data['nilai'].append(V)

    df = pd.DataFrame(data)
    ranking = df.iloc[:, 1].rank(ascending=False)
    df.insert(2, 'ranking', ranking)
    df = df.sort_values(by=['ranking'])
    df = np.array(df).tolist()

    return(df)


eel.start('kriteria.html')
