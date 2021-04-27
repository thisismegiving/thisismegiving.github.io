am4core.ready(function() {

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end
    
    // Create chart instance
    var chart = am4core.create("chartdiv02", am4charts.XYChart);
    
    // Create axes
    var xAxis = chart.xAxes.push(new am4charts.ValueAxis());
    xAxis.min = 0;
    xAxis.strictMinMax = true;
    xAxis.renderer.grid.template.disabled = true;
    xAxis.renderer.labels.template.disabled = true;
    
    var yAxis = chart.yAxes.push(new am4charts.ValueAxis());
    yAxis.min = 0;
    
    // Create series
    function createSeries(name, data) {
      
      // Create series itself
      var series = chart.series.push(new am4charts.StepLineSeries());
      series.dataFields.valueX = "ax";
      series.dataFields.valueY = "ay";
      series.strokeWidth = 3;
      series.fillOpacity = 0.2;
      series.stacked = true;
      series.name = name;
      series.data = data;
      
      // Create series for bullets
      var bulletSeries = chart.series.push(new am4charts.ColumnSeries());
      bulletSeries.dataFields.valueX = "ax";
      bulletSeries.dataFields.valueY = "ay";
      bulletSeries.stacked = true;
      bulletSeries.fillOpacity = 0;
      bulletSeries.hiddenInLegend = true;
    
      var bullet = bulletSeries.bullets.push(new am4charts.LabelBullet);
      bullet.label.text = "{valueY}";
      bullet.label.truncate = false;
      bullet.label.background.fill = am4core.color("#fff");
      bullet.label.background.fillOpacity = 0.5;
      bullet.label.padding(3, 6, 3, 6);
      bullet.locationY = 0.5;
      
      var bulletSeriesData = [];
      for(var i = 1; i < data.length; i++) {
        bulletSeriesData.push({
          "ax": data[i].ax - (data[i].ax - data[i-1].ax) / 2,
          "ay": data[i-1].ay
        })
      }
      bulletSeries.data = bulletSeriesData;
      
      // Save reference to related bullet series
      series.dummyData = {
        bulletSeries: bulletSeries
      };
      
      // Set up events to hide/show related bullet series when series is toggled
      series.events.on("hidden", function(ev) {
        ev.target.dummyData.bulletSeries.hide();
      });
      
      series.events.on("shown", function(ev) {
        ev.target.dummyData.bulletSeries.show();
      });
      
      return series;
    }
    
    var series1 = createSeries(
      "Hong Kong",
      [
        { "ax": 0, "ay": 6.50 },
        { "ax": 30, "ay": 6.42},
        { "ax": 40, "ay": 6.31 },
        { "ax": 55, "ay": 6.15 },
        { "ax": 80, "ay": 6.02 },
        { "ax": 100, "ay": 5.57 }
      ]
    );
    
    var series2 = createSeries(
      "China",
      [
        { "ax": 0, "ay": 3.14 },
        { "ax": 30, "ay": 3.14 },
        { "ax": 40, "ay": 3.10 },
        { "ax": 55, "ay": 3.32 },
        { "ax": 80, "ay": 2.26 },
        { "ax": 100, "ay": 2.27 }
      ]
    );
    
    var series3 = createSeries(
      "Taiwan",
      [
        { "ax": 0, "ay": 7.83 },
        { "ax": 30, "ay": 7.79 },
        { "ax": 40, "ay": 7.73 },
        { "ax": 55, "ay": 7.73 },
        { "ax": 80, "ay": 7.73 },
        { "ax": 100, "ay": 8.94 }
      ]
    );
    
    // Create labels
    function createLabel(from, to, text) {
      var range = xAxis.axisRanges.create();
      range.value = from;
      range.endValue = to;
      range.label.text = text;
      range.grid.location = 1;
    }
    
    createLabel(0, 30, "2016");
    createLabel(30, 40, "2017");
    createLabel(40, 55, "2018");
    createLabel(55, 80, "2019");
    createLabel(80, 100, "2020");
    
    // Scrollbar
    chart.scrollbarX = new am4core.Scrollbar();
    
    // Legend
    chart.legend = new am4charts.Legend();
    
    }); // end am4core.ready()