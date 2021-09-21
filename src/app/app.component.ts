import { Datasource } from './Datasource';
import { Component } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  dataSource = Datasource.DRAG_DROP_DATA;
  finalSelection: any = [];
  selectedRows: any = [];

  constructor() { }

  /**
   * @author Harshal shirke
   * @param event 
   * @description Check if element is selected, If selected then move all selected user else move single user.
   */
  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer !== event.container) {
      const data = event.item.data;
      const isSelected = this.isRowSelected(data);
      if (isSelected) {
        for (const selectedRow of this.selectedRows) {
          this.updateAfterDrag(selectedRow);
        }
        this.selectedRows = [];
      } else {
        this.updateAfterDrag(data);
      }
    }
  }

  /**
   * @author Harshal shirke
   * @param userData 
   * @description Update both arrays final selected and original datasource.
   */
  updateAfterDrag(userData: any) {
    const mainIndex = this.dataSource.findIndex((element: any) => element === userData);
    if (mainIndex !== -1) {
      this.dataSource.splice(mainIndex, 1)
      this.finalSelection.push(userData);
    }
  }

  /**
   * @author Harshal shirke
   * @param userData 
   * @description Remove user from final selection.
   */
  removeItem(userData: any) {
    const itemIndex = this.finalSelection.findIndex((element: any) => element === userData);
    if (itemIndex !== -1) {
      this.finalSelection.splice(itemIndex, 1)
      this.dataSource.push(userData);
    }
  }

  /**
  * @author Harshal shirke
  * @param userName 
  * @description Get abbravation of user name.
  */
  getAbrv(userName: string) {
    return userName.split(/\s/).map(name => name[0].toLocaleUpperCase()).join('');
  }

  /**
  * @author Harshal shirke
  * @param userData 
  * @description Select or deselect user.
  */
  selectRow(userData: any) {
    const selectedRowIndex = this.selectedRows.indexOf(userData);
    if (selectedRowIndex === -1) {
      this.selectedRows.push(userData);
    } else {
      this.selectedRows.splice(selectedRowIndex, 1);
    }
  }

  /**
  * @author Harshal shirke
  * @param userData 
  * @description Check is row is selected or not.
  */
  isRowSelected(userData: any) {
    return (this.selectedRows.indexOf(userData) !== -1);
  }
}
