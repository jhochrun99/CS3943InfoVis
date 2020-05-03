// Load the datasets and call the functions to make the visualizations

Promise.all([
  d3.csv('data/CountryNetByYear2.csv', d3.autoType),
  d3.csv('data/PurposeNetByYear.csv', d3.autoType),
]).then(([countryNet, purposeNet]) => {
  visLegend1(countryNet, d3.select('#visLegend1'));
  vis1(countryNet, d3.select('#vis1'));
  
  visLegend2(purposeNet, d3.select('#visLegend2'));
  vis2(purposeNet, d3.select('#vis2'));
  vis3(purposeNet, d3.select('#vis3'));
  vis4(purposeNet, d3.select('#vis4'));
});
