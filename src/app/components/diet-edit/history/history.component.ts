import { Component, OnInit } from '@angular/core';
import {FireBaseService} from '../../../services/fire-base.service';
import { ChartsModule } from 'ng2-charts';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.sass']
})
export class HistoryComponent implements OnInit {

  private subs = [];
  historyList = [];
  login = " "

  public plots = [];

  public lineChartData: ChartDataSets[] = [{"data": [], "label": ""}];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: (ChartOptions) = {
    responsive: true,
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];


  constructor(private fireBase: FireBaseService) { }

  ngOnInit() {
    this.loadData();
  }

  private loadData(): void {
    this.subs.push(
      this.fireBase.getHistoryList().subscribe(history => {
        this.historyList = history;       
        this.historyList.push({"login":"abcd", "Weight":34, "date": new Date()})
        this.historyList.push({"login":"abcd", "Weight":35, "date": new Date()})
        this.historyList.push({"login":"abcd", "Weight":36, "date": new Date()})
        var logins = (new Set(this.historyList.map(h => h.login)))
        console.log(logins);

        logins.forEach(
          l => {
            this.plots.push(this.getUserDataPlot(this.historyList.filter(h => h.login == l))) 
          }
        )
        
        console.log(history);
      })
    );
  }

  private getUserDataPlot(array){
    var plotData = {
      "lineChartData": [{"data": [], "label": ""}],
      "lineChartLabels": [],
      "login": ""
    };
    //sort by date
    array = array.sort(function(a,b){
      return (a.date.seconds * 1000) - (b.date.seconds * 1000)
    });

    var weightList = []
    var labelsList = []

    array.forEach(l => weightList.push(l.Weight));
    array.forEach(l => labelsList.push(
      (new Date(l.date.seconds * 1000).getDate())
      +"."+(new Date(l.date.seconds * 1000).getMonth())
      +"."+(new Date(l.date.seconds * 1000).getFullYear())
      ));

      plotData.lineChartData = [
      { data: weightList, label: array[0].login },
    ];
    plotData.lineChartLabels = labelsList
    plotData.login = array[0].login;

    return plotData;
  }
}
