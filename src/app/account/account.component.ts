import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  key: string = 'AccountNo'; //set default
  reverse: boolean = false;
  pager: any = {};
  searchUser;
  // paged items
  pagedItems: any[];
  accountDetails;
  constructor(private userAccountSer : AccountService, private route: Router) { }
  
  ngOnInit( ): void {


    this.userAccountSer.getUserAccountDetails().subscribe(res => {
      console.log(res);
      let data = JSON.parse(JSON.stringify(res).replace(/\s(?=\w+":)/g, ""));
      this.accountDetails =  data;
      this.setPage(1);
      console.log(data);
    })
  }


  getPager(totalItems: number, currentPage: number = 1, pageSize: number = 10) {
    // calculate total pages
    let totalPages = Math.ceil(totalItems / pageSize);

    // ensure current page isn't out of range
    if (currentPage < 1) { 
        currentPage = 1; 
    } else if (currentPage > totalPages) { 
        currentPage = totalPages; 
    }
    
    let startPage: number, endPage: number;
    if (totalPages <= 10) {
        // less than 10 total pages so show all
        startPage = 1;
        endPage = totalPages;
    } else {
        // more than 10 total pages so calculate start and end pages
        if (currentPage <= 6) {
            startPage = 1;
            endPage = 10;
        } else if (currentPage + 4 >= totalPages) {
            startPage = totalPages - 9;
            endPage = totalPages;
        } else {
            startPage = currentPage - 5;
            endPage = currentPage + 4;
        }
    }

    // calculate start and end item indexes
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

    // return object with all pager properties required by the view
    return {
        totalItems: totalItems,
        currentPage: currentPage,
        pageSize: pageSize,
        totalPages: totalPages,
        startPage: startPage,
        endPage: endPage,
        startIndex: startIndex,
        endIndex: endIndex,
        pages: pages
    };
}
  setPage(page: number) {
    // get pager object from service
    this.pager = this.getPager(this.accountDetails.length, page);

    // get current page of items
    this.pagedItems = this.accountDetails.slice(this.pager.startIndex, this.pager.endIndex + 1);
}

  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }

  navigateToChartComp(){
    this.route.navigate(['/chart']);
  }
}
