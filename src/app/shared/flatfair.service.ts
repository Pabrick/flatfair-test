import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IFixedMembershipResponse, FixedMembership } from './FixedMembership.class';
import { Flatbond } from './Flatbond.class';

@Injectable({
  providedIn: 'root'
})
export class FlatfairService {

  public storedFlatbond: Flatbond;
  public membershipConfig: FixedMembership;
  private urlConfig:string = "https://cxynbjn3wf.execute-api.eu-west-2.amazonaws.com/production/config";
  private urlPost:string = "https://cxynbjn3wf.execute-api.eu-west-2.amazonaws.com/production/flatbond";

  constructor (private http: HttpClient) {
    this.getData().subscribe((response: IFixedMembershipResponse)=>{
      this.membershipConfig = new FixedMembership(response);
    });
  }

  public getData() {
    return this.http.get<IFixedMembershipResponse>(this.urlConfig);
  }

  public sendData(payload): Observable<any> {
    return this.http.post(this.urlPost, payload);
  }

  public storeData(data) {
    this.storedFlatbond = new Flatbond(data);
  }

  public recoverData() {
    return this.storedFlatbond;
  }
    
}