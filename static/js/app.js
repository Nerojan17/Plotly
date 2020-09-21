

d3.json("data/samples.json").then(function (data){

    data.metadata.forEach(d => {
        
        d3.select("#selDataset").append("option").attr("value", d.id).text(d.id);
        
    });

})




 function optionChanged(id) {

    d3.json("data/samples.json").then(function (data){

        demInfo = data.metadata.find(d => d.id == id);
        
        d3.select("#sample-metadata").html("");

        Object.entries(demInfo).forEach(([key, values]) => {
            d3.select("#sample-metadata").append("p").text(`${key}: ${values}`)

        });
        
        var barChartData = data.samples.find(d => d.id == id);
        plotCharts(barChartData);
        

    })}
    





function plotCharts(barChartData) {
    

    var data1 = [{
        type: 'bar',
        x: barChartData.sample_values.slice(0, 10).reverse(),
        y: barChartData.otu_ids.slice(0, 10).reverse().map(d => `OTU ${d}`),
        orientation: 'h',
        text:barChartData.otu_labels.slice(0, 10).reverse()
      }];

      var layout1 = {
        title: `Top 10 OTU for Subject ${barChartData.id}`,
        yaxis: { title: "OTU ID" },
        xaxis: { title: "Sample Values" }
      };
      
    
      Plotly.newPlot('bar', data1, layout1);
    
      var trace2 = {
        x: barChartData.otu_ids,
        y: barChartData.sample_values,
        text: barChartData.otu_labels,
        mode: 'markers',
        marker: {
          color: barChartData.otu_ids,
          size: barChartData.sample_values,
        //   sizeref: 2 * Math.max(barChartData.sample_values)/(barChartData.sample_values),
        //   sizemode: 'area'
        }
      };
      
      var data2 = [trace2];
      
      var layout2 = {
        title: `OTU ID vs Sample Values for Subject ${barChartData.id}`,
        xaxis: { title: "OTU ID" },
        showlegend: false,
      };
      
      Plotly.newPlot('bubble', data2, layout2);




}

optionChanged(940)