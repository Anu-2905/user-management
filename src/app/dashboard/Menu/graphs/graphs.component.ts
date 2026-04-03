import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-graphs',
  standalone: true,
  imports: [CommonModule, NgChartsModule, FormsModule],
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css']
})
export class GraphsComponent implements OnInit {

  constructor(private http: HttpClient) {}

  // REGISTER PLUGIN
  public chartPlugins = [ChartDataLabels];

  // CHART OPTIONS (FIXED)
  chartOptions: any = {
    responsive: true,
    animation: { duration: 800 },

    plugins: {
      legend: { onClick: () => {} },

      // TOOLTIP FIX
      tooltip: {
        callbacks: {
          label: function(context: any) {

            const chartType = context.chart.config.type;

            //  Pie & Doughnut → %
            if (chartType === 'pie' || chartType === 'doughnut') {

              const data = context.dataset.data;
              const total = data.reduce((a: number, b: number) => a + b, 0);

              const value = context.raw;
              const percentage = ((value / total) * 100).toFixed(1);

              return `${context.label}: ${value} (${percentage}%)`;
            }

            // Scatter
            if (chartType === 'scatter') {
              return `(${context.raw.x}, ${context.raw.y})`;
            }

            // Bubble
            if (chartType === 'bubble') {
              return `(${context.raw.x}, ${context.raw.y}, r: ${context.raw.r})`;
            }

            // Bar / Line
            return `${context.dataset.label}: ${context.raw}`;
          }
        }
      },

      // DATALABELS FIX (ONLY PIE/DOUGHNUT)
      datalabels: {
        formatter: (value: number, context: any) => {

          const chartType = context.chart.config.type;

          if (chartType === 'pie' || chartType === 'doughnut') {

            const data = context.chart.data.datasets[0].data;
            const total = data.reduce((a: number, b: number) => a + b, 0);

            const percentage = ((value / total) * 100).toFixed(1);
            return percentage + '%';
          }

          return null; // hide for others
        },

        color: '#fff',
        font: {
          weight: 'bold',
          size: 14
        }
      }
    }
  };

  // FILTER
  selectedMonth = 'Jan';
  allData: any;

  // LAZY LOAD FLAGS
  showBar = false;
  showLine = false;
  showPie = false;
  showDoughnut = false;
  showScatter = false;
  showBubble = false;

  // CHART DATA
  barChartData: any;
  lineChartData: any;
  pieChartData: any;
  doughnutChartData: any;
  scatterChartData: any;
  bubbleChartData: any;

  ngOnInit() {
    this.http.get<any>('assets/data.json').subscribe(data => {
      this.allData = data;
      this.updateCharts();
      this.loadChartsSequentially();
    });
  }

  // UPDATE CHARTS
  updateCharts() {

    const data = this.allData[this.selectedMonth];

    this.barChartData = {
      labels: ['Week1', 'Week2', 'Week3'],
      datasets: [{
        label: 'Sales',
        data: data.sales,
        backgroundColor: '#4CAF50'
      }]
    };

    this.lineChartData = {
      labels: ['Week1', 'Week2', 'Week3'],
      datasets: [{
        label: 'Users',
        data: data.users,
        borderColor: '#2196F3',
        fill: false
      }]
    };

    this.pieChartData = {
      labels: ['A', 'B', 'C'],
      datasets: [{
        data: this.allData.categories,
        backgroundColor: ['#ff6384', '#36a2eb', '#ffce56']
      }]
    };

    this.doughnutChartData = {
      labels: ['Product A', 'B', 'C'],
      datasets: [{
        data: this.allData.products,
        backgroundColor: ['#f06292', '#64b5f6', '#ffd54f']
      }]
    };

    this.scatterChartData = {
      datasets: [{
        label: 'Scatter',
        data: this.allData.scatter,
        backgroundColor: '#FF5722'
      }]
    };

    this.bubbleChartData = {
      datasets: [{
        label: 'Bubble',
        data: this.allData.bubble,
        backgroundColor: '#673AB7'
      }]
    };
  }

  //  LAZY LOAD
  loadChartsSequentially() {
    setTimeout(() => this.showBar = true, 200);
    setTimeout(() => this.showLine = true, 400);
    setTimeout(() => this.showPie = true, 600);
    setTimeout(() => this.showDoughnut = true, 800);
    setTimeout(() => this.showScatter = true, 1000);
    setTimeout(() => this.showBubble = true, 1200);
  }
}