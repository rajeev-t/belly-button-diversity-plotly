function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    console.log(data)
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);

}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });
  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
    var samplesData = data.samples;
   
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var filteredData = samplesData.filter(sampleObj => sampleObj.id == sample);

    //  5. Create a variable that holds the first sample in the array.
    var sampleOne = filteredData[0];

    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otu_ids = sampleOne.otu_ids;
    var otu_labels = sampleOne.otu_labels;
    var sample_values = sampleOne.sample_values;


    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 

    var yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();

    // 8. Create the trace for the bar chart. 
    var barTrace = [
      {
        y: yticks,
        x: sample_values.slice(0, 10).reverse(),
        text: otu_labels.slice(0, 10).reverse(),
        type: "bar",
        orientation: "h",
      }
    ];

    // 9. Create the layout for the bar chart. 
    var barLayout = {
      title: "Top 10 Bacteria Cultures Found",
      margin: { t: 70, l: 120 },
      font: {
        color: 'black'
        },
      plot_bgcolor: 'whitesmoke',
      paper_bgcolor: 'ivory',
    };

    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", barTrace, barLayout);

    // 1. Create the trace for the bubble chart.
    var bubbleTrace = [
      {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: "markers",
        marker: {
          size: sample_values,
          color: otu_ids,
        }
      }
    ];

    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title: "Bacteria Cultures / Sample",
      margin: { t: 3 },
      hovermode: "closest",
      xaxis: { title: "OTU ID" },
      margin: { t: 70 },
      font: {
        color: 'black'
        },
      plot_bgcolor: 'whitesmoke',
      paper_bgcolor: 'ivory',
      xaxis: {
        linecolor: 'steelblue',
        linewidth: 5,
        mirror: true
      },
      yaxis: {
        linecolor: 'steelblue',
        linewidth: 5,
        mirror: true
      },
    };


    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot("bubble", bubbleTrace, bubbleLayout);

    // 1. Create the gauge chart.
    var metadataArray = data.metadata.filter(sampleObj => sampleObj.id == sample);
    var metadata = metadataArray[0];
    var frequency = parseFloat(metadata.wfreq);

    var gaugeTrace = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: frequency,
        title: { text: "<b>Belly Button Washing Frequency</b> <br> Scrubs per Week" },
        type: "indicator",
        mode: "gauge+number",
        gauge: {
          axis: { range: [null, 10] },
          bar: { color: "black" },
          steps: [
            { range: [0, 2], color: "red" },
            { range: [2, 4], color: "orange" },
            { range: [4, 6], color: "yellow" },
            { range: [6, 8], color: "yellowgreen" },
            { range: [8, 10], color: "green" }
          ],
        }
      }
    ];

    var gaugeLayout = {
      width: 500,
      height: 425,
      margin: { t: 40, b: 0 },
      font: {
        color: 'black'
        },
      plot_bgcolor: 'whitesmoke',
      paper_bgcolor: 'ivory'
    };


    Plotly.newPlot("gauge", gaugeTrace, gaugeLayout);

  });
}