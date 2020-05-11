function vis1(donorToRecip, top10Recip, top20Donors, div) {
  const margin = {top: 30, right: 100, bottom: 50, left: 120};
  const visWidth = 800 - margin.left - margin.right;
  const visHeight = 550 - margin.top - margin.bottom;

  const svg = div.append('svg')
    .attr('width', visWidth + margin.left + margin.right)
    .attr('height', visHeight + margin.top + margin.bottom);

  const g = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // values needed later

  const maxRadius = 10;
  const amountExtent = d3.extent(donorToRecip, d => d.net);
  const donorToRecipWithNet = Array.from(d3.group(donorToRecip, d => d.donor), 
          ([donor, recips]) => ({ donor: donor, recips }));

  // add title

  g.append("text")
    .attr("x", visWidth / 2)
    .attr("y", -margin.top + 2)
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "hanging")
    .attr("font-family", "sans-serif")
    .attr("font-size", "16px")
    .text("Number of Requests by Donor and Recipient");

  // create scales
  
  const x = d3.scalePoint()
      .domain(top10Recip.map(d => d.country))
      .range([0, visWidth])
      .padding(0.5);
  
  const y = d3.scalePoint()
      .domain(top20Donors.map(d => d.country))
      .range([0, visHeight])
      .padding(0.5);

  const radius = d3.scaleSqrt()
      .domain([0, d3.max(donorToRecipWithNet, d => d3.max(d.recips, b => b.net))])
      .range([0, maxRadius]);

  // add legend

  const amountExtentLegend = [amountExtent[1], Math.round((amountExtent[1] - amountExtent[0]) / 3), 
          Math.round((amountExtent[1] - amountExtent[0]) / 9), Math.round((amountExtent[1] - amountExtent[0]) / 25)];

  const legend = g.append("g")
      .attr("transform", `translate(${visWidth + margin.right - 90}, 0)`)
    .selectAll("g")
    .data(amountExtentLegend, d => d3.format("~s")(d))
    .join("g")
      .attr("transform", (d, i) => `translate(0, ${i * 2.5 * maxRadius})`);
      
  legend.append("circle")
      .attr("r", d => radius(d))
      .attr("fill", "steelblue");
    
  legend.append("text")
      .attr("font-family", "sans-serif")
      .attr("font-size", 12)
      .attr("dominant-baseline", "middle")
      .attr("x", maxRadius + 5)
      .text(d => d);

  // create and add axes

  const xAxis = d3.axisBottom(x);
  
  g.append("g")
      .attr("transform", `translate(0, ${visHeight})`)
      .call(xAxis)
      .call(g => g.selectAll(".domain").remove())
    .append("text")
      .attr("x", visWidth / 2)
      .attr("y", 40)
      .attr("fill", "black")
      .attr("text-anchor", "middle")
      .text("Recipients");

  const yAxis = d3.axisLeft(y);
  
  g.append("g")
      .call(yAxis)
      .call(g => g.selectAll(".domain").remove())
    .append("text")
        .attr("x", -65)
        .attr("y", visHeight / 2)
        .attr("fill", "black")
        .attr("dominant-baseline", "middle")
        .text("Donors");

  // draw points

  const rows = g.selectAll(".row")
    .data(donorToRecipWithNet)
    .join("g")
      .attr("transform", d => `translate(0, ${y(d.donor)})`);
  
  rows.selectAll("circle")
    .data(d => d.recips)
    .join("circle")
      .attr("cx", d => x(d.recipient))
      .attr("cy", d => 0)
      .attr("fill", "steelblue")
      .attr("r", d => radius(d.net));
}