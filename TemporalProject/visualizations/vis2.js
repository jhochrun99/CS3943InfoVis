function vis2(purposeNet, div) {
  const margin = {top: 10, right: 30, bottom: 20, left: 40};
  const visWidth = width - margin.left - margin.right;
  const visHeight = 500 - margin.top - margin.bottom;

  const svg = div.append('svg')
      .attr('width', visWidth + margin.left + margin.right)
      .attr('height', visHeight + margin.top + margin.bottom);

  const g = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

  // values needed later

  const top10 = Array.from(new Set(purposeNet.map(d => d.purpose)));
  const netPurposeExtent = d3.extent(purposeNet, d => d.net);
  const yearSpan = d3.extent(purposeNet, d => d.year);

  // create scales

  const x = d3.scaleLinear()
      .domain(yearSpan)
      .range([0, visWidth]);
  
  const y = d3.scaleLinear()
      .domain(netPurposeExtent).nice()
      .range([visHeight, 0]);

  // create and add axes

  const xAxis = d3.axisBottom(x).tickFormat(d3.format("d"));
  
  const yAxis = d3.axisLeft(y).tickFormat(d3.format("~s"));
  
  g.append('g')
      .attr('transform', `translate(0,${visHeight})`)
      .call(xAxis);
  
  g.append('g')
      .call(yAxis)
      .call(g => g.selectAll('.domain').remove())
    .append('text')
      .attr('text-anchor', 'start')
      .attr('dominant-baseline', 'middle')
      .attr('fill', 'black')
      .attr('x', 5)
      .text('Net Donation Amount $');

  // add lines

  const color = d3.scaleOrdinal()
    .domain(top10)
    .range(d3.schemeTableau10);

    const line = d3.line()
    .x(d => x(d.year))
    .y(d => y(d.net));

g.selectAll('.series')
    .data(top10)
    .join('g')
      .attr('stroke', d => color(d))
      .attr('class', 'series')
    .append('path')
      .datum(purposeNet)
      .attr('fill', 'none')
      .attr('stroke-width', 2)
      .attr('d', line);

  // legend

  const size = 10;
  const xLoc = width - margin.left - 275;
  g.selectAll("squares")
    .data(top10)
    .enter()
    .append("rect")
      .attr("x", xLoc)
      .attr("y", function(d,i){ return i*(size+6) })
      .attr("width", size)
      .attr("height", size)
      .style("fill", function(d){ return color(d) });

  g.selectAll("labels")
    .data(top10)
    .enter()
    .append("text")
      .attr("x", xLoc + size*1.2)
      .attr("y", function(d,i){ return i*(size+6) + (size/2) })
      .text(function(d){ return d })
      .attr("text-anchor", "left")
      .attr("font-size", "14px")
      .attr("font-family", "sans-serif")
      .style("alignment-baseline", "middle")
      .style("fill", "black");

  // title

  g.append("text")
    .attr("x", visWidth / 2)
    .attr("y", -margin.top + 5)
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "hanging")
    .attr("font-family", "sans-serif")
    .attr("font-size", "16px")
    .text("Top 10 Donation Purposes");
}
