import { Component, OnInit } from '@angular/core';
import { CursosService } from './services/cursos.service';
import { MatTableDataSource } from '@angular/material/table';
import { Curso } from './models';
import { MatDialog } from '@angular/material/dialog';
import { AbmCursosComponent } from './components/abm-cursos/abm-cursos.component';
import { NotificationsService } from 'src/app/core/services/notifications.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss']
})
export class CursosComponent implements OnInit{


  dataSource = new MatTableDataSource();

  displayedColumns = ['id', 'name', 'start_date','end_date', 'see_details', 'acciones'];
  router: any;
  activatedRoute: any;

  constructor(private cursosService: CursosService, private dialog: MatDialog,  private notificationService: NotificationsService) {}

  ngOnInit(): void {
      this.cursosService.obtenerCursos()
        .subscribe({
          next: (cursos) => {
            this.dataSource.data = cursos;
          }
        });
  }

  crearCurso(): void {
    const dialog = this.dialog.open(AbmCursosComponent);

    dialog.afterClosed()
    .subscribe((formValue) => {
      if (formValue) {
      this.cursosService.crearCurso(formValue)
      }
    })

  }
  
  editarCurso(curso: Curso): void {
    const dialog = this.dialog.open(AbmCursosComponent, {
      data: {
        curso,
      }
    })
    dialog.afterClosed()
     .subscribe((formValue) => {
      if (formValue) {
        this.cursosService.editarCurso(curso.id, formValue);
      }

     })
  }

  applyFilters(ev: Event): void{

  }


  goToDetails(userId: number): void{
    this.router.navigate([userId], {
      relativeTo: this.activatedRoute,
    });
  }

  eliminarCurso(curso: Curso): void {
    this.cursosService.eliminarCurso(curso.id)
    if (true) {
      this.notificationService.mostrarMensaje2('El usuario se borró correctamente');
    }
  
  }
}
