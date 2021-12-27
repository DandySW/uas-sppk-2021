// Fungsi untuk mendapatkan file csv
function get_csv() {
    // Mendapatkan nama file csv
    var csv_name = document.getElementById("csv").files[0].name;

    // Mengubah button agar disable
    if (csv_name != '') {
        document.getElementById("form-csv").style.display = "none";
    }

    // Mendapatkan nama file csv
    return (csv_name);
}

// Fungsi untuk mendapatkan Kriteria
function get_kriteria() {
    csv_name = get_csv();
    eel.kriteria(csv_name)(set_kriteria);
}

// Fungsi untuk menampilkan Kriteria
function set_kriteria(columns) {
    // Fungsi untuk mendapatkan tabelnya
    var table = document.getElementsByTagName("table")[0];

    // Looping untuk mengisi tabel
    for (let column = 0; column < (columns.length - 1); column++) {
        // Menghitung berapa banyak baris pada tabel
        var newRow = table.insertRow(table.rows.length);

        // Menambah baris baru
        var cell1 = newRow.insertCell(0);
        var cell2 = newRow.insertCell(1);
        var cell3 = newRow.insertCell(2);
        var cell4 = newRow.insertCell(3);

        // Masukkan nilai kolom pada setiap baris baru
        cell1.innerHTML = column + 1;
        cell2.innerHTML = columns[(column + 1)][0];
        cell3.innerHTML = columns[(column + 1)][1];
        cell4.innerHTML = columns[(column + 1)][2];
    }

}

// Fungsi untuk mendapatkan Alternatif
function get_alternatif() {
    csv_name = get_csv();
    eel.alternatif(csv_name)(set_alternatif);
}

// Fungsi untuk menampilkan Alternatif
function set_alternatif(rows) {
    // Fungsi untuk mendapatkan tabelnya
    var table = document.getElementsByTagName("table")[0];

    // Looping untuk mengisi tabel
    for (let row = 0; row < (rows.length - 2); row++) {
        // Menghitung berapa banyak baris pada tabel
        var newRow = table.insertRow(table.rows.length);

        // Menambah baris baru
        var cell1 = newRow.insertCell(0);
        var cell2 = newRow.insertCell(1);

        // Masukkan nilai kolom pada setiap baris baru
        cell1.innerHTML = row + 1;
        cell2.innerHTML = rows[(row)];
    }
}

// Fungsi untuk mendapatkan Tabel Kecocokan
function get_tabel_kecocokan() {
    csv_name = get_csv();
    eel.tabel_kecocokan(csv_name)(set_tabel_kecocokan);
}

// Fungsi untuk menampilkan Tabel Kecocokan
// Return dari python tergabung dalam 1 array
function set_tabel_kecocokan(array) {

    // Fungsi untuk mendapatkan tabelnya
    var tr = document.getElementById("tabel-kecocokan");

    // Lopping untuk membuat nama kolom
    for (let column = 0; column < array[0].length; column++) {
        var th = document.createElement('th');
        th.innerHTML = (array[0][column][0]);
        tr.appendChild(th);
    }

    // Fungsi untuk mendapatkan tabelnya
    var table = document.getElementsByTagName("table")[0];

    // Looping untuk mengisi tabel
    for (let row = 0; row < (array[1].length); row++) {
        // Menghitung berapa banyak baris pada tabel
        var newRow = table.insertRow(table.rows.length);

        for (let column = 0; column < array[0].length; column++) {
            // Menambah baris baru
            var cell = newRow.insertCell(column);

            // Masukkan nilai kolom pada setiap baris baru
            cell.innerHTML = array[1][row][column];
        }
    }
}

// Fungsi untuk mendapatkan matriks ternormalisasi
function get_matriks_ternormalisasi() {
    csv_name = get_csv();
    eel.matriks_ternormalisasi(csv_name)(set_matriks_ternormalisasi);
}

// Fungsi untuk menampilkan Tabel Kecocokan
// Return dari python tergabung dalam 1 array
function set_matriks_ternormalisasi(array) {
    console.log(array)
    // Masih belum dikerjakan. ingin mencoba membuat lebih efektif
    // STOP DULU
}




















// Fungsi untuk mendapatkan bobot ternormalisasi
function get_bobot_ternormalisasi() {
    csv_name = get_csv();
    eel.bobot_ternormalisasi(csv_name)(set_bobot_ternormalisasi);
}

// Fungsi untuk mendapatkan jarak solusi ideal
function get_jarak_solusi_ideal() {
    csv_name = get_csv();
    eel.jarak_solusi_ideal(csv_name)(set_jarak_solusi_ideal);
}




// Fungsi untuk mendapatkan nilai prefensi
function get_nilaipreferensi() {
    csv_name = get_csv();
    eel.nilai_preferensi(csv_name)(set_nilai_preferensi);
}

// Fungsi untuk mendapatkan solusi ideal
function get_solusi_ideal() {
    csv_name = get_csv();
    eel.solusi_ideal(csv_name)(set_solusi_ideal);
}
