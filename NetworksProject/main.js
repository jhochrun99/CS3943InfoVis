// Load the datasets and call the functions to make the visualizations

Promise.all([
  d3.csv('data/DonorToRecip.csv', d3.autoType),
  d3.csv('data/PurposeDonorToRecip.csv', d3.autoType),
  d3.csv('data/Top10Recipients.csv', d3.autoType),
  d3.csv('data/Top20Donors.csv', d3.autoType)
]).then(([donorToRecip, purposeDonorRecip, top10Recip, top20Donors ]) => {
  vis1(donorToRecip, top10Recip, top20Donors, d3.select('#vis1'));
  visLegend2(d3.select('#visLegend2'));
  vis2(purposeDonorRecip, top10Recip, top20Donors, d3.select('#vis2'));
});
