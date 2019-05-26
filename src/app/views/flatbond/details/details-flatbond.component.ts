import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FlatfairService } from 'src/app/shared/flatfair.service';
import { Flatbond } from 'src/app/shared/Flatbond.class';

@Component({
  selector: 'app-details',
  templateUrl: './details-flatbond.component.html',
  styleUrls: ['./details-flatbond.component.scss']
})
export class DetailsFlatbondComponent implements OnInit {

  public details: Flatbond;
  constructor(public router: Router, public flatfairService: FlatfairService) { }

  ngOnInit() {
    if (this.flatfairService.recoverData()) {
      this.details = this.flatfairService.recoverData();
      console.log(this.details);
    } else {
      this.back();
    }
  }

  public back() {
    this.router.navigate(["create"]);
  }

}
