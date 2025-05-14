// Etsi svg-elementti ja määritellään canvasin koko
const svgTemp = d3.select("#chartTemp")
    .attr("width", 900)
    .attr("height", 600);

const margins = {
    top: 20,
    right: 20,
    bottom: 120,
    left: 100
};

const graphHeight = 600 - margins.top - margins.bottom;
const graphWidth = 900 - margins.left - margins.right;

const graphGroup = svgTemp.append("g")
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
    const yScaleTemp = d3.scaleLinear()
        .domain([30, maxTemp])
        .range([graphHeight, 0]);

    const xScaleTemp = d3.scaleBand()
        .domain(dataArray.map(item => item.Timestamp))
        .range([0, graphWidth])
        .paddingInner(0.05);

    rects.enter()
        .append("rect")
        .attr("width", xScaleTemp.bandwidth())
        .attr("height", d => graphHeight - yScaleTemp(parseFloat(d.Temp.replace(",","."))))
        .attr("fill", d => { // 5. Minimi- ja maksimiarvot eri väreillä
            const temp = parseFloat(d.Temp.replace(",", "."));
            if (temp === maxTemp) return "red";
            if (temp === minTemp) return "lightblue";
            return "lightgrey";
        })
        .attr("x", d => xScaleTemp(d.Timestamp))
        .attr("y", d => yScaleTemp(parseFloat(d.Temp.replace(",",".")))); // Tämä rivi kääntää pylväät alkamaan alhaaltapäin

    const xAxisGroup = graphGroup.append("g")
        .attr("transform", `translate(0, ${graphHeight})`);
    const yAxisGroup = graphGroup.append("g");

    const xAxis = d3.axisBottom(xScaleTemp);
    const yAxis = d3.axisLeft(yScaleTemp)
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
    // AirPressure
    const svgAirP = d3.select("#chartAirP")
        .attr("width", 900)
        .attr("height", 600);

    const graphGroupA = svgAirP.append("g")
        .attr("width", graphWidth)
        .attr("height", graphHeight)
        .attr("transform", `translate(${margins.left}, ${margins.top})`);

    const rectsA = graphGroupA.selectAll("rect")
        .data(dataArray);

    const yScaleAirP = d3.scaleLinear()
        .domain([986, maxAirP])
        .range([graphHeight, 0]);

    const xScaleAirP = d3.scaleBand()
        .domain(dataArray.map(item => item.Timestamp))
        .range([0, graphWidth])
        .paddingInner(0.05);

    rectsA.enter()
        .append("rect")
        .attr("width", xScaleAirP.bandwidth())
        .attr("height", d => graphHeight - yScaleAirP(parseFloat(d.AirPressure.replace(",","."))))
        .attr("fill", d => { // 5. Minimi- ja maksimiarvot eri väreillä
            const airP = parseFloat(d.AirPressure.replace(",", "."));
            if (airP === maxAirP) return "orange";
            if (airP === minAirP) return "blue";
            return "lightgrey";
        })
        .attr("x", d => xScaleAirP(d.Timestamp))
        .attr("y", d => yScaleAirP(parseFloat(d.AirPressure.replace(",",".")))); // Tämä rivi kääntää pylväät alkamaan alhaaltapäin

    const xAxisGroupA = graphGroupA.append("g")
        .attr("transform", `translate(0, ${graphHeight})`);
    const yAxisGroupA = graphGroupA.append("g");

    const xAxisA = d3.axisBottom(xScaleAirP);
    const yAxisA = d3.axisLeft(yScaleAirP)
        .ticks(5)
        .tickFormat(d => d + " mmHg");

    xAxisGroupA.call(xAxisA);
    yAxisGroupA.call(yAxisA);

    const xAxisTextA = xAxisGroupA.selectAll("text");

    xAxisTextA.each(function(_,i){
        if(i%5 !== 0) d3.select(this).remove();
    });

    xAxisTextA
    .attr("transform", "rotate(-45)")
    .attr("text-anchor", "end");

    // Humidity
    const svgHum = d3.select("#chartHum")
        .attr("width", 900)
        .attr("height", 600);

    const graphGroupH = svgHum.append("g")
        .attr("width", graphWidth)
        .attr("height", graphHeight)
        .attr("transform", `translate(${margins.left}, ${margins.top})`);

    const rectsH = graphGroupH.selectAll("rect")
        .data(dataArray);

    const yScaleH = d3.scaleLinear()
        .domain([26, maxHumdt])
        .range([graphHeight, 0]);

    const xScaleH = d3.scaleBand()
        .domain(dataArray.map(item => item.Timestamp))
        .range([0, graphWidth])
        .paddingInner(0.05);

    rectsH.enter()
        .append("rect")
        .attr("width", xScaleH.bandwidth())
        .attr("height", d => graphHeight - yScaleH(parseFloat(d.Humidity.replace(",","."))))
        .attr("fill", d => { // 5. Minimi- ja maksimiarvot eri väreillä
            const hum = parseFloat(d.Humidity.replace(",", "."));
            if (hum === maxHumdt) return "purple";
            if (hum === minHumdt) return "green";
            return "lightgrey";
        })
        .attr("x", d => xScaleH(d.Timestamp))
        .attr("y", d => yScaleH(parseFloat(d.Humidity.replace(",",".")))); // Tämä rivi kääntää pylväät alkamaan alhaaltapäin

    const xAxisGroupH = graphGroupH.append("g")
        .attr("transform", `translate(0, ${graphHeight})`);
    const yAxisGroupH = graphGroupH.append("g");

    const xAxisH = d3.axisBottom(xScaleH);
    const yAxisH = d3.axisLeft(yScaleH)
        .ticks(5)
        .tickFormat(d => d + " %");

    xAxisGroupH.call(xAxisH);
    yAxisGroupH.call(yAxisH);

    const xAxisTextH = xAxisGroupH.selectAll("text");

    xAxisTextH.each(function(_,i){
        if(i%5 !== 0) d3.select(this).remove();
    });

    xAxisTextH
    .attr("transform", "rotate(-45)")
    .attr("text-anchor", "end");

})


