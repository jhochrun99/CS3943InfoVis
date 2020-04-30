function visLegend(countryNet, div) {
    const maxVal = d3.max(d3.extent(countryNet, d => d.net), d => Math.abs(d));;

    const colorLegend = legend({
        color: d3.scaleDiverging()
            .domain([-maxVal, 0, maxVal])
            .interpolator(d3.interpolateRdYlBu),
        title: 'Net Donation $',
        tickFormat: "~s"
    });

    div.append(() => colorLegend);
}