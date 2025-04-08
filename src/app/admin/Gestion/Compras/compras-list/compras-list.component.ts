import {Component, OnInit} from '@angular/core';
import {Dialog} from "primeng/dialog";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputText} from "primeng/inputtext";
import {PrimeTemplate} from "primeng/api";
import {TableModule} from "primeng/table";
import {Pagos} from '../../../../core/models/pagos';
import {PagoService} from '../../../../core/services/PagoService/pago.service';
import {Router} from '@angular/router';
import {Compra} from '../../../../core/models/Compra';
import {CompraService} from '../../../../core/services/CompraService/compra.service';
import {InputNumber} from 'primeng/inputnumber';

@Component({
  selector: 'app-compras-list',
  imports: [
    Dialog,
    FormsModule,
    InputText,
    PrimeTemplate,
    ReactiveFormsModule,
    TableModule,
    InputNumber
  ],
  templateUrl: './compras-list.component.html',
  styleUrl: './compras-list.component.css'
})
export class ComprasListComponent implements OnInit{
  compras: Array<Compra> = [];
  visible: boolean = false;
  comprasForm!: FormGroup;

  constructor(private compraService: CompraService, private router: Router,private fb:FormBuilder) {
  }

  ngOnInit(): void {
    this.getcompras()
    this.comprasForm = this.fb.group({
      compraId: [],
      userInfo: [''],
      pelicula: [''],
      precioTotal: [''],
      cantidadTickets: [''],
      fechaCompra: [''],
    });
  }

  onGlobalFilter(event: Event, table: any) {
    const input = event.target as HTMLInputElement;
    table.filterGlobal(input.value, 'contains');
  }

  getcompras() {
    this.compraService.getcompras().subscribe(
      (compras: Array<Compra>) => {
        this.compras = compras;
        console.log(this.compras);
      }
    )
  }
  showDialog(pagoid:number) {
    this.visible = true;
    this.compraService.getcompra_x_id(pagoid).subscribe(
      compra=>{
        this.comprasForm.patchValue({
          compraId:compra.compraId,
          userInfo:compra.userInfo.name,
          pelicula:compra.pelicula.titulo,
          precioTotal:compra.precioTotal,
          cantidadTickets:compra.cantidadTickets,
          fechaCompra:compra.fechaCompra,
        })
      }
    );
  }

}
