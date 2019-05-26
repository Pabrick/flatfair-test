import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { FlatfairService } from 'src/app/shared/flatfair.service';
import { FixedMembership } from 'src/app/shared/FixedMembership.class';

@Component({
  selector: 'app-create',
  templateUrl: './create-flatbond.component.html',
  styleUrls: ['./create-flatbond.component.scss']
})
export class CreateFlatbondComponent implements OnInit {

  public loading: boolean = true;
  public flatbondForm: FormGroup;
  private RECURRENCE_WEEK = "week";
  private RECURRENCE_MONTH = "month";

  constructor(public router: Router, private formBuilder: FormBuilder, public flatfairService: FlatfairService, ) {
    this.flatfairService.getData().subscribe(() => {
      this.loading = false;
    });
  }

  ngOnInit() {
    this.flatbondForm = this.formBuilder.group({
      amount: ['', [Validators.required]],
      recurrence: [this.RECURRENCE_WEEK],
      membershipFee: [{value: '', disabled: true}],
      postcode: ['', [Validators.required]],
    });

    this.onChanges();
  }

  public onSubmit(form: FormGroup) {
    let data = {
      amount: this.flatbondForm.get('amount').value,
      fee: this.flatbondForm.get('membershipFee').value,
      postcode: this.flatbondForm.get('postcode').value,
      recurrence: this.flatbondForm.get('recurrence').value,
    };
    let payload = {
      amount: form.value.amount,
      postcode: form.value.postcode
    };
    this.loading = true;
    this.flatfairService.sendData(payload).subscribe((response) => {
      if (response.status === "created") {
        this.flatfairService.storeData(data);
        this.router.navigate(["details"]);
      }
    }, (error)=>{
      this.loading = false;
      console.error("error", error);
    });
  }

  private getWeeklyAmount(monthlyAmount: number) {
    const NUMBER_MONTHS_PER_YEAR = 12;
    const NUMBER_WEEKS_PER_YEAR = 53;
    return monthlyAmount * NUMBER_MONTHS_PER_YEAR / NUMBER_WEEKS_PER_YEAR;
  }

  private getFee(fixedMembership: FixedMembership, value: number): number {
    const VAT = 20;
    const MINIMUN_FEE = 120;

    let fee = value < MINIMUN_FEE ? MINIMUN_FEE : value;
    if (fixedMembership.fee) {
      fee = fixedMembership.feeAmount;
    }
    fee = fee + fee * (VAT / 100);

    return fee;
  }

  private calculateFlatbond(amount: number, recurrence: string) {
    if (recurrence === this.RECURRENCE_MONTH) {
      amount = this.getWeeklyAmount(amount);
    } else {
      amount = amount;
    }
    return amount ? Math.ceil(this.getFee(this.flatfairService.membershipConfig, amount)) : undefined; 
  }

  private onChanges(): void {
    this.flatbondForm.get('amount').valueChanges.subscribe(value => {
      this.flatbondForm.get('membershipFee').setValue(this.calculateFlatbond(Number(value), this.flatbondForm.get("recurrence").value));
    });
    this.flatbondForm.get('recurrence').valueChanges.subscribe(value => {
      this.flatbondForm.get('membershipFee').setValue(this.calculateFlatbond(Number(this.flatbondForm.get("amount").value), value));
    });
  }

}
