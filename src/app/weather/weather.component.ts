import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})
export class WeatherComponent implements OnInit {
  myWeather: any;
  temperature: number = 0;
  feelsLikeTemp: number = 0;
  humidity: number = 0;
  pressure: number = 0;
  summary: string = '';
  iconURL: String = '';
  city: string = ''; // Default city
  units: string = 'imperial';
  searchCity: string = '';

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    // Fetch default weather on init
    this.getWeather(this.city);
  }

  getWeather(city: string = this.city): void {
    this.weatherService.getweather(city, this.units).subscribe({
      next: (res) => {
        this.myWeather = res;
        this.temperature = this.myWeather.main.temp;
        this.feelsLikeTemp = this.myWeather.main.feels_like;
        this.humidity = this.myWeather.main.humidity;
        this.pressure = this.myWeather.main.pressure;
        this.summary = this.myWeather.weather[0].main;

        this.iconURL =
          'https://openweathermap.org/img/wn/' +
          this.myWeather.weather[0].icon +
          '@2x.png';
      },
      error: (error) => console.log(error.message),
      complete: () => console.info('API call completed'),
    });
  }

  // This is the missing method that handles the button click
  getWeatherFromInput(): void {
    this.city = this.searchCity;
    this.getWeather(this.searchCity); // Use searchCity for the search
  }
}
