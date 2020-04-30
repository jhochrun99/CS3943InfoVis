// Load the datasets and call the functions to make the visualizations

Promise.all([
  d3.csv('data/CountryNetByYear.csv', d3.autoType),
  d3.csv('data/PurposeNetByYear.csv', d3.autoType),
]).then(([countryNet, purposeNet]) => {
  visLegend(countryNet, d3.select('#visLegend'));
  vis1(countryNet, d3.select('#vis1'));
  vis2(purposeNet, d3.select('#vis2'));
});
