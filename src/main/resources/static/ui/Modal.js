import { EVENT_TYPE } from "../utils/constants.js";
import EventEmitter from "../utils/eventEmitter.js";

export default function Modal() {
  const $openModalButton = document.querySelector(".modal-open");
  const $closeModalButton = document.querySelector(".modal-close");
  const $body = document.querySelector("body");
  const $modal = document.querySelector(".modal");

  const eventBus = EventEmitter();

  const toggle = event => {
    if (event) {
      event.preventDefault();
    }
    $body.classList.toggle("modal-active");
    $modal.classList.toggle("opacity-0");
    $modal.classList.toggle("pointer-events-none");
  };

  $openModalButton.addEventListener(EVENT_TYPE.CLICK, event => {
    toggle(event);
    eventBus.emit("open");
  });
  $closeModalButton.addEventListener(EVENT_TYPE.CLICK, event => {
    toggle(event);
    eventBus.emit("close");
  });

  return {
    toggle,
    ...eventBus
  };
}
