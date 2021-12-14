import eel
import pandas as pd

eel.init('web')


# Fungsi untuk mengumpulkan kriteria
@eel.expose
def kriteria(csv_name):
    # Array untuk menampung kolom dan baris
    columns = []

    df = pd.read_csv(csv_name)
    count_columns = len(df.columns)
    count_rows = len(df)

    # Membuat array berdasarkan nama kriteria
    for i in range(count_columns):
        columns.append([df.columns[i], df.iloc[count_rows-2]
                       [i], df.iloc[count_rows-1][i]])
    return(columns)


# Fungsi untuk mengumpulkan alternatif
@eel.expose
def alternatif(csv_name):
    rows = []

    df = pd.read_csv(csv_name)
    # count_columns = len(df.columns)
    count_rows = len(df)

    # Membuat array berdasarkan nama alternatif
    for i in range(count_rows):
        rows.append(df.iloc[i][0])
    return(rows)


eel.start('kriteria.html')
