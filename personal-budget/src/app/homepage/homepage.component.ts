import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js';

@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  public dataSource: any = {
    datasets: [{
      data: [],
      backgroundColor: [
        '#ffcd56',
        '#ff6384',
        '#36a2eb',
        '#fd6b19',
        '#f08080',
        '#87cefa',
        '#e6e6fa',
      ]
    }],
    labels: []
  };

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('/budget')
      .subscribe(
        (res: any) => {
          this.processData(res.data.myBudget);
          this.createChart();
        },
        error => {
          console.error('Error fetching data:', error);
        }
      );
  }

  processData(data: any[]): void {
    for (let i = 0; i < data.length; i++) {
      this.dataSource.datasets[0].data.push(data[i].budget);
      this.dataSource.labels.push(data[i].title);
    }
  }

  createChart(): void {
    const canvas = document.getElementById('myChart') as HTMLCanvasElement;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        new Chart(ctx, {
          type: 'pie',
          data: this.dataSource
        });
      } else {
        console.error('Failed to get canvas context.');
      }
    } else {
      console.error('Canvas element not found.');
    }
  }

}
