let restaurantsData;
let worldGeoJSON;

d3.csv("../dataset/processed_data.csv").then(data => {
    restaurantsData = data;
    return d3.json("../dataset/countries-geojson.geojson");
}).then(json => {
    worldGeoJSON = json;
    drawGeographicalDistribution();
    drawHeatmap();
    drawComparisonMap();
    drawCuisinePopularityMap();
});

function drawGeographicalDistribution() {

    const width = 960;
    const height = 600;

    const svg = d3.select("#map")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    svg.append("text")
        .attr("x", width / 2)
        .attr("y", 20)
        .attr("text-anchor", "middle")
        .style("font-size", "20px")
        .style("font-weight", "bold")
        .text("Geographical Distribution of Michelin-Starred Restaurants");

    const projection = d3.geoMercator()
        .scale(150)
        .center([0, 30])
        .translate([width / 2, height / 1.5]);

    const path = d3.geoPath().projection(projection);

    svg.selectAll("path")
        .data(worldGeoJSON.features)
        .enter().append("path")
        .attr("d", path)
        .attr("fill", "#eee")
        .attr("stroke", "#999");

    svg.selectAll("circle")
        .data(restaurantsData)
        .enter().append("circle")
        .attr("cx", d => projection([d.longitude, d.latitude])[0])
        .attr("cy", d => projection([d.longitude, d.latitude])[1])
        .attr("r", d => d["Michelin stars"] * 5)  // Radius size based on Michelin stars
        .attr("fill", "blue")
        .attr("opacity", 0.6);

    const tooltip = d3.select("#map")
        .append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    svg.selectAll("circle")
        // ... (rest of the circle attributes)
        .on("mouseover", function (event, d) {
            tooltip.transition()
                .duration(200)
                .style("opacity", .9);
            tooltip.html(d["name"] + "<br/>Stars: " + d["Michelin stars"])
                .style("left", (event.pageX + 5) + "px")
                .style("top", (event.pageY - 28) + "px");
        })
        .on("mouseout", function (d) {
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        });

}

function drawHeatmap() {
    const width = 960;
    const height = 600;

    const svg = d3.select("#heatmap")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    console.log("SVG appended for heatmap");

    svg.append("text")
        .attr("x", width / 2)
        .attr("y", 20)
        .attr("text-anchor", "middle")
        .style("font-size", "20px")
        .style("font-weight", "bold")
        .text("Heatmap of Michelin-Starred Restaurants");

    const projection = d3.geoMercator()
        .scale(150)
        .center([0, 30])
        .translate([width / 2, height / 1.5]);

    const path = d3.geoPath().projection(projection);

    svg.selectAll("path")
        .data(worldGeoJSON.features)
        .enter().append("path")
        .attr("d", path)
        .attr("fill", "#eee")
        .attr("stroke", "#999");

    // Determine max weight for normalization
    const maxWeight = d3.max(restaurantsData, d => +d["Michelin stars"]);

    svg.selectAll("circle")
        .data(restaurantsData)
        .enter().append("circle")
        .attr("cx", d => projection([d.longitude, d.latitude])[0])
        .attr("cy", d => projection([d.longitude, d.latitude])[1])
        .attr("r", 5)  // Basic radius, adjust as needed
        .attr("fill", "green")
        .attr("opacity", d => +d["Michelin stars"] / maxWeight);  // Opacity based on Michelin stars

}


function drawComparisonMap() {
    const width = 960;
    const height = 600;

    const svg = d3.select("#comparison")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    svg.append("text")
        .attr("x", width / 2)
        .attr("y", 20)
        .attr("text-anchor", "middle")
        .style("font-size", "20px")
        .style("font-weight", "bold")
        .text("Comparison of Restaurants by Michelin Stars");

    const projection = d3.geoMercator()
        .scale(150)
        .center([0, 30])
        .translate([width / 2, height / 1.5]);

    const path = d3.geoPath().projection(projection);

    svg.selectAll("path")
        .data(worldGeoJSON.features)
        .enter().append("path")
        .attr("d", path)
        .attr("fill", "#eee")
        .attr("stroke", "#999");

    const starColors = {
        "1": "red",
        "2": "green",
        "3": "blue"
    };

    svg.selectAll("circle")
        .data(restaurantsData)
        .enter().append("circle")
        .attr("cx", d => projection([d.longitude, d.latitude])[0])
        .attr("cy", d => projection([d.longitude, d.latitude])[1])
        .attr("r", 5)
        .attr("fill", d => starColors[d["Michelin stars"]])
        .attr("opacity", 0.6);

    const legend = svg.append("g")
        .attr("transform", `translate(${width - 120}, 30)`);

    ["1", "2", "3"].forEach((star, i) => {
        legend.append("circle")
            .attr("cx", 0)
            .attr("cy", i * 30)
            .attr("r", 5)
            .attr("fill", starColors[star]);

        legend.append("text")
            .attr("x", 20)
            .attr("y", i * 30)
            .attr("dy", "0.35em")
            .text(`${star} Star`)
    });


}


function drawCuisinePopularityMap() {
    const width = 960;
    const height = 600;

    const svg = d3.select("#cuisine")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    svg.append("text")
        .attr("x", width / 2)
        .attr("y", 20)
        .attr("text-anchor", "middle")
        .style("font-size", "20px")
        .style("font-weight", "bold")
        .text("Cuisine Popularity in Michelin-Starred Restaurants");

    const projection = d3.geoMercator()
        .scale(150)
        .center([0, 30])
        .translate([width / 2, height / 1.5]);

    const path = d3.geoPath().projection(projection);

    svg.selectAll("path")
        .data(worldGeoJSON.features)
        .enter().append("path")
        .attr("d", path)
        .attr("fill", "#eee")
        .attr("stroke", "#999");

    const cuisineByCity = Array.from(d3.group(restaurantsData, d => d.city), ([key, values]) => {
        const cuisineCount = Array.from(d3.group(values, d => d.cuisine), ([cuisine, instances]) => ({ cuisine, count: instances.length }));
        cuisineCount.sort((a, b) => b.count - a.count);

        const cityLongitude = parseFloat(values[0].longitude);
        const cityLatitude = parseFloat(values[0].latitude);

        return { key: key, value: cuisineCount[0].cuisine, longitude: cityLongitude, latitude: cityLatitude };
    });


    cuisineByCity.forEach(city => {
        if (!city.longitude || !city.latitude) {
            console.log("Invalid coordinates for city:", city);
        }
    });


    const validCities = cuisineByCity.filter(city => !isNaN(city.longitude) && !isNaN(city.latitude));

    console.log("Number of valid cities:", validCities.length);


    const cuisines = Array.from(new Set(restaurantsData.map(d => d.cuisine)));
    const colorScale = d3.scaleOrdinal()
        .domain(cuisines)
        .range(d3.schemeTableau10);


    svg.selectAll("circle")
        .data(validCities)
        .enter().append("circle")
        .attr("cx", d => projection([d.longitude, d.latitude])[0])
        .attr("cy", d => projection([d.longitude, d.latitude])[1])
        .attr("r", 5)
        .attr("fill", d => {
            const color = colorScale(d.value);
            console.log("Cuisine:", d.value, "Color:", color);
            return color;
        })
        .attr("opacity", 0.6);


    const legend = svg.append("g")
        .attr("transform", `translate(${width - 120}, 30)`);

    cuisines.forEach((cuisine, i) => {
        legend.append("circle")
            .attr("cx", 0)
            .attr("cy", i * 30)
            .attr("r", 5)
            .attr("fill", colorScale(cuisine));

        legend.append("text")
            .attr("x", 20)
            .attr("y", i * 30)
            .attr("dy", "0.35em")
            .text(cuisine);
    });


}
