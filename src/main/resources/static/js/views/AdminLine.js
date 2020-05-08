import { EVENT_TYPE, ERROR_MESSAGE } from "../../utils/constants.js";
import { subwayLinesTemplate, detailSubwayLineTemplate } from "../../utils/templates.js";
import CreateSubWayLineModal from "../../ui/CreateSubwayLineModal.js"
import api from "../../api/index.js";

function AdminLine() {
  const $subwayLineList = document.querySelector("#subway-line-list");
  const $linesInfo = document.querySelector(".lines-info");
  
  const subwayLineModal = new CreateSubWayLineModal();  

  const onCreateSubwayLine = async data => {
    const { id } = await api.line.create(data);
    if (!id) {
      alert(ERROR_MESSAGE.NOT_EXIST);
      return;
    }
    $subwayLineList.insertAdjacentHTML(
      "beforeend",
      subwayLinesTemplate({
        id,
        ...data
      })
    );
    subwayLineModal.toggle();
  };

  const onDeleteSubwayLine = event => {
    const $target = event.target;
    const isDeleteButton = $target.classList.contains("mdi-delete");
    if (isDeleteButton) {
      $target.closest(".subway-line-item").remove();
    }
  };

  const onUpdateSubwayLine = event => {
    const $target = event.target;
    const isUpdateButton = $target.classList.contains("mdi-pencil");
    if (isUpdateButton) {
      subwayLineModal.toggle();
    }
  };

  const onSelectSubwayLine = async event => {
    const $target = event.target;
    const isSubwayLineItem = $target.classList.contains("subway-line-item");
    if (isSubwayLineItem) {
      const line = await api.line.get($target.dataset.lineId);
      $linesInfo.innerHTML = detailSubwayLineTemplate(line);
    }
  }

  const onEditSubwayLine = event => {
    const $target = event.target;
    const isDeleteButton = $target.classList.contains("mdi-pencil");
  };

  const initDefaultSubwayLines = async () => {
    const lines = await api.line.get();
    lines.map(line => {
      $subwayLineList.insertAdjacentHTML(
        "beforeend",
        subwayLinesTemplate(line)
      );
    });
  };

  const initEventListeners = () => {
    $subwayLineList.addEventListener(EVENT_TYPE.CLICK, onDeleteSubwayLine);
    $subwayLineList.addEventListener(EVENT_TYPE.CLICK, onUpdateSubwayLine);
    $subwayLineList.addEventListener(EVENT_TYPE.CLICK, onSelectSubwayLine);
    subwayLineModal.on('submit', onCreateSubwayLine);
  };

  this.init = () => {
    initDefaultSubwayLines();
    initEventListeners();
    subwayLineModal.init();
  };
}

const adminLine = new AdminLine();
adminLine.init();
