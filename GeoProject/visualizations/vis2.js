function vis2(geoJSON, data, div) {
  const margin = {top: 20, right: 20, bottom: 20, left: 20};

  const visWidth = 775 - margin.left - margin.right;
  const visHeight = 450 - margin.top - margin.bottom;

  const svg = div.append('svg')
      .attr('width', visWidth + margin.left + margin.right)
      .attr('height', visHeight + margin.top + margin.bottom);

  const g = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

  const projection =  d3.geoEqualEarth()
      .fitSize([visWidth, visHeight], geoJSON);

  const path = d3.geoPath().projection(projection);

  const countriesOnly = data.map(d => d.country);
  const countryN = data.map(d => ({country: d.country, net: d.net}));
  const countryToNet = Object.fromEntries(new Map(countryN.map(d => [ d.country, d.net ])));

  const maxVal = d3.max(d3.extent(data, d => d.net), d => Math.abs(d));

  const color = d3.scaleDiverging(t => d3.interpolateRdBu(1 - t))
      .domain([-maxVal, 0, maxVal]);

  g.selectAll('.border')
    .data(geoJSON.features)
    .join('path')
      .attr('class', 'border')
      .attr('d', path)
      .attr('fill', function (d) {
          if(countriesOnly.includes(d.properties.NAME)) {
            return color(countryToNet[d.properties.NAME]);
          } 
          else if (countriesOnly.includes(d.properties.NAME_LONG)) { //needed NAME_LONG for Czech Republic
            return color(countryToNet[d.properties.NAME_LONG]);
          }
          //Changed Slovak Republic to Slovakia, Korea to Republic of Korea
          //Monaco, Luxembourg, Liechtenstein are very hard to see, but are there
          else {
            return '#7a7a7a';
          }
        })
      .attr('stroke', '#c2c2c2');

  const mapOutline = d3.geoGraticule().outline();
  
  g.append('path')
    .datum(mapOutline)
    .attr('d', path)
    .attr('stroke', '#dcdcdc')
    .attr('fill', 'none');
}
