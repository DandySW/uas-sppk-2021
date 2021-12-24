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

    for i in range(count_rows-2):
        rows.append([df.iloc[i][0]])
        for j in range(1, count_columns):
            rows[i].append(df.iloc[i][j])
    # print(rows)
    return(columns, rows)


eel.start('kriteria.html')
