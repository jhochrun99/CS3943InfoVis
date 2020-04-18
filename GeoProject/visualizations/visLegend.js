function visLegend(data, div) {
    const svg = div.append('svg');
    const maxVal = d3.max(d3.extent(data, d => d.net), d => Math.abs(d));;

    legend({
        color: d3.scaleDiverging(t => d3.interpolateRdBu(1 - t))
        .domain([-maxVal, 0, maxVal]),
        title: 'Net Donation $'
    });

    //svg.append(legend);
}