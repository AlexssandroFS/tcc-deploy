google.charts.load("current", { packages: ['corechart'] });

google.charts.setOnLoadCallback(drawChart);

function drawChart() {

    //Aquí se representa el nombre de columna, el dato y el color
    var data = google.visualization.arrayToDataTable([
        ["Element", "semana", { role: "style" }],
        ["domingo", 600, "green", ],
        ["segunda", 300, "red"],
        ["terca", 400, "gold"],
        ["quarta", 400, "blue"],
        ["quinta", 300, "Lime"],
        ["sexta", 300, "orange"],
        ["sabado", 900, "DarkViolet"],
    ]);

    var view = new google.visualization.DataView(data);
    view.setColumns(
        [0, 1, {
            calc: "stringify",
            sourceColumn: 1,
            type: "string",
            role: "annotation"
        }, 2]);

    //Aquí se define e titulo e tamanho do gráfico
    var options = {
        title: "Valores em Reais",
        width: 600,
        height: 400,
        bar: { groupWidth: "95%" },
        legend: { position: "none" },
    };

    var chart = new google.visualization.ColumnChart(document.getElementById("columnchart_values"));
    chart.draw(view, options);
}

function getValueAt(column, dataTable, row) {
    return dataTable.getFormattedValue(row, column);
}