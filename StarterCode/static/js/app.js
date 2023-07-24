const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// load the data
d3.json(url).then(function(data) {
    console.log(data)
});

function init() {
    // set dropdown menu
    let ddMenu = d3.select("#selDataset");

    // gather data
    d3.json(url).then(function(data) {
        // set names variable
        let names = data.names;

        // load dropdownmenu
        for (let i = 0; i < names.length; i++)
        {
            mi = names[i];
            console.log(mi)
            ddMenu.append("option").text(mi).property("value", mi);
        }

        // set the first sample data
        letfirstSample = names[0]

        console.log(firstSample)

        createMetadata(firstSample);
        createBarChart(firstSample);
        createBubbleChart(firstSample);
     });
}

function createMetadataold(sourceData) {
    d3.json(url).then((data) => {

        // load data
        let md = data.metadata;

        let val = md.metadata.filter(result => result.id == sourceData);

        console.log(val);

        let valData = val[0];

        d3.select("#sample-metadata").html("");

        Object.entries(valData).forEach(([key, value]) => {
            console.log(key, value);

            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        });
    });
}

function createMetadata(sourceData) {
    d3.json(url).then((data) => {

        // load data
        let md = data.metadata;

        let val = md.filter(result => result.id == sourceData);

        console.log(val)

        let valData = val[0];

        d3.select("#sample-metadata").html("");

        Object.entries(valData).forEach(([key, value]) => {
            console.log(key,value);

            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        });
    });
}

function createBarChart(sourceData) {
    d3.json(url).then((data) => {

        // load data
        let sd = data.samples;

        let value = sd.filter(x => x.id == sourceData);

        let valData = value[0];

        let otuids = valData.otu_ids;
        let otulabels = valData.otu_labels;
        let samplevals = valData.samples_values;

        console.log(otuids,otulabels,samplevals);

        let yticks = otuids.slice(0,10).map(id => `OTU ${id}`).reverse();
        let xticks = samplevals.slice(0,10).reverse();
        let labels = otulabels.slice(0,10).reverse();

        let trace = {
            x: xticks,
            y: yticks,
            text: labels,
            type: "bar",
            orientation: "h"
        };

        let display = {
            title: "Top 10 OTUs Present"
        };

        Plotly.newPlot("bar", [trace], display)
    });
}

function createBubbleChart(sourceData) {
    d3.json(url).then((data) => {

        // load data
        let sd = data.samples;

        let value = sd.filter(x => x.id == sourceData);

        let valData = value[0];

        let otuids = valData.otu_ids;
        let otulabels = valData.otu_labels;
        let samplevals = valData.samples_values;

        console.log(otuids,otulabels,samplevals);

        let trace = {
            x: otuids,
            y: samplevals,
            text: otulabels,
            mode: "markers",
            marker: {
                size: samplevals,
                color: otuids,
                colorscale: "Earth"
            }
         };

        let display = {
            title: "Bacteria Per Sample",
            hovermode: "closest",
            xaxis: {title: "OTU ID"},
        };

        Plotly.newPlot("bubble", [trace], display)

    });
}

function optionChanged(value) {
    // log new value
    console.log(value);

    createMetadata(value);
    createBarChart(value);
    createBubbleChart(value);
};

init();