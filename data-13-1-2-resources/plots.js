var trace = [
    {
        x: ["nonalcoholic beer", "nonalcoholic wine", "nonalcoholic martini", "nonalcoholic margarita", "ice tea", "nonalcoholic rum & coke", "nonalcoholic mai tai", "nonalcoholic gin & tonic"],
        y: [22.7, 17.1, 9.9, 8.7, 7.2, 6.1, 6.0, 4.6],
        type: "bar"
    }
];

var layout = {
    title: "Alc by %",
    xaxis: { title: "Drinks" },
    yaxis: { title: "%" }
};

Plotly.newPlot("plotArea", trace, layout)

var trace2 = {
    labels: ["nonalcoholic beer", "nonalcoholic wine", "nonalcoholic martini", "nonalcoholic margarita",
        "ice tea", "nonalcoholic rum & coke", "nonalcoholic mai tai", "nonalcoholic gin & tonic"],
    values: [22.7, 17.1, 9.9, 8.7, 7.2, 6.1, 6.0, 4.6],
    type: 'pie'
};
var data2 = [trace2];
var layout2 = {
    title: "'Pie' Chart",
};
Plotly.newPlot("plotArea2", data2, layout2);