function read_csv() {
    var csv = document.getElementById('csv').files.item(0).name;
    eel.read_csv(csv)(function (ret) { console.log(ret) });
}