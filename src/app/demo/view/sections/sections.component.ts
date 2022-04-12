import { Component, OnInit } from '@angular/core';
import { DocumentUploadService } from '../../service/document-upload.service';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.scss']
})
export class SectionsComponent implements OnInit {

  counter:number=1;
  version:string;
  keywords:any=[];
  sections:any=[];
  entities:any=[];

  allKeywords:boolean=false;

  constructor(private docService:DocumentUploadService) { }

  ngOnInit(): void {
    this.version=localStorage.getItem('version');

    this.docService.getSections(this.version).subscribe(
      (data)=>{
        console.log(data,"anemoi");
        
        this.sections=data[0].sections;
      }
    )
  }

  onClickSection(section:string)
  {
    this.allKeywords=true;
    this.docService.getKeywords(section).subscribe(
      (data)=>{
        console.log(data);
        this.keywords=data[0].keywords;
        this.entities=data[0].entities;
      },
      (error)=>{
        alert("something went wrong, please try again later...!!")
      }
    )
  }

}
