am4core.ready(function() {

  // Themes begin
  am4core.useTheme(am4themes_animated);
  // Themes end
  
  var chart = am4core.create("chartdiv03", am4charts.RadarChart);
  
  chart.data = [{
   "country": "Zurich",
   "visits": 1
  }, {
   "country": "Paris",
   "visits": 1
  }, {
   "country": "Hong Kong",
   "visits": 1
  }, {
   "country": "Singapore",
   "visits": 4
  }, {
   "country": "Tel Aviv",
   "visits": 5
  }, {
   "country": "Osaka",
   "visits": 5
  }, {
   "country": "Geneva",
   "visits": 7
  }, {
   "country": "New York",
   "visits": 7
  }, {
   "country": "Copenhagen",
   "visits": 9
  }, {
   "country": "Los Angeles",
   "visits": 9
  }];
  
  chart.innerRadius = am4core.percent(40)
  
  var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
  categoryAxis.renderer.grid.template.location = 0;
  categoryAxis.dataFields.category = "country";
  categoryAxis.renderer.minGridDistance = 60;
  categoryAxis.renderer.inversed = true;
  categoryAxis.renderer.labels.template.location = 0.5;
  categoryAxis.renderer.grid.template.strokeOpacity = 0.08;
  
  var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
  valueAxis.min = 0;
  valueAxis.extraMax = 0.1;
  valueAxis.renderer.grid.template.strokeOpacity = 0.08;
  
  chart.seriesContainer.zIndex = -10;
  
  
  var series = chart.series.push(new am4charts.RadarColumnSeries());
  series.dataFields.categoryX = "country";
  series.dataFields.valueY = "visits";
  series.tooltipText = "{valueY.value}"
  series.columns.template.strokeOpacity = 0;
  series.columns.template.radarColumn.cornerRadius = 5;
  series.columns.template.radarColumn.innerCornerRadius = 0;
  
  chart.zoomOutButton.disabled = true;
  
  // as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
  series.columns.template.adapter.add("fill", (fill, target) => {
   return chart.colors.getIndex(target.dataItem.index);
  });
  
  setInterval(()=>{
   am4core.array.each(chart.data, (item)=>{
     item.visits *= Math.random() * 0.5 + 0.5;
     item.visits += 10;
   })
   chart.invalidateRawData();
  }, 2000)
  
  categoryAxis.sortBySeries = series;
  
  chart.cursor = new am4charts.RadarCursor();
  chart.cursor.behavior = "none";
  chart.cursor.lineX.disabled = true;
  chart.cursor.lineY.disabled = true;
  
  }); // end am4core.ready()