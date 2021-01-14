// Read the JSON file and build plots
function fetchdata(id) {
// Read JSON and define base variables
    d3.json("samples.json").then(jsondata => {
        console.log(jsondata)
        var ids = jsondata.samples[0].otu_ids;
        console.log(ids)
        var bbvalues = jsondata.samples[0].otu_ids.slice(0,10).reverse();
        console.log(bbvalues)
        var bblabels = jsondata.samples[0].otu_labels.slice(0,10);
        console.log(bblabels)
// Isolate Top 10 otu IDs
        var topotu = jsondata.samples[0].otu_ids.slice(0,10).reverse();
        var topid = topotu.map(d => "OTU " + d);
        console.log(`OTU ID: ${topid}`)
        console.log(`OTU Labels: ${bblabels}`)
// Set up Bar Trace and Layout
        var bartrace = {
            x: bbvalues,
            y: topid,
            text: bblabels,
            marker: {color: 'green'},
            type: 'bar',
            orientation: "h",
        };
        var barlayout = {
            title: "OTU Top 10",
            yaxis: {tickmode: "linear"},
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 50
            }
        };
// Put Trace in Variable and plot
        var bardata = [bartrace];
        Plotly.newPlot("bar", bardata, barlayout);

// Set up Bubble Trace and Layout
        var bubtrace = {
            x: jsondata.samples[0].otu_ids,
            y: jsondata.samples[0].sample_values,
            mode: "markers",
            marker: {
                size: jsondata.samples[0].sample_values,
                color: jsondata.samples[0].otu_ids
            },
            text: jsondata.samples[0].otu_labels
        };
        var bublayout = {
            xaxis: {title: "OTU ID"},
            height: 600,
            width: 1000
        };
// Put Trace in Variable and plot
        var bubdata = [bubtrace];
        Plotly.newPlot("bubble", bubdata, bublayout);
    });
}

// Data Fetch
function fetchdemogdata(id) {
    d3.json("samples.json").then((jsondata) => {
// Get metadata and filter it
        var metadata = jsondata.metadata;
        console.log(metadata)
        var filtered = metadata.filter(meta => meta.id.toString() === id)[0];
        var demogdata = d3.select("#sample-metadata");
// Clear Panel for New Info
        demogdata.html("");
        // Fetch necessary data and append
        Object.entries(filtered).forEach((key) => {
            demogdata.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");
        });
    });
}

// Create Change Event
function eventchange(id) {
    fetchdata(id);
    fetchdemogdata;
}

// Data Render Function
function render() {
    var dropdown = d3.select("#selDataSet");
// Select and Read Data 
    d3.json("samples.json").then((data) => {
        console.log(data)
        data.names.forEach(function(name) {
            dropdown.append("option").text(name);
        });
// Render Plots
    fetchdata(data.names[0]);
    fetchdemogdata(data.names[0]);
    });
}

render();