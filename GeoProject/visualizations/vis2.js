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

  //const allCountries = Object.keys(geoJSON).map(function(key) { return [key, geoJSON[key]]; });
  //const allCountriesNET = Object.fromEntries(new Map(turnArray[2][1].map(d => [d.properties.SOVEREIGNT, 0])));
  //const countryDonations = d3.csvParse(await FileAttachment('DonationsByCountry.csv').text(), d3.autoType);

  const countriesOnly = data.map(d => d.country);
  //const CountryToNet = Object.fromEntries(new Map(countryDonations.map(d => [d.country, d.net])));
  
  const color = d3.scaleDiverging(d => d3.interpolateRdBu(d))
      .domain(d3.extent(data, d => d.net));

  g.selectAll('.border')
    .data(geoJSON.features)
    .join('path')
      .attr('class', 'border')
      .attr('d', path)
      .attr('fill', function (d) {
          if(countriesOnly.includes(d.properties.NAME) || countriesOnly.includes(d.properties.NAME_LONG)) {
            return 'black';
          } //needed NAME_LONG for Czech Republic
          //Changed Slovak Republic to Slovakia, Korea to Republic of Korea
          //Monaco, Luxembourg, Liechtenstein are very hard to see, but are there
          else {
            return '#dcdcdc';
          }
        })
      .attr('stroke', 'white');

//check names: Slovak Republic

  const mapOutline = d3.geoGraticule().outline();
  
  g.append('path')
    .datum(mapOutline)
    .attr('d', path)
    .attr('stroke', '#dcdcdc')
    .attr('fill', 'none');
}
