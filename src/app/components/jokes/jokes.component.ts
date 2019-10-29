import { Component, OnInit, OnDestroy } from '@angular/core';
import { Joke } from '../../models/joke';
import { JokesService } from '../../services/jokes.service';

@Component({
  selector: 'app-jokes',
  templateUrl: './jokes.component.html',
  styleUrls: ['./jokes.component.css']
})
export class JokesComponent implements OnInit {

  joke: Joke;
  timeoutMS:number = 60*1000;
  intervalID:number;
  showProgress:boolean;

  constructor(private jokesService: JokesService) { }

  ngOnInit() {
    this.intervalID = window.setInterval(this.getJoke.bind(this), this.timeoutMS);
    this.getJoke();
  }

  ngOnDestroy() {
    window.clearInterval(this.intervalID);
  }

  getJoke():void {
    this.showProgress = false;
    this.jokesService.getJoke()
      .subscribe(joke => {
        this.showProgress = true;
        this.joke = joke;
      });
  }

}
