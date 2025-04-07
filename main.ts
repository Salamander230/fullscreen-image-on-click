import { Plugin } from 'obsidian'

export default class FullscreenImageOnClick extends Plugin {
	onload() {
		document.addEventListener('click', (event: MouseEvent) => {
			const target = (event.target as HTMLElement)
			const img = target.closest("img:not(.img-full)")
			if (img) {
				// create an img clone for fullheight/fullwidth display
				const clone = img.cloneNode(true) as HTMLImageElement;
				document.body.appendChild(clone);
				clone.addClass("img-full");
				if (clone.naturalWidth > clone.naturalHeight) {
					clone.addClass("img-full-width");
					clone.addClass("width-gt-height");
				} else if (clone.naturalWidth < clone.naturalHeight) {
					clone.addClass("img-full-height");
					clone.addClass("height-gt-width");
				}
				document.addEventListener('click', function handleClick() {
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
