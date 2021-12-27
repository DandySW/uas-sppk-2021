import eel
import pandas as pd

eel.init('web')


# Fungsi untuk mendapatkan Kriteria
@eel.expose
def kriteria(csv_name):
    # Array untuk menampung kriteria
    columns = []

    df = pd.read_csv(csv_name)
    count_columns = len(df.columns)
    count_rows = len(df)

    # Membuat array berdasarkan nama kriteria
    for i in range(count_columns):
        columns.append([df.columns[i], df.iloc[count_rows-2]
                       [i], df.iloc[count_rows-1][i]])
    return(columns)


# Fungsi untuk mendapatkan Alternatif
@eel.expose
def alternatif(csv_name):
    # Array untuk menampung alternatif
    rows = []

    df = pd.read_csv(csv_name)
    count_rows = len(df)

    # Membuat array berdasarkan nama alternatif
    for i in range(count_rows):
        rows.append(df.iloc[i][0])
    return(rows)


# Fungsi untuk mendapatkan Tabel Kecocokan
@eel.expose
def tabel_kecocokan(csv_name):
    columns = kriteria(csv_name)

    # Array untuk menampung nilai setiap baris
    rows = []

    df = pd.read_csv(csv_name)
    count_columns = len(df.columns)
    count_rows = len(df)

    # Mengubah DataFrame menjadi Array
    for i in range(count_rows-2):
        rows.append([df.iloc[i][0]])
        for j in range(1, count_columns):
            rows[i].append(df.iloc[i][j])
    return(columns, rows)


# Fungsi untuk mendapatkan Matriks Ternormalisasi
@eel.expose
def matriks_ternormalisasi(csv_name):
    array = tabel_kecocokan(csv_name)

    rows = array[1]
    columns = []
    # Membuat Array kolom
    for i in range(len(array[0])):
        columns.append(array[0][i][0])

    count_columns = len(columns)
    count_rows = len(rows)

    # Membuat DataFrame baru. Dihitung menggunakan rumus
    df = pd.DataFrame(rows, columns=columns)
    df.iloc[:, 1:] = df.iloc[:, 1:].astype(int)
    sqrt = (df.iloc[:, 1:]**2).sum()**0.5
    df.iloc[:, 1:] /= sqrt

    # Membuat array Baris dari DataFrame yang baru
    rows = []
    for i in range(count_rows):
        rows.append([df.iloc[i][0]])
        for j in range(1, count_columns):
            rows[i].append(df.iloc[i][j])

    return(columns, rows, df)
    # STOP DULU


eel.start('kriteria.html', size=(1280, 720))
