am4core.ready(function() {

// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

// Create chart instance
var chart = am4core.create("chartdiv03", am4charts.XYChart);

// Title
var title = chart.titles.push(new am4core.Label());
title.text = "Hong Kong Net Migration over the past 20 years";
title.fontSize = 25;
title.marginBottom = 15;

// Add data
chart.data = [{
  "category": "2021",
  "negative1": -4.630,
  "positive1": 3.485,
}, {
  "category": "2020",
  "negative1": -4.420,
  "positive1": 3.654,
}, {
  "category": "2019",
  "negative1": -4.230,
  "positive1": 3.823,
}, {
  "category": "2018",
  "negative1": 10.370,
  "positive1": 3.992,
}, {
  "category": "2017",
  "negative1": 11.570,
  "positive1": 3.617,
}, {
  "category": "2016",
  "negative1": 13.080,
  "positive1": 3.242,
}, {
  "category": "2015",
  "negative1": 15.050,
  "positive1": 2.867,
}, {
  "category": "2014",
  "negative1": 17.710,
  "positive1": 2.492,
}, {
  "category": "2013",
  "negative1": -4.470,
  "positive1": 2.117,
}, {
  "category": "2012",
  "negative1": -4.320,
  "positive1": 2.216,
}, {
  "category": "2011",
  "negative1": -4.100,
  "positive1": 2.316,
}, {
  "category": "2010",
  "negative1": -3.980,
  "positive1": 2.415,
}, {
  "category": "2009",
  "negative1": -3.790,
  "positive1": 2.515,
}, {
  "category": "2008",
  "negative1": 5.450,
  "positive1": 2.614,
}, {
  "category": "2007",
  "negative1": 5.760,
  "positive1": 2.479,
}, {
  "category": "2006",
  "negative1": 6.160,
  "positive1": 2.344,
}, {
  "category": "2005",
  "negative1": 6.510,
  "positive1": 2.208,
}, {
  "category": "2004",
  "negative1": 6.970,
  "positive1": 2.073,
}, {
  "category": "2003",
  "negative1": -50.550,
  "positive1": 1.938,
}, {
  "category": "2002",
  "negative1": -33.570,
  "positive1": 3.919,
}, {
  "category": "2001",
  "negative1": -25.140,
  "positive1": 5.899,
}];


// Create axes
var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
categoryAxis.dataFields.category = "category";
categoryAxis.renderer.grid.template.location = 0;
categoryAxis.renderer.inversed = true;
categoryAxis.renderer.minGridDistance = 20;
categoryAxis.renderer.axisFills.template.disabled = false;
categoryAxis.renderer.axisFills.template.fillOpacity = 0.05;


var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
valueAxis.min = -100;
valueAxis.max = 100;
valueAxis.renderer.minGridDistance = 50;
valueAxis.renderer.ticks.template.length = 5;
valueAxis.renderer.ticks.template.disabled = false;
valueAxis.renderer.ticks.template.strokeOpacity = 0.4;
valueAxis.renderer.labels.template.adapter.add("text", function(text) {
  return text + "%";
})

// Legend
chart.legend = new am4charts.Legend();
chart.legend.position = "right";

// Use only absolute numbers
chart.numberFormatter.numberFormat = "#.#s";

// Create series
function createSeries(field, name, color) {
  var series = chart.series.push(new am4charts.ColumnSeries());
  series.dataFields.valueX = field;
  series.dataFields.categoryY = "category";
  series.stacked = true;
  series.name = name;
  series.stroke = color;
  series.fill = color;
  
  var label = series.bullets.push(new am4charts.LabelBullet);
  label.label.text = "{valueX}%";
  label.label.fill = am4core.color("#fff");
  label.label.strokeWidth = 0;
  label.label.truncate = false;
  label.label.hideOversized = true;
  label.locationX = 0.5;
  return series;
}

var interfaceColors = new am4core.InterfaceColorSet();
var positiveColor = interfaceColors.getFor("positive");
var negativeColor = interfaceColors.getFor("negative");

createSeries("negative1", "Growth Rate", negativeColor);
createSeries("positive1", "Net Migration Rate", positiveColor.lighten(0.5));

chart.legend.events.on("layoutvalidated", function(event){
  chart.legend.itemContainers.each((container)=>{
    if(container.dataItem.dataContext.name == "Never"){
      container.toBack();
    }
  })
})

}); // end am4core.ready()