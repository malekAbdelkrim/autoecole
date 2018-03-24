import { Component , ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { AutoEcoleService } from "./autoecole/autoecole.service";
import * as FileSaver from 'file-saver';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html'
})
export class AppComponent {
	 
 constructor(public toastr: ToastsManager, vcr: ViewContainerRef, private autoEcoleService: AutoEcoleService) {
         this.toastr.setRootViewContainerRef(vcr);
      }
        
      showSuccess() {
        this.toastr.success('You are awesome!', 'Success!');
      }

      envoyerEmail(){
      	this.autoEcoleService.EnvoyerEmail().subscribe(
      			data => console.log(data),
      			error => console.log(error);
      	);
      }

      EnvoyerSMS(){
      	this.autoEcoleService.EnvoyerSMS().subscribe(
      			data => console.log(data),
      			error => console.log(error);
      	);
      }

      downloadFile(){
      this.autoEcoleService.getFile('/images/professeur/dédicace.pdf').subscribe(
          fileData => FileSaver.saveAs(fileData, "file.pdf")
        );
     }



    
}
