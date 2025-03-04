import { Component, inject } from '@angular/core';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ICategory } from '../../shards/interfaces/icategory';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  private readonly categoriesService = inject(CategoriesService)
 category: ICategory[] = [];


  ngOnInit(): void {
    this.getAllCategories();
  }
  getAllCategories(): void {
    this.categoriesService.getAllCategories().subscribe({
      next: (response) => {
        console.log(response.data);
        this.category = response.data
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
