// Etsi svg-elementti ja määritellään canvasin koko
const svg = d3.select("svg")
    .attr("width", 900)
    .attr("height", 600);

const margins = {
    top: 20,
    right: 20,
    bottom: 100,
    left: 100
};

const graphHeight = 600 - margins.top - margins.bottom;
const graphWidth = 900 - margins.left - margins.right;

const graphGroup = svg.append("g")
    .attr("width", graphWidth)
    .attr("height", graphHeight)
    .attr("transform", `translate(${margins.left}, ${margins.top})`);

// 1. Luetaan json-tiedosto ja muokataan array
d3.json("data/measures_100.json").then(data => {
    const dataArray = [];
    for (const i in data) {
        object = data[i].Measures;
        dataArray.push(object);
    }
    console.log(dataArray);
    const rects = graphGroup.selectAll("rect")
        .data(dataArray);

// 2. Max ja Min -arvot
    const minAirP = d3.min(dataArray, d => parseFloat(d.AirPressure.replace(",",".")));
    const maxAirP = d3.max(dataArray, d => parseFloat(d.AirPressure.replace(",",".")));

    console.log(minAirP + " mmHg");
    console.log(maxAirP + " mmHg");

    const minTemp = d3.min(dataArray, d => parseFloat(d.Temp.replace(",",".")));
    const maxTemp = d3.max(dataArray, d => parseFloat(d.Temp.replace(",",".")));

    console.log(minTemp + " °C");
    console.log(maxTemp + " °C");

    const minHumdt = d3.min(dataArray, d => parseFloat(d.Humidity.replace(",",".")));
    const maxHumdt = d3.max(dataArray, d => parseFloat(d.Humidity.replace(",",".")));

    console.log(minHumdt + " %");
    console.log(maxHumdt + " %");


// 3. Piirrä kaavio Temperature
    const yScale = d3.scaleLinear()
        .domain([30, maxTemp])
        .range([graphHeight, 0]);

    const xScale = d3.scaleBand()
        .domain(dataArray.map(item => item.Timestamp))
        .range([0, graphWidth])
        .paddingInner(0.05);

    rects
        .attr("width", xScale.bandwidth())
        .attr("height", d => graphHeight - yScale(parseFloat(d.Temp.replace(",","."))))
        .attr("fill", "lightgrey")
        .attr("x", d => xScale(d.Timestamp));

    rects.enter()
        .append("rect")
        .attr("width", xScale.bandwidth())
        .attr("height", d => graphHeight - yScale(parseFloat(d.Temp.replace(",","."))))
        .attr("fill", "lightgrey")
        .attr("x", d => xScale(d.Timestamp))
        .attr("y", d => yScale(parseFloat(d.Temp.replace(",",".")))); // Tämä rivi kääntää pylväät alkamaan alhaaltapäin

        const xAxisGroup = graphGroup.append("g")
            .attr("transform", `translate(0, ${graphHeight})`);
        const yAxisGroup = graphGroup.append("g");

        const xAxis = d3.axisBottom(xScale);
        const yAxis = d3.axisLeft(yScale)
            .ticks(5)
            .tickFormat(d => d + " °C");

        xAxisGroup.call(xAxis);
        yAxisGroup.call(yAxis);

        const xAxisText = xAxisGroup.selectAll("text");

        xAxisText.each(function(_,i){
            if(i%5 !== 0) d3.select(this).remove();
        });

        xAxisText
        .attr("transform", "rotate(-45)")
        .attr("text-anchor", "end");

//4. Piirretään Humidity ja AirPressure


//5. Max ja Min pylväiden korostus eri väreillä
       

        

})


