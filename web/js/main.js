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

        for (let j = 0; j < kriteria.length; j++) {
            // Mengisi nilai berdasarkan return dari Python
            var value = newRow.insertCell(j);
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

        var value = newRow.insertCell(0);
        value.innerHTML = alternatif[i];
    }
}

// Memanggil fungsi get_csv lalu mengirim ke Python
function get_tabel_kecocokan() {
    eel.tabel_kecocokan(get_csv())(set_tabel_kecocokan);
}

// Fungsi untuk menampilkan Tabel Kecocokan
function set_tabel_kecocokan(array) {
    // Fungsi untuk mendapatkan tabelnya
    var kriteria = array[0];
    var alternatif = array[1];
    var table = get_table();

    // Membuat Nama Kolom pada tabel
    var tr = document.createElement('tr')
    for (let i = 0; i < kriteria.length; i++) {
        var th = document.createElement('th');
        th.innerHTML = kriteria[i];
        tr.appendChild(th);
    }
    table.appendChild(tr);

    // Looping untuk setiap baris
    for (let i = 0; i < alternatif.length; i++) {
        var newRow = table.insertRow(table.rows.length);

        // Looping untuk setiap nilai pada baris
        for (let j = 0; j < alternatif[i].length; j++) {
            // Mengisi nilai berdasarkan return dari Python
            var value = newRow.insertCell(j);
            value.innerHTML = alternatif[i][j];
        }
    }
}

// Memanggil fungsi get_csv lalu mengirim ke Python
function get_matriks_ternormalisasi() {
    eel.matriks_ternormalisasi(get_csv())(set_matriks_ternormalisasi);
}

//Fungsi untuk menampilkan Matriks Ternormalisasi
function set_matriks_ternormalisasi(array) {
    tblKecocokan = set_tabel_kecocokan(array)
}