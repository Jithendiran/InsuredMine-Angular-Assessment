import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss']
})

// Ref : https://tiptap.dev/examples/suggestions ! initial try 
// Ref : https://www.npmjs.com/package/angular-mentions // simple, fast, readable code
export class MessageBoxComponent {
  @ViewChild('msgBox', { static: true }) textArea!: ElementRef
  @Input() content: string[] = [];
  @Input() textContent: string = '';
  position: number = 0;
  selectedName: string = '';
  clickedElement!: Element | null;

  mentionConfig = {
    mentions: [
      {
        triggerChar: '@',
        items: this.content
      },
    ]
  }

  ngOnChanges() {
    this.textArea.nativeElement.innerHTML = this.textContent;
    this.mentionConfig.mentions[0].items = this.content;
  }

  // clear's content
  clear() {
    this.textArea.nativeElement.innerHTML = '';
  }

  /**
   * Triggered when dropdown value is selected
   * @param selectedName 
   */
  itemSelected(selectedName: string) {
    this.selectedName = selectedName;
  }

  // when drop down closed 
  closed() {
    const node = document.getElementById('msgbox') as HTMLElement;
    let tag = null;
    if (this.clickedElement)
      tag = this.clickedElement as HTMLElement;

    if (this.selectedName)
      // apply box style for dropdown selected value  
      this.textArea.nativeElement.innerHTML = this.textArea.nativeElement.innerHTML.replace(`@${this.selectedName}`, `<span style="background: #909331;padding: 2px;border-radius: 2px;" contenteditable="false">${this.selectedName}</span> `);
    // get last child

    // below code is for place cursor
    if (!tag)
      tag = node.childNodes[(node.childNodes.length - 1)] as any;

    this.selectedName = '';
    if (tag) {
      const length = tag?.length || tag?.nativeElement?.innerHTML?.length || 0;

      if ((length > -1) && this.position > length)
        this.position = length - 1;

      try {
        this.setCursor(this.position, tag as HTMLElement);
      } catch (error) {
        console.log("cursor error");

      }
    }

  }

  /**
   * This is for cursor place ment purpose
   * It will get cursor position value
   */
  keyUp() {
    this.position = ((window.getSelection() as Selection).getRangeAt(0) as Range).startOffset as number;
  }

  /**
   * This is for cursor place ment purpose
   * This will html element at cursor 
   * @param event 
   */
  click(event: any) {
    if (this.textArea.nativeElement.innerHTML.length !== 0) {
      this.clickedElement = document.elementFromPoint(event.clientX, event.clientY) as Element;
    }
    this.keyUp();
  }

  /**
   * This is for cursor place ment purpose
   * This function will set cursor 
   * @param pos Position of the cursor to set
   * @param tag HTML elemnt
   */
  setCursor(pos: number, tag: HTMLElement) {
    // Creates range object
    const setpos = document.createRange();

    // Creates object for selection
    const set = window.getSelection();

    // Set start position of range
    setpos.setStart(tag, pos);

    // Collapse range within its boundary points
    // Returns boolean
    setpos.collapse(true);

    // Remove all ranges set
    set?.removeAllRanges();

    // Add range with respect to range object.
    set?.addRange(setpos);
    this.clickedElement = null;
  }

}
