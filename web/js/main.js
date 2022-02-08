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

function get_solusi_ideal() {
    eel.solusi_ideal(get_csv())(set_solusi_ideal);
}

function set_solusi_ideal(array) {
    var table = get_table();
    var kriteria = array[0];
    var A_value = [array[1], array[2]];

    var tr = document.createElement('tr');
    var th = document.createElement('th');
    th.innerHTML = '';
    tr.appendChild(th);
    for (let i = 1; i < kriteria.length; i++) {
        var th = document.createElement('th');
        th.innerHTML = kriteria[i];
        tr.appendChild(th);
    }
    table.appendChild(tr);

    for (let i = 0; i < 2; i++) {
        var newRow = table.insertRow(table.rows.length);
        var value = newRow.insertCell(0);
        value.innerHTML = (i == 0) ? 'A+' : 'A-';

        for (let j = 0; j < A_value[i].length; j++) {
            var value = newRow.insertCell(j + 1);
            value.innerHTML = A_value[i][j].toFixed(6);
        }
    }
}

function get_jarak_solusi_ideal() {
    eel.jarak_solusi_ideal(get_csv())(set_jarak_solusi_ideal);
}

function set_jarak_solusi_ideal(array) {
    var table = get_table();
    var alternatif = array[0];
    var D_value = [array[1], array[2]];

    var tr = document.createElement('tr');
    var th = document.createElement('th');
    th.innerHTML = '';
    tr.appendChild(th);
    for (let i = 0; i < alternatif.length; i++) {
        var th = document.createElement('th');
        th.innerHTML = alternatif[i];
        tr.appendChild(th);
    }
    table.appendChild(tr);

    for (let i = 0; i < 2; i++) {
        var newRow = table.insertRow(table.rows.length);
        var value = newRow.insertCell(0);
        value.innerHTML = (i == 0) ? 'D+' : 'D-';

        for (let j = 0; j < D_value[i].length; j++) {
            var value = newRow.insertCell(j + 1);
            value.innerHTML = D_value[i][j].toFixed(6);
        }
    }
}

function get_nilai_preferensi() {
    eel.nilai_preferensi(get_csv())(set_nilai_preferensi);
}

function set_nilai_preferensi(array) {
    var table = get_table();

    // Looping untuk mengisi setiap baris pada tabel
    for (let i = 0; i < array.length; i++) {
        var newRow = table.insertRow(table.rows.length);

        for (let j = 0; j < array[0].length; j++) {
            var value = newRow.insertCell(j);
            value.innerHTML = array[i][j];
        }
    }
}
