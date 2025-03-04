import { Component, inject, OnInit } from '@angular/core';
import { BrandsService } from '../../core/services/brands/brands.service';
import { IBrand } from '../../shards/interfaces/ibrand';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit {

  private readonly brandsService = inject(BrandsService)
  brands:IBrand[] = []


  ngOnInit(): void {
    this.getAllBrands();
  }
  getAllBrands(): void {
    this.brandsService.getAllBrands().subscribe({
      next: (response) => {
        console.log(response.data);
        this.brands = response.data
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
