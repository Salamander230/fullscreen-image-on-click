import { Plugin } from 'obsidian'

export default class FullscreenImageOnClick extends Plugin {
  onload() {
    document.addEventListener('click', (event: MouseEvent) => {
      const target = (event.target as HTMLElement)
      const img = target.closest("img:not(.img-full)")
      let windowWidth = window.innerWidth;
      let windowHeight = window.innerHeight;
      if (img) {
        // create an img clone for fullheight/fullwidth display
        const clone = img.cloneNode(true) as HTMLImageElement;
        document.body.appendChild(clone);
        clone.addClass("img-full");
        const cloneWidth = clone.naturalWidth;
        const cloneHeight = clone.naturalHeight;
        if (cloneWidth/cloneHeight > windowWidth/windowHeight) {
          clone.addClass("img-full-width");
          clone.addClass("img-gt-window-dimensions");
        } else if (cloneWidth/cloneHeight <= windowWidth/windowHeight) {
          clone.addClass("img-full-height");
          clone.addClass("img-lt-window-dimensions");
        }
        window.addEventListener('resize', () => {
          windowWidth = window.innerWidth;
          windowHeight = window.innerHeight;
          if (cloneWidth/cloneHeight > windowWidth/windowHeight) {
            if (clone.classList.contains("img-lt-window-dimensions")) {
              clone.removeClass("img-lt-window-dimensions");
            }
            if (!clone.classList.contains("img-gt-window-dimensions")) {
              clone.addClass("img-gt-window-dimensions");
            }
          } else if (cloneWidth/cloneHeight <= windowWidth/windowHeight) {
            if (clone.classList.contains("img-gt-window-dimensions")) {
              clone.removeClass("img-gt-window-dimensions");
            }
            if (!clone.classList.contains("img-lt-window-dimensions")) {
              clone.addClass("img-lt-window-dimensions");
            }
          }
        });
        document.addEventListener('click', () => {
          if (clone.matches(":hover")) {
            // toggle between fullheight/fullwidth when clicking on the image clone
            if (clone.classList.contains("img-full-height")) {
              clone.removeClass("img-full-height");
              clone.addClass("img-full-width");
            } else if (clone.classList.contains("img-full-width")) {
              clone.removeClass("img-full-width");
              clone.addClass("img-full-height");
            }
          } else {
            // remove the image clone when clicking outside it
            clone.remove();
          }
        });
        document.addEventListener("keydown", function(e) {
          // remove the image clone when pressing escape 
          if (e.key === "Escape") {
            clone.remove();
          }
        });
      }
    });
  }
}
