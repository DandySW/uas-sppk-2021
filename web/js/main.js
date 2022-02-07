// Mendapatkan file csv dari form input
function get_csv() {
    var csv_name = document.getElementById("csv-file").files[0].name;

    if (csv_name != '') {
        document.getElementById("form-csv").style.display = "none";
    }

    return (csv_name);
}

function get_table() {
    return (document.getElementsByTagName("tbody")[0]);
}

function get_kriteria() {
    eel.kriteria(get_csv())(set_kriteria);
}

function set_kriteria(kriteria) {
    var table = get_table();

    // Looping untuk mengisi setiap baris pada tabel
    for (let i = 0; i < kriteria[0].length; i++) {
        var newRow = table.insertRow(table.rows.length);

        for (let j = 0; j < kriteria.length; j++) {
            var value = newRow.insertCell(j);
            value.innerHTML = kriteria[j][i];
        }
    }
}

function get_alternatif() {
    eel.alternatif(get_csv())(set_alternatif);
}

function set_alternatif(alternatif) {
    var table = get_table();

    // Looping untuk mengisi setiap baris pada tabel
    for (let i = 0; i < alternatif.length; i++) {
        var newRow = table.insertRow(table.rows.length);

        var value = newRow.insertCell(0);
        value.innerHTML = alternatif[i];
    }
}

function get_tabel_kecocokan() {
    eel.tabel_kecocokan(get_csv())(set_tabel_kecocokan);
}

function set_tabel_kecocokan(array) {
    var table = get_table();
    var kriteria = array[0];
    var alternatif = array[1];

    // Membuat Nama Kolom pada tabel
    var tr = document.createElement('tr');
    for (let i = 0; i < kriteria.length; i++) {
        var th = document.createElement('th');
        th.innerHTML = kriteria[i];
        tr.appendChild(th);
    }
    table.appendChild(tr);


    // Looping untuk setiap baris
    for (let i = 0; i < alternatif.length; i++) {
        var newRow = table.insertRow(table.rows.length);

        // Looping untuk nilai tiap kolom pada setiap baris
        for (let j = 0; j < alternatif[i].length; j++) {
            var value = newRow.insertCell(j);
            value.innerHTML = alternatif[i][j];
        }
    }
}

function get_matriks_ternormalisasi() {
    eel.matriks_ternormalisasi(get_csv())(set_matriks_ternormalisasi);
}

function set_matriks_ternormalisasi(array) {
    var table = get_table();
    var kriteria = array[0];
    var alt_name = array[1];
    var alt_value = array[2];

    // Membuat Nama Kolom pada tabel
    var tr = document.createElement('tr');
    for (let i = 0; i < kriteria.length; i++) {
        var th = document.createElement('th');
        th.innerHTML = kriteria[i];
        tr.appendChild(th);
    }
    table.appendChild(tr);

    // Looping untuk setiap baris
    for (let i = 0; i < alt_value.length; i++) {
        var newRow = table.insertRow(table.rows.length);

        // Menambahkan nama Alternatif
        var value = newRow.insertCell(0);
        value.innerHTML = alt_name[i];


        // Looping untuk nilai tiap kolom pada setiap baris
        for (let j = 0; j < alt_value[i].length; j++) {
            var value = newRow.insertCell(j + 1);
            value.innerHTML = alt_value[i][j].toFixed(6);
        }
    }
}

function get_bobot_ternormalisasi() {
    eel.bobot_ternormalisasi(get_csv())(set_bobot_ternormalisasi);
}

function set_bobot_ternormalisasi(array) {
    set_matriks_ternormalisasi(array)

}

