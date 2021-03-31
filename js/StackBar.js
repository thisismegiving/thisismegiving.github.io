am4core.ready(function() {

// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

// Create chart instance
var chart = am4core.create("chartdiv05", am4charts.XYChart);

// Title
var title = chart.titles.push(new am4core.Label());
title.text = "Research tools used by students";
title.fontSize = 25;
title.marginBottom = 15;

// Add data
chart.data = [{
  "category": "Hong Konger",
  "negative1": -0.1,
  "negative2": -0.9,
  "positive1": 5,
  "positive2": 94
}, {
  "category": "Asais",
  "negative1": -2,
  "negative2": -4,
  "positive1": 19,
  "positive2": 75
}, {
  "category": "Global Citizen",
  "negative1": -2,
  "negative2": -10,
  "positive1": 46,
  "positive2": 42
}, {
  "category": "Member of Chinese race",
  "negative1": -2,
  "negative2": -13,
  "positive1": 33,
  "positive2": 52
}, {
  "category": "Chinese",
  "negative1": -6,
  "negative2": -19,
  "positive1": 34,
  "positive2": 41
}, {
  "category": "Chinese of PRC",
  "negative1": -3,
  "negative2": -23,
  "positive1": 49,
  "positive2": 25
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

createSeries("negative2", "Unlikely", negativeColor.lighten(0.5));
createSeries("negative1", "Never", negativeColor);
createSeries("positive1", "Sometimes", positiveColor.lighten(0.5));
createSeries("positive2", "Very often", positiveColor);

chart.legend.events.on("layoutvalidated", function(event){
  chart.legend.itemContainers.each((container)=>{
    if(container.dataItem.dataContext.name == "Never"){
      container.toBack();
    }
  })
})

}); // end am4core.ready()