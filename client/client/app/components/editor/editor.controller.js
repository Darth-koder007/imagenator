class EditorController {
  constructor(User, $state, $stateParams) {
    'ngInject';

    this._user = User;
    this._$stateParams = $stateParams;
    this._$state = $state;

    this.name = 'editor';
    this.selectedHistoryIndex = null;
    this.objectsList = [];
    this.canvas = new fabric.Canvas('canvas');

    this.canvas.on('after:render', (event) => {
      this.objectsList = [];
      let data = this.canvas.toJSON().objects;
      this.objectsList = data.map((ele) => {
        return ele;
      });
      data = null;
    });

    this.canvas.on('object:added', (event) => {
      this.objectsList = [];
      let data = this.canvas.toJSON().objects;
      this.objectsList = data.map((ele) => {
        return ele;
      });
      data = null;
    });

    this.canvas.on('object:modified',(event) => {
      this.objectsList = [];
      let data = this.canvas.toJSON().objects;
      this.objectsList = data.map((ele) => {
        return ele;
      });
      data = null;
    });
  }

  $onInit() {
    this.selectedDesign = this.getDesignByID(this._$stateParams.id);

    if (this.selectedDesign && this.selectedDesign.current_state) {
      this.canvas.loadFromJSON(this.selectedDesign.current_state,this.canvas.renderAll.bind(this.canvas), (o, object) => {
        this.objectsList = [...object];
      });
    } else {
      this._$state.go('home');
    }
    if (this.selectedDesign.current_state && this.selectedDesign.current_state.objects) {
      this.objectsList = [...this.selectedDesign.current_state.objects];
    }
  }

  addText() {
    let obj = new fabric.IText('Tap and Type', {
      left: 150,
      top: 100,
      fontFamily: 'arial black',
      fill: '#333',
	    fontSize: 50
    });

    this.canvas.add(obj);
  }

  addImage(url) {
    fabric.Image.fromURL(url, (img) => {
      img.width = 200;
      img.height = 200;
      this.canvas.add(img);
    });
  }

  selectDesignFromHistory(objects, index) {
    this.selectedHistoryIndex = index;
    this.objectsList = [...objects.objects];
    this.canvas.loadFromJSON(objects, this.canvas.renderAll.bind(this.canvas));
  }

  selectObject(index) {
    this.canvas.setActiveObject(this.canvas.item(index));
  }

  removeItemFromCanvas($index) {
    this.objectsList.splice($index, 1);

    let data = {
      objects: this.objectsList
    };

    this.canvas.loadFromJSON(data, this.canvas.renderAll.bind(this.canvas));
  }

  updateDesign() {
    this._user.updateDesign({id: this._$stateParams.id, design: this.canvas.toJSON()});
  }

  async uploadImage() {
    let img_url = await this._user.uploadImage(document.querySelector('#file').files[0]);
    if (img_url) {
      this.addImage(img_url);
    }
  }

  getDesignByID(id) {
    return this._user.designs.find(ele => ele.id === id);
  }

  humanReadableDate(date) {
    let temp = new Date(date);
    return `${temp.toDateString()} ${temp.toTimeString()}`;
  }

  reset() {
    this.selectedHistoryIndex = null;
    this.objectsList = [];
    this.selectedDesign = this.getDesignByID(this._$stateParams.id);

    if (this.selectedDesign && this.selectedDesign.current_state) {
      this.canvas.loadFromJSON(this.selectedDesign.current_state,this.canvas.renderAll.bind(this.canvas));
    }
  }
}

export default EditorController;
