am4core.ready(function() {

  // Themes begin
  am4core.useTheme(am4themes_animated);
  // Themes end
  
  // Create chart
  var chart = am4core.create("mekko", am4charts.PieChart);
  chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
  
  chart.data = [
    
    {
      country: "2016",
      value: 152351
    },
    {
      country: "2017",
      value: 158107
    },
    {
      country: "2018",
      value: 169653
    },
    {
      country: "2019",
      value: 314779
    },
    {
      country: "2020",
      value: 622981
    }
  ];
  
  var series = chart.series.push(new am4charts.PieSeries());
  series.dataFields.value = "value";
  series.dataFields.radiusValue = "";
  series.dataFields.category = "country";
  series.slices.template.cornerRadius = 6;
  series.colors.step = 3;
  
  series.hiddenState.properties.endAngle = -90;
  
  chart.legend = new am4charts.Legend();
  
  }); // end am4core.ready()