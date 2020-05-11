function visLegend2(div) {
    const margin = {top: 30, right: 30, bottom: 20, left: 40};
    const visWidth = 500 - margin.left - margin.right;
    const visHeight = 125 - margin.top - margin.bottom;
  
    const svg = div.append('svg')
        .attr('width', visWidth + margin.left + margin.right)
        .attr('height', visHeight + margin.top + margin.bottom);
  
    const g = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    g.append("text")
        .attr("x", 120)
        .attr("y", -margin.top + 5)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "hanging")
        .attr("font-family", "sans-serif")
        .attr("font-size", "18px")
        .text("Top 5 Purposes Color Key");

    // values needed later
    
    const top5Purposes =  ["air transport", "rail transport", "industrial development", "rescheduling and refinancing", "power generation/non-renewable sources"];

    const color = d3.scaleOrdinal()
      .domain(top5Purposes)
      .range(d3.schemeTableau10);
  
    // legend
  
    const size = 10;
    const xLoc = 25;
    g.selectAll("squares")
      .data(top5Purposes)
      .enter()
      .append("rect")
        .attr("x", xLoc)
        .attr("y", function(d,i){ return i*(size+6) })
        .attr("width", size)
        .attr("height", size)
        .style("fill", function(d){ return color(d) });
  
    g.selectAll("labels")
      .data(top5Purposes)
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
  }
  