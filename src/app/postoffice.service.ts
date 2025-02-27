import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostofficeService {
  private apiUrl = 'https://api.postalpincode.in/pincode/'; // Public API for Pincode data

  constructor(private http: HttpClient) {}

  // Function to fetch post office details based on pincode
  getPostOfficeDetails(pincode: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${pincode}`);
  }
}
