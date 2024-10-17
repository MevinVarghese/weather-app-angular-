import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  getweather(city: string, units: string) {
    return this.http.get(
      'https://api.openweathermap.org/data/2.5/weather?q=' +
        city +
        '&appid=08647a481d77348a724adfa6fa9f596a&units=' +
        units
    );
  }
}
