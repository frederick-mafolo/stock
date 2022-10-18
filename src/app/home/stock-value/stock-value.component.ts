import {
  SimpleChanges,
  Component,
  Input,
  OnInit,
  ViewChild,
  OnChanges,
  AfterViewChecked,
  ChangeDetectorRef,
  AfterViewInit
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Stock } from '../../shared/stock.model';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-stock-value',
  templateUrl: './stock-value.component.html',
  styleUrls: ['./stock-value.component.scss'],
})
export class StockValueComponent
  implements OnInit, OnChanges, AfterViewChecked,AfterViewInit
{
  displayedColumns = ['stock', 'date', 'value'];

  @Input() stock!: any;

  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 20, 30, 50, 100, 300];
  dataSource: any = new MatTableDataSource<Stock>([]);
  showTable: boolean = false;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatTable) table!: MatTable<any>;

  stockValueTitle!: string;

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges) {

 
      if (JSON.stringify(changes.stock?.currentValue) !== '{}' && changes.stock?.currentValue!==undefined) {
  
        this.dataSource = new MatTableDataSource<Stock>(this.stock);
        this.stockValueTitle = this.stock[0]?.stock;
     
        this.showTable = true;
      }
        else
        this.showTable = false;

  }

  ngAfterViewInit():void{

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }
}
