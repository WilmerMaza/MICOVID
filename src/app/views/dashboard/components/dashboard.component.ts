import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Validators } from 'src/app/utils/Validators';
import { customOptions } from 'src/app/utils/alert_Toast';
import Swal from 'sweetalert2';

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(private route$: ActivatedRoute) {
  }
  ngOnInit(): void {
    const { snapshot : {queryParams: {newpay}} } = this.route$;
    if(!Validators.isNullOrUndefined(newpay)){
      this.newPayCompleted();
    }
  }

  newPayCompleted(): void {
    Swal.fire(customOptions);
    this.createConfeti();
  }

  createConfeti(): void {
    const container = document.querySelector('.my-swal-container');
    const colores = ['#f00', '#0f0', '#00f', '#ff0', '#0ff', '#f0f', '#ff5733', '#33ff57'];

    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = `
    @keyframes fall {
      0% {
        transform: translateY(0) rotateY(0deg);
      }
      30% {
        transform:translateY(30vh) rotateY(360deg);
      }
      70% {
        transform:translateY(70vh) rotateX(0deg);
      }
      100%{
        transform: translateY(100vh) rotateX(360deg);
      }
    }
    `;

    document.head.appendChild(style);
    
    for (let i = 0; i < 50; i++) {
      const colorAleatorio = colores[Math.floor(Math.random() * colores.length)];
      const confeti = document.createElement('div');
      confeti.classList.add('confeti');
      confeti.style.left = `${Math.random() * 100}%`;
      container?.appendChild(confeti);
      confeti.style.position = 'absolute';
      confeti.style.top = '0';
      confeti.style.width = '10px';
      confeti.style.height = '10px';
      confeti.style.backgroundColor = colorAleatorio;
      confeti.style.borderRadius = '50%';
      confeti.style.animation = `fall ${Math.random()+2}s linear infinite`;
      
    }
  }

}
