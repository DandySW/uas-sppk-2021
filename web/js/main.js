function csv_process() {
    var csv = document.getElementById('csv').files.item(0).name;
    eel.csv_process(csv);
}