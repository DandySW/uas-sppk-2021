import eel
import pandas as pd

eel.init('web')


# Fungsi untuk membaca file csv
@eel.expose
def csv(csv_name):
    # Array untuk menampung kolom
    columns = []

    df = pd.read_csv(csv_name)
    count_columns = len(df.columns)
    count_rows = len(df)

    # Membuat array berdasarkan nama kriteria
    for i in range(count_columns):
        columns.append([df.columns[i], df.iloc[count_rows-2]
                       [i], df.iloc[count_rows-1][i]])
    return(columns)


eel.start('kriteria.html', size=(1920, 1080))
