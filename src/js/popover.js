export default class Popover {
  constructor(button) {
    this.button = button;
    this.popover = this.generatePopover();
    this.visible = false;
  }

  init() {
    this.button.addEventListener('click', () => {
      this.visible = !this.visible;
      if (this.visible) {
        document.body.appendChild(this.popover);
        const { top, left } = this.button.getBoundingClientRect();
        this.popover.style.top = `${window.scrollY + top - this.popover.offsetHeight - 10}px`;
        this.popover.style.left = `${window.scrollX + left + this.button.offsetWidth / 2 - this.popover.offsetWidth / 2}px`;
      } else {
        document.body.removeChild(this.popover);
      }
    });
  }

  generatePopover() {
    const popover = document.createElement('div');
    popover.className = 'popover';
    popover.innerHTML = `
      <div class="arrow"></div>
      <h3 class="popover-header">${this.button.dataset.originalTitle}</h3>
      <div class="popover-body">${this.button.dataset.content}</div>
    `;
    return popover;
  }
}
