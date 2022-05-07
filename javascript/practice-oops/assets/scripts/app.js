class DOMHelper {
  static clearEventListeners(element) {
    const clonedElement = element.cloneNode(true);
    element.replaceWith(clonedElement);
    return clonedElement;
  }

  static moveElement(elementId, queryStatement) {
    const domElement = document.getElementById(elementId);
    const switchAnchorPointElement = document.querySelector(queryStatement);
    switchAnchorPointElement.append(domElement);
    domElement.scrollIntoView({behavior: 'smooth', block: 'start'})
  }
}

class Component {
  constructor(hostElementId, insertBefore = false) {
    if (hostElementId) {
      this.hostElement = document.getElementById(hostElementId);
    } else {
      this.hostElement = document.body;
    }
    this.insertBefore = insertBefore;
  }
  detach() {
    if (this.element) {
      this.element.remove();
      // this.element.parentElement.removeChild(this.element);
    }
  }
  attach() {
    // document.body.append(this.element);
    // document.body.appendChild(toolTipElement);
    this.hostElement.insertAdjacentElement(
      this.insertBefore ? "afterbegin" : "beforeend",
      this.element
    );
  }
}

class ToolTip extends Component {
  constructor(closeNotifierFunction, text, hostElementId) {
    super(hostElementId);
    this.closeNotifier = closeNotifierFunction;
    this.text = text;
    this.create();
  }

  closeToolTip = () => {
    this.detach();
    this.closeNotifier();
  };

  create() {
    const toolTipElement = document.createElement("div");
    toolTipElement.className = "card";
    const toolTipTemplate = document.getElementById('tooltip');
    const toolTipBody = document.importNode(toolTipTemplate.content, true);
    toolTipBody.querySelector('p').textContent = this.text;
    toolTipElement.append(toolTipBody);

    const hostElPosLeft = this.hostElement.offsetLeft;
    const hostElPosTop = this.hostElement.offsetTop;
    const hostElHeight = this.hostElement.clientHeight;
    const parentElementScrolling = this.hostElement.parentElement.scrollTop;

    const x = hostElPosLeft + 20;
    const y = hostElPosTop + hostElHeight - parentElementScrolling - 10;

    toolTipElement.style.position = 'absolute';
    toolTipElement.style.left = x + 'px';
    toolTipElement.style.top = y + 'px';

    toolTipElement.addEventListener("click", this.closeToolTip);
    this.element = toolTipElement;
  }
}

class ProjectItem {
  hasActiveToolTip = false;
  constructor(id, updateProjectListsFunction, type) {
    this.type = type;
    this.id = id;
    this.updateProjectListsHandler = updateProjectListsFunction;
    this.connectSwitchButton(type);
    this.connectMoreInfoButton();
    this.connectDrag();
  }

  showMoreInfoHandler() {
    if (this.hasActiveToolTip) {
      return;
    }
    const projectElement= document.getElementById(this.id);
    const toolTipText = projectElement.dataset.extraInfo;
    const toolTip = new ToolTip(() => (this.hasActiveToolTip = false), toolTipText, this.id);
    toolTip.attach();
    this.hasActiveToolTip = true;
  }

  connectDrag() {
    const item = document.getElementById(this.id);
    item.addEventListener('dragstart', event => {
      event.dataTransfer.setData('text/plain', this.id);
      event.dataTransfer.effectAllowed = 'move';
    });

    item.addEventListener('dragend', event => {
      console.log(event);
    })
  }

  connectMoreInfoButton() {
    const projectItemElement = document.getElementById(this.id);
    const moreInfoBtn = projectItemElement.querySelector(
      "button:first-of-type"
    );
    moreInfoBtn.addEventListener("click", this.showMoreInfoHandler.bind(this));
  }

  connectSwitchButton(type) {
    const projectItemElement = document.getElementById(this.id);
    let switchBtn = projectItemElement.querySelector("button:last-of-type");
    switchBtn = DOMHelper.clearEventListeners(switchBtn);
    console.log(`altered type: `, this.type);
    switchBtn.textContent = this.type === "active" ? "Finish" : "Activate";
    // console.log(switchBtn);
    switchBtn.addEventListener(
      "click",
      this.updateProjectListsHandler.bind(null, this.id)
    );
  }

  update(updateProjectListsFn, type) {
    this.type = type;
    this.updateProjectListsHandler = updateProjectListsFn;
    this.connectSwitchButton();
  }
}

class ProjectList {
  projects = [];
  constructor(type) {
    this.type = type;
    const prjItems = document.querySelectorAll(`#${this.type}-projects li`);
    console.log(`array of ${this.type}-projects:`, prjItems);
    for (const prjItem of prjItems) {
      this.projects.push(
        new ProjectItem(prjItem.id, this.switchProject.bind(this), this.type)
      );
    }
    console.log(`JS managed ${type}-projects id list: `, this.projects);
    this.connectDroppable();
  }

  connectDroppable() {
    const list = document.querySelector(`#${this.type}-projects ul`);

    list.addEventListener('dragenter', event => {
      if(event.dataTransfer.types[0] === 'text/plain') {
        list.parentElement.classList.add('droppable');
        event.preventDefault();
      }
    });

    list.addEventListener('dragover', event => {
      if (event.dataTransfer.types[0] === 'text/plain') {
        event.preventDefault();
      }
    });

    list.addEventListener('dragleave', event => {
      if (event.relatedTarget.closest(`#${this.type}-projects ul`) !== list) {
        list.parentElement.classList.remove('droppable');
      }
    });

    list.addEventListener('drop', event => {
      const prjId = event.dataTransfer.getData('text/plain');
      if (this.projects.find(p => p.id === prjId)) {
        return;
      }
      document.getElementById(prjId).querySelector('button:last-of-type').click();
      list.parentElement.classList.remove('droppable');
    })
  }

  addProject(project) {
    this.projects.push(project);
    DOMHelper.moveElement(project.id, `#${this.type}-projects ul`);
    project.update(this.switchProject.bind(this), this.type);
  }

  setSwitchHandlerFunction(switchHandlerFunction) {
    this.switchHandler = switchHandlerFunction;
  }

  switchProject(projectId) {
    const projectIndex = this.projects.findIndex((p) => p.id === projectId);
    const swapProjectId = this.projects.splice(projectIndex, 1);
    this.switchHandler(swapProjectId[0]);
    // this.switchHandler(this.projects.find(p => p.id === projectId));
    // this.projects = this.projects.filter(p => p.id !== projectId);
  }
}

class App {
  static init() {
    const activeProjectsList = new ProjectList("active");
    const finishedProjectsList = new ProjectList("finished");
    activeProjectsList.setSwitchHandlerFunction(
      finishedProjectsList.addProject.bind(finishedProjectsList)
    );
    finishedProjectsList.setSwitchHandlerFunction(
      activeProjectsList.addProject.bind(activeProjectsList)
    );
  }
}

App.init();
