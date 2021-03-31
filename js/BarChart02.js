am4core.ready(function() {

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end
    
    // Create chart instance
    var chart = am4core.create("chartdiv04", am4charts.XYChart);
    
    // Add percent sign to all numbers
    chart.numberFormatter.numberFormat = "#.#'%'";
    
    // Add data
    chart.data = [{
        "country": "Political disputes/\nVery annoying/\nSocial polarisation",
        "year2020": 23.6,
        "year2019": 27.9,
        "year2018": 25.7,
        "year2017": 31.1
    }, {
        "country": "Not politically democratic/\nDissatisfied with political system",
        "year2020": 27.3,
        "year2019": 19.5,
        "year2018": 17.4,
        "year2017": 17.2
    }, {
        "country": "Crowded living environment",
        "year2020": 19.8,
        "year2019": 19.1,
        "year2018": 25.6,
        "year2017": 21.8
    }, {
        "country": "Bad Economic situation\n No economic future",
        "year2020": 17.6,
        "year2019": 21.5,
        "year2018": 17.4,
        "year2017": 15.5
    }];
    
    // Create axes
    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "country";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 10;
    
    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = "Percentage";
    valueAxis.title.fontWeight = 500;
    
    // Create series
    var series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = "year2020";
    series.dataFields.categoryX = "country";
    series.clustered = false;
    series.tooltipText = "{categoryX} (2020: [bold]{valueY}[/]";
    
    var series2 = chart.series.push(new am4charts.ColumnSeries());
    series2.dataFields.valueY = "year2019";
    series2.dataFields.categoryX = "country";
    series2.clustered = false;
    series2.tooltipText = "{categoryX} (2019): [bold]{valueY}[/]";

    var series2 = chart.series.push(new am4charts.ColumnSeries());
    series2.dataFields.valueY = "year2018";
    series2.dataFields.categoryX = "country";
    series2.clustered = false;
    series2.tooltipText = "{categoryX} (2018): [bold]{valueY}[/]";

    var series2 = chart.series.push(new am4charts.ColumnSeries());
    series2.dataFields.valueY = "year2017";
    series2.dataFields.categoryX = "country";
    series2.clustered = false;
    series2.columns.template.width = am4core.percent(50);
    series2.tooltipText = "{categoryX} (2017): [bold]{valueY}[/]";
    
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.lineX.disabled = true;
    chart.cursor.lineY.disabled = true;
    
    }); // end am4core.ready()