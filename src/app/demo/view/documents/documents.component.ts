import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DocumentUploadService } from "../../service/document-upload.service";

@Component({
    selector: "app-documents",
    templateUrl: "./documents.component.html",
    styleUrls: ["./documents.component.scss"],
})
export class DocumentsComponent implements OnInit {
    documents: any = [];

    uploadDialog:boolean=false;

    constructor(private docService: DocumentUploadService, private router:Router) {}

    ngOnInit(): void {
        this.docService.getDocumentDetails().subscribe(
            (data) => {
                console.log(data);
                this.documents = data;
            },
            (error) => {
                alert("somethig went wrong, please try again later...!!");
            }
        );
    }

    onUpload(){
      this.uploadDialog=true;
    }

    myUploader(event: any) {
        console.log(event);
        this.uploadDialog=true;
    }

    onClickDocument(id:string){
        localStorage.setItem("documentID",id);
        this.router.navigate(['/viewDoc'])
    }
}
