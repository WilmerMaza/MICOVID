import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page404',
  templateUrl: './page404.component.html',
  styleUrls: ['./page404.component.scss']
})
export class Page404Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
    setInterval(() => {
      this.rainFunction();
    },20)
  }

  rainFunction(): void{
    const style = document.createElement('style');
    style.type = 'text/css';

    style.innerHTML = `
    @keyframes animate {
      0%{
          transform: translateY(0) scaleY(0);
          transform-origin: top;
      }
      10%{
          transform: translateY(0) scaleY(0.25);
          transform-origin: top;
      }
      20%{
          transform: translateY(0) scaleY(1);
      }
      70%{
        transform: translateY(300px) scaleY(1);
        transform-origin: bottom;
      }
      80%{
        transform: translateY(300px) scaleY(1);
        transform-origin: bottom;
      }
      100%{
        transform: translateY(300px) scaleY(0);
        transform-origin: top;
        text-shadow: -180px 0 0 #0f0, 180px 0 0 #0f0;
      }
    }
    `;

      document.head.appendChild(style);

      let cloud = document.querySelector('.cloud');
      let newDiv = document.createElement('div');
      newDiv.classList.add('drop');
      cloud?.appendChild(newDiv);

      let left = Math.floor(Math.random() * 300);
      let size = Math.random() * 1.5;
      let duration = Math.random() * 1;

      newDiv.innerText = this.randomText();
      newDiv.style.left = left + 'px';
      newDiv.style.fontSize = 0.5 + size + 'em'
      newDiv.style.position = 'absolute';
      newDiv.style.top = '60px'
      newDiv.style.height = '20px'
      newDiv.style.lineHeight = '20px';
      newDiv.style.color = '#0f0';
      newDiv.style.transformOrigin = 'bottom'
      newDiv.style.animation = 'animate 2s linear infinite';
      newDiv.style.animationDuration = 1 + duration + 's';

      setTimeout(() => {
        cloud?.removeChild(newDiv);
      }, 2000);
  }

  randomText():string {
    let text = ("$#%&/()+-!");
    return text[Math.floor(Math.random() * text.length)]
  }

}
