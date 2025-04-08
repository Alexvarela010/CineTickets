import {Component, OnInit} from '@angular/core';
import {Dialog} from "primeng/dialog";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputText} from "primeng/inputtext";
import {PrimeTemplate} from "primeng/api";
import {TableModule} from "primeng/table";
import {Router} from '@angular/router';
import {PagoService} from '../../../../core/services/PagoService/pago.service';
import {Pagos} from '../../../../core/models/pagos';
import {InputNumber} from 'primeng/inputnumber';

@Component({
  selector: 'app-pagos-list',
  imports: [
    Dialog,
    FormsModule,
    InputText,
    PrimeTemplate,
    ReactiveFormsModule,
    TableModule,
    InputNumber
  ],
  templateUrl: './pagos-list.component.html',
  styleUrl: './pagos-list.component.css'
})
export class PagosListComponent implements OnInit {
  pagos: Array<Pagos> = [];
  visible: boolean = false;
  pagoForm!: FormGroup;

  constructor(private pagoService: PagoService, private router: Router,private fb:FormBuilder) {
  }

  ngOnInit(): void {
    this.getpagos()
    this.pagoForm = this.fb.group({
      id: [],
      estadopago: [''],
      metodopago: [''],
      compra: [''],
      precio: [''],
      cliente: ['']
    });
  }

  onGlobalFilter(event: Event, table: any) {
    const input = event.target as HTMLInputElement;
    table.filterGlobal(input.value, 'contains');
  }

  getpagos() {
    this.pagoService.getpagos().subscribe(
      (pagos: Array<Pagos>) => {
        this.pagos = pagos;
        console.log(this.pagos);
      }
    )
  }
  showDialog(pagoid:number) {
    this.visible = true;
    this.pagoService.getpago_x_id(pagoid).subscribe(
      pago=>{
        this.pagoForm.patchValue({
          id:pago.id,
          estadopago:pago.estadopago,
          metodopago:pago.metodopago,
          compra:pago.compra.compraId,
            precio:pago.compra.precioTotal,
          cliente:pago.compra.userInfo.name
        })
      }
    );
  }
}
