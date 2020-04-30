// Load the datasets and call the functions to make the visualizations

Promise.all([
  d3.csv('data/CountryNetByYear.csv', d3.autoType),
  d3.csv('data/PurposeNetByYear.csv', d3.autoType),
]).then(([countryNet, purposeNet]) => {
  vis1(countryNet, d3.select('#vis1'));
  visLegend(countryNet, d3.select('#visLegend'));
  vis2(purposeNet, d3.select('#vis2'));
});
