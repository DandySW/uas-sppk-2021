import eel
import pandas as pd

eel.init('web')


@eel.expose
def csv_topsis(csv_name):
    # === 1 Memasukkan dan Melihat Data ===
    # Import file csv. Menghitung baris dan kolom.
    df = pd.read_csv(csv_name)
    count_columns = len(df.columns)
    count_rows = len(df)

    # === 2 Matriks Keputusan Ternormalisasi ===
    # Membuang baris Kategori & Bobot dan kolom Alternatif
    df2 = df.drop([count_rows-2, count_rows-1])
    df2 = df2.drop('Alternatif', axis='columns').astype(int)

    # Tiap-tiap bobot dikuadratkan
    df2_square = df2**2

    # Menjumlahkan kuadrat dari setiap kriteria dan diakar
    sqrt = df2_square.sum()**0.5

    # Menghitung nilai R
    df2_norm = df2 / sqrt

    # === 3 Matriks Keputusan Ternormalisasi Terbobot ===
    # Menghitung nilai Y
    df2_weight = df2_norm * df.iloc[-1, 1:count_columns].astype(int)

    # === 4  Solusi ideal positif & negatif ===
    A_plus_minus = {
        'A_plus': [],
        'A_minus': []
    }
    for column in range(1, count_columns):
        # Kondisi jika kategori dari kriteria adalah benefit
        if df.iloc[-2, column] == 'benefit' or df.iloc[-2, column] == 'b':
            A_plus_minus['A_plus'].append(df2_weight.iloc[:, column-1].max())
            A_plus_minus['A_minus'].append(df2_weight.iloc[:, column-1].min())

        # Kondisi jika kategori dari kriteria adalah cost
        elif df.iloc[-2, column] == 'cost' or df.iloc[-2, column] == 'c':
            A_plus_minus['A_plus'].append(df2_weight.iloc[:, column-1].min())
            A_plus_minus['A_minus'].append(df2_weight.iloc[:, column-1].max())

        # Kondisi jika bukan keduanya
        else:
            print("Kategori untuk Kriteria salah")

    # === 5 Jarak Antara Nilai Setiap Alternatif dengan Matriks Solusi Ideal Positif & Negatif ===
    # Mencari nilai D+ dan D-
    D_plus_minus = {
        'D_plus': [],
        'D_minus': []
    }
    D_plus_square = (df2_weight - A_plus_minus['A_plus'])**2
    D_minus_square = (df2_weight - A_plus_minus['A_minus'])**2

    for row in range(count_rows-2):
        D_plus = (D_plus_square.loc[row].sum())**0.5
        D_minus = (D_minus_square.loc[row].sum())**0.5

        D_plus_minus['D_plus'].append(D_plus)
        D_plus_minus['D_minus'].append(D_minus)

    # === 6 Nilai preferensi untuk setiap alternatif ===
    # Mencari nilai V
    total = []
    for row in range(count_rows-2):
        v = D_plus_minus['D_minus'][row] / \
            (D_plus_minus['D_minus'][row] + D_plus_minus['D_plus'][row])
        total.append(v)

    # Memberikan ranking untuk setiap alternatif
    df3 = df[['Alternatif']]
    df3 = df3.drop([count_rows-2, count_rows-1])
    df3.insert(1, 'Total', total)

    ranking = df3.iloc[:, 1].rank(ascending=False)
    df3.insert(2, 'Ranking', ranking)
    df3 = df3.sort_values(by=['Ranking'])
    print(df3.to_string())


eel.start('index.html')
