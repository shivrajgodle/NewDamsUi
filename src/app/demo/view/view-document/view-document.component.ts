import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DocumentUploadService } from "../../service/document-upload.service";

@Component({
    selector: "app-view-document",
    templateUrl: "./view-document.component.html",
    styleUrls: ["./view-document.component.scss"],
})
export class ViewDocumentComponent implements OnInit {
    documentData: any;
    docId: string;
    versions: any;

    constructor(private docService: DocumentUploadService, private router:Router) {}

    ngOnInit(): void {
        this.docId = localStorage.getItem("documentID");

        this.docService.getDocById(this.docId).subscribe(
            (data) => {
                this.documentData = data;
                console.log(data);
                this.getVersions(this.documentData);
            },
            (error) => {
                alert("something went wrong...!!");
            }
        );
    }

    getVersions(data: any) {
        this.docService.getVersions(data).subscribe(
            (data) => {
                console.log(data);

                this.versions = data[0].versions;
            },
            (error) => {
                alert("something went wrong, please try again later...!!");
            }
        );
    }

    onClickVesrion(version:string){
     localStorage.setItem('version',version);
      this.router.navigate(['/sections']);
    }
}
