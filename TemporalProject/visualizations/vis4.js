function vis4(purposeNet, div) {
    const width = 850;
    const margin = { top: 20, right: 5, bottom: 20, left: 40 };
    const visWidth = width - margin.left - margin.right;
    const visHeight = 550 - margin.top - margin.bottom;

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
        .text("Yearly % Donations by Purpose");

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
    const stackedExpand = d3.stack().keys(top10)
        .value((d, key) => {
            if (d.hasOwnProperty(key)) {
                return d[key];
            }
            else {
                return 0
            }
        })
        .offset(d3.stackOffsetExpand)(dataByYear)
    const showTicks = [1973, 1977, 1981, 1985, 1989, 1993, 1997, 2001, 2005, 2009, 2013];

    // create scales

    const x = d3.scaleBand()
        .domain(yearList)
        .range([0, visWidth])
        .padding(0.25);

    const y = d3.scaleLinear()
        .domain([0, 1]).nice()
        .range([visHeight, 0]);

    // create axes

    const xAxis = d3.axisBottom(x).tickValues(showTicks).tickFormat(d3.format('d'));

    const yAxis = d3.axisLeft(y).tickFormat(d3.format('.0%'))

    g.append('g')
        .attr('transform', `translate(0,${visHeight})`)
        .call(xAxis)
        .call(g => g.selectAll('.domain').remove());

    g.append("g")
        .call(yAxis)
        .call(g => g.selectAll('.domain').remove())
        .append('text')
        .attr('dominant-baseline', 'middle')
        .attr('fill', 'black')
        .attr('x', 50)
        .attr('y', -15)
        .text('Percent Donations');

    // draw bars

    const color = d3.scaleOrdinal()
        .domain(top10)
        .range(d3.schemeTableau10);

    g.selectAll('.series')
        .data(stackedExpand)
        .join('g')
        .attr('fill', d => color(d.key))
        .attr('class', 'series')
        .selectAll('rect')
        .data(d => d)
        .join('rect')
        .attr('y', d => y(d[1]))
        .attr('height', d => y(d[0]) - y(d[1]))
        .attr('x', d => x(d.data.year))
        .attr('width', x.bandwidth());
}