// Fungsi untuk mendapatkan file csv
function get_csv() {
    // Mengubah button agar disable
    document.getElementById("form-csv").style.display = "none";

    var csv_name = document.getElementById('csv').files[0].name;
    return (csv_name)
}

// Fungsi untuk mendapatkan kriteria
function get_kriteria() {
    csv_name = get_csv()
    eel.kriteria(csv_name)(set_kriteria);
}

// Fungsi untuk menampilkan kriteria
function set_kriteria(columns) {
    // Fungsi untuk mendapatkan tabelnya
    var table = document.getElementsByTagName("table")[0];

    // Looping untuk mengisi tabel
    for (let column = 0; column < (columns.length - 1); column++) {
        // Menghitung berapa banyak baris pada tabel
        var newRow = table.insertRow(table.rows.length);

        // Menambah cell pada baris baru
        var cell1 = newRow.insertCell(0);
        var cell2 = newRow.insertCell(1);
        var cell3 = newRow.insertCell(2);
        var cell4 = newRow.insertCell(3);

        // Masukkan nilai ke dalam cell
        cell1.innerHTML = column + 1;
        cell2.innerHTML = columns[(column + 1)][0];
        cell3.innerHTML = columns[(column + 1)][1];
        cell4.innerHTML = columns[(column + 1)][2];
    }

}

// Fungsi untuk mendapatkan alternatif
function get_alternatif() {
    csv_name = get_csv()
    eel.alternatif(csv_name)(set_alternatif);
}

// Fungsi untuk menampilkan alternatif
function set_alternatif(rows) {
    // Fungsi untuk mendapatkan tabelnya
    var table = document.getElementsByTagName("table")[0];

    // Looping untuk mengisi tabel
    for (let row = 0; row < (rows.length - 2); row++) {
        // Menghitung berapa banyak baris pada tabel
        var newRow = table.insertRow(table.rows.length);

        // Menambah cell pada baris baru
        var cell1 = newRow.insertCell(0);
        var cell2 = newRow.insertCell(1);

        // Masukkan nilai ke dalam cell
        cell1.innerHTML = row + 1;
        cell2.innerHTML = rows[(row)];
    }
}