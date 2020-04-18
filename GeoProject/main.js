// Load the datasets and call the functions to make the visualizations

Promise.all([
  d3.csv('data/DonationsByCountry.csv', d3.autoType),
  d3.json('data/countries.json'),
]).then(([data, geoJSON]) => {
  vis1(data, d3.select('#vis1'));
  visLegend(data, d3.select('#visLegend'));
  vis2(geoJSON, data, d3.select('#vis2'));
});
