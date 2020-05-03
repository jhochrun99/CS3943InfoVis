function vis3(purposeNet, div) {
    const width = 850;
    const margin = { top: 20, right: 30, bottom: 70, left: 70 };
    const visWidth = width - margin.left - margin.right;
    const visHeight = 600 - margin.top - margin.bottom;

    const svg = div.append('svg')
        .attr('width', visWidth + margin.left + margin.right)
        .attr('height', visHeight + margin.top + margin.bottom);

    const g = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // add title

    g.append("text")
        .attr("x", visWidth / 2)
        .attr("y", -margin.top + 2)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "hanging")
        .attr("font-family", "sans-serif")
        .attr("font-size", "16px")
        .text("Top 10 Donation Purposes");

    // values needed later

    const top10 = Array.from(new Set(purposeNet.map(d => d.purpose)));
    const yearList = (Array.from(new Set(purposeNet.map(d => d.year)))).sort();
    const dataByYear = Array.from(d3.rollup(purposeNet,
        net => d3.sum(net, c => c.net),
        d => d.year,
        d => d.purpose), (([year, map]) => {
            map.set('year', year);
            return Object.fromEntries(map)
        }));
    const stackedExpand = d3.stack()
        .keys(top10)
        .value((d, key) => {
            if (d.hasOwnProperty(key)) {
                return d[key];
            }
            else {
                return 0
            }
        })
        .offset(d3.stackOffsetExpand)(dataByYear)

    const yMax = 1;
    const yFormat = '.0%';
    const yLabel = 'Percent Donations';
    const data = stackedExpand;
    // create scales

    const x = d3.scaleLinear()
        .domain(d3.extent(yearList))
        .range([0, visWidth]);

    const y = d3.scaleLinear()
        .domain([0, yMax]).nice()
        .range([visHeight, 0]);

    const area = d3.area()
        .x(d => x(d.data.year))
        .y1(d => y(d[1]))
        .y0(d => y(d[0]));

    // create axes

    const xAxis = d3.axisBottom(x).tickFormat(d3.format('d'))

    const yAxis = d3.axisLeft(y).tickFormat(d3.format(yFormat))

    g.append('g')
        .attr('transform', `translate(0,${visHeight})`)
        .call(xAxis)
        .call(g => g.selectAll('.domain').remove());

    g.append('g')
        .call(yAxis)
        .call(g => g.selectAll('.domain').remove())
        .append('text')
        .attr('dominant-baseline', 'middle')
        .attr('fill', 'black')
        .attr('x', 50)
        .attr('y', -15)
        .text(yLabel);

    // draw bars

    const color = d3.scaleOrdinal()
        .domain(top10)
        .range(d3.schemeTableau10);

    g.selectAll('.series')
        .data(data)
        .join('g')
          .attr('fill', d => color(d.key))
          .attr('class', 'series')
        .append('path')
          .datum(d => d)
          .attr('d', area);
}