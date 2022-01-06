// Mendapatkan file csv dari form input
function get_csv() {
    // Mendapatkan nama file csv
    var csv_name = document.getElementById("csv-file").files[0].name;

    // Mengubah button agar disable jika sudah ada file csv yang dipilih
    if (csv_name != '') {
        document.getElementById("form-csv").style.display = "none";
    }

    return (csv_name);
}

function get_table() {
    return (document.getElementsByTagName("table")[0]);
}

// Memanggil fungsi get_csv lalu mengirim ke Python
function get_kriteria() {
    eel.kriteria(get_csv())(set_kriteria);
}

// Fungsi untuk menampilkan Kriteria
function set_kriteria(kriteria) {
    // Fungsi untuk mendapatkan tabelnya
    var table = get_table();

    // Looping untuk mengisi setiap baris pada tabel
    for (let i = 0; i < kriteria[0].length; i++) {
        var newRow = table.insertRow(table.rows.length);

        var number = newRow.insertCell(0);
        number.innerHTML = i + 1;

        for (let j = 0; j < kriteria.length; j++) {
            // Mengisi nilai berdasarkan return dari Python
            var value = newRow.insertCell(j + 1);
            value.innerHTML = kriteria[j][i];
        }
    }
}

// Memanggil fungsi get_csv lalu mengirim ke Python
function get_alternatif() {
    eel.alternatif(get_csv())(set_alternatif);
}

// Fungsi untuk menampilkan Kriteria
function set_alternatif(alternatif) {
    // Fungsi untuk mendapatkan tabelnya
    var table = get_table();

    // Looping untuk mengisi setiap baris pada tabel
    for (let i = 0; i < alternatif.length; i++) {
        var newRow = table.insertRow(table.rows.length);

        var number = newRow.insertCell(0);
        number.innerHTML = i + 1;

        var value = newRow.insertCell(1);
        value.innerHTML = alternatif[i];
    }
}
