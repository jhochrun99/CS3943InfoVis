function vis2(purposeDonorRecip, top10Recip, top20Donors, div) {
  const margin = {top: 40, right: 40, bottom: 40, left: 100};
  const visWidth = 850 - margin.left - margin.right;
  const visHeight = 800 - margin.top - margin.bottom;

  const svg = div.append('svg')
      .attr('width', visWidth + margin.left + margin.right)
      .attr('height', visHeight + margin.top + margin.bottom);

  const g = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // add title

  g.append('text')
    .attr('x', visWidth / 2)
    .attr('y', -margin.top + 1)
    .attr('font-family', 'sans-serif')
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'hanging')
    .text('Donation Purposes by Donor and Recipient');

  // values needed later

  const top5Purposes = ["air transport", "rail transport", "industrial development", "rescheduling and refinancing", "power generation/non-renewable sources"];
  const donorRecipPurpose = Array.from(d3.group(purposeDonorRecip, d => d.donor, d => d.recipient), 
        ([ donor, recipients ]) => ({ donor: donor, recipients: Array.from(recipients, 
        ([recipient, purposes]) => ({ recipient, purposes }) )}));

  // create scales

  const x = d3.scalePoint()
      .domain(top10Recip.map(d => d.country))
      .range([0, visWidth])
      .padding(0.25);
  
  const y = d3.scalePoint()
      .domain(top20Donors.map(d => d.country))
      .range([0, visHeight])
      .padding(0.5);

  const outerRadius = x.step() / 4.5;

  // create and add axes

  const xAxis = d3.axisTop(x);

  g.append('g')
    .attr('transform', `translate(0,${(visHeight - 750) + outerRadius + 6})`)
    .call(xAxis)
    .call(g => g.selectAll('.domain').remove());

  const yAxis = d3.axisLeft(y);
  
  g.append("g")
      .call(yAxis)
      .call(g => g.selectAll(".domain").remove())
    .append("text")
      .attr("x", -65)
      .attr("y", visHeight / 2)
      .attr("fill", "black")
      .attr("dominant-baseline", "middle")
      .text("Donor");

  // draw in connecting lines
  
  const grid = g.append("g")
      .attr("class", "grid");
  
  grid.append("g") // 19 lines
    .selectAll("line")
    .data(y.domain())
    .join("line")
      .attr("stroke", "#BDBDBD")
      .attr("x1", 0)
      .attr("x2", visWidth)
      .attr("y1", d => 0.5 + y(d))
      .attr("y2", d => 0.5 + y(d));
  
  grid.append("g") // 9 lines
    .selectAll("line")
    .data(x.domain())
    .join("line")
      .attr("stroke", "#BDBDBD")
      .attr("x1", d => 0.5 + x(d))
      .attr("x2", d => 0.5 + x(d))
      .attr("y1", d => 0)
      .attr("y2", d => visHeight);

  // create the pie and area generators

  const color = d3.scaleOrdinal()
    .domain(top5Purposes)
    .range(d3.schemeTableau10);
  
  const pie = d3.pie()
      .value(d => d.net);

  const arc = d3.arc()
      .innerRadius(0)
      .outerRadius(outerRadius);

  const rows = g.selectAll('.rows')
    .data(donorRecipPurpose)
    .join('g')
      .attr('class', 'rows')
      .attr('transform', d => `translate(${0},${y(d.donor)})`);
    
  const pieGroups = rows.selectAll('.pieGroup')
    .data(d => d.recipients)
    .join('g')
      .attr('class', 'pieGroup')
      .attr('transform', d => `translate(${x(d.recipient)},${0})`)
  
  pieGroups.selectAll('path')
    .data(d => pie(d.purposes))
    .join('path')
      .attr('d', d => arc(d))
      .attr('fill', d => color(d.data.purpose));

  // add grid
}