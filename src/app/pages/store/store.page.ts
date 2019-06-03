import { Component, OnInit, AfterViewInit } from "@angular/core";
import { StoreHttpService } from './store.service';
import { faChevronCircleRight, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Card } from 'src/app/models/card/card';

@Component({
  selector: "app-store",
  templateUrl: "./store.page.html",
  styleUrls: ["./store.page.less"]
})
export class StoreComponent implements OnInit {
  cards: Card[] = [];

  constructor(private store: StoreHttpService) {}

  showCurtain: boolean;
  curtainPackId: string;

  nextIcon = faChevronCircleRight;
  closeIcon = faTimes;
  
  ngOnInit() {
  }

  async click(id: string) {
    if(this.showCurtain = true){
      this.dismissCurtain();
    }
    this.cards[id] = await this.store.openPack(id);
    this.openCurtain(id);
    if(this.cards[id] && this.cards[id].opened) return;
  }

  dismissCurtain() {
    this.showCurtain = false;
    this.curtainPackId = null;
  }

  openCurtain(id: string) {
    this.showCurtain = true;
    this.curtainPackId = id;
  }
}
