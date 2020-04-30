function vis1(countryNet, div) {
  const margin = {top: 20, right: 10, bottom: 20, left: 105};
  const visWidth = width - margin.left - margin.right;
  const visHeight = 600 - margin.top - margin.bottom;

  const svg = div.append('svg')
      .attr('width', visWidth + margin.left + margin.right)
      .attr('height', visHeight + margin.top + margin.bottom);

  const g = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // values needed later

  const yearList = (Array.from(new Set(countryNet.map(d => d.year)))).sort();
  const countryList = Array.from(new Set(countryNet.map(d => d.country)));
  const netCountryMax = d3.max(countryNet, d => d.net)

  // add title

  g.append("text")
    .attr("x", visWidth / 2)
    .attr("y", -margin.top + 20)
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "hanging")
    .attr("font-family", "sans-serif")
    .attr("font-size", "16px")
    .text("Net Donation Values by Country");

  // create scales
  
  const x = d3.scaleBand()
      .domain(yearList)
      .range([0, visWidth]);
     //.padding(0.1);

  const y = d3.scaleBand()
      .domain(countryList) //countries go here
      .range([0, visHeight])
      .padding(0.2)

  // create and add axes

  const xAxis = d3.axisTop(x).tickFormat(d3.format("d"))
      .tickValues(x.domain().filter(function(d,i){ return !(i%5) }));

  g.append('g').call(xAxis)
      .selectAll("text")
      .attr("y", -10)
      .attr("x", 0);

  const yAxis = d3.axisLeft(y)
      .tickPadding(5)
      .tickSize(5);

  g.append("g")
    .call(yAxis)
    .call(g => g.selectAll(".domain").remove());

  // draw bars

  const color = d3.scaleDiverging()
      .domain([-netCountryMax, 0, netCountryMax])
      .interpolator(d3.interpolateRdYlBu);

  g.selectAll('rect')
    .data(countryNet)
    .join('rect')
      .attr('x', d => x(d.year))
      .attr('y', d => y(d.country))
      .attr('width', x.bandwidth())
      .attr('height', y.bandwidth())
      .attr('fill', d => color(d.net));
}