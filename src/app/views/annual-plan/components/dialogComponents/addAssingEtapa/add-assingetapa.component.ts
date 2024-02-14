import { Component, Inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators as validForm,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';

import { DynamicError } from 'src/app/shared/model/filterModel';
import { Validators } from 'src/app/utils/Validators';
import { Etapas } from 'src/app/views/Complementos/model/interfaceComplementos';
import { Toast } from '../../../../../utils/alert_Toast';
import { requestEtapaAssing, resposeCreate } from '../../../../Entrenador/Model/entrenadorModel';
import { AnnualPlanService } from '../../../Services/annual-plan.service';
import { dataModelAssingEtapa } from '../../../models/eventsModel';

@Component({
  selector: 'add-assingetapa',
  templateUrl: './add-assingetapa.component.html',
  styleUrls: ['./add-assingetapa.component.scss'],
})
export class AddAssingEtapaComponent {
  public addEtapaForm: FormGroup;
  public EtapasList: Etapas[] = [];
  public minDate: Date;
  public maxDate: Date;
  public titleInit: string = 'Etapas exisitentes';

  constructor(
    public dialogRef: MatDialogRef<AddAssingEtapaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: dataModelAssingEtapa,
    private annualPlanService$: AnnualPlanService,
    public dialog: MatDialog
  ) {
    this.addEtapaForm = new FormGroup({
      etapa: new FormControl('', [validForm.required]),
    });
  }

  ngOnInit(): void {
    this.setValueForm();
  }

  setValueForm(): void {
    const { etapas } = this.data;
    this.EtapasList = Validators.isNullOrUndefined(etapas) ? [] : etapas;
  }

  assingEtapa(): void {
    if (!this.addEtapaForm.valid) {
      this.alertTrigger();
      return;
    }

    const {
      value: { etapa },
    } = this.addEtapaForm;

    const { data } = this.data;

    let assing: requestEtapaAssing[] = [];
    data.forEach((microciclo) => {
      const { ID, MacrocicloID } = microciclo;
      assing.push({
        MicrocicloID: ID,
        MacrocicloID,
        EtapaID: etapa,
      });
    });

    this.annualPlanService$.assingEtapa(assing).subscribe(
      (data: resposeCreate) => {
        Toast.fire({
          icon: 'success',
          title: data.Menssage,
        });
        this.onNoClick();
      },
      (dataError: DynamicError<any>) => {
        const {
          error: { msg },
        } = dataError;

        Toast.fire({
          icon: 'error',
          title: msg,
        });
      }
    );
  }

  alertTrigger(): void {
    this.addEtapaForm.markAllAsTouched();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
