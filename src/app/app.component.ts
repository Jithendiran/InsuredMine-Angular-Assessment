import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'InsuredMineAssessment';

  content = ['Apple', 'Ball', 'Cat']
  msgBoxData = [
    {
      content: this.content,
      text: 'hello'
    }
  ]

  // Add new Text area
  addBox() {
    this.msgBoxData.push({
      content: this.content,
      text: ''
    })
  }
}
