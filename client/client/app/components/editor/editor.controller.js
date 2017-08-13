class EditorController {
  constructor(User, $stateParams) {
    'ngInject';

    this._user = User;
    this._$stateParams = $stateParams;
    this.name = 'editor';
    this.objectsList = [];
    this.canvas = new fabric.Canvas('canvas');
    this.canvas.on('after:render', (event) => {
      this.objectsList = [];
      this.objectsList = this.canvas.toJSON().objects;
    });

    this.canvas.on('object:added', (event) => {
      this.objectsList = [];
      this.objectsList = this.canvas.toJSON().objects;
    });

    this.canvas.on('object:modified',(event) => {
      this.objectsList = [];
      this.objectsList = this.canvas.toJSON().objects;
    });
  }

  $onInit() {
    this.selectedDesign = this.getDesignByID(this._$stateParams.id);

    if (this.selectedDesign && this.selectedDesign.current_state) {
      this.canvas.loadFromJSON(this.selectedDesign.current_state,this.canvas.renderAll.bind(this.canvas));
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

  selectDesignFromHistory(objects) {
    this.canvas.loadFromJSON(objects, this.canvas.renderAll.bind(this.canvas));
  }

  selectObject(index) {
    this.canvas.setActiveObject(this.canvas.item(index));
  }

  removeItemFromCanvas($index) {
    this.objectsList = this.objectsList.splice($index, 1);
  }

  updateDesign() {
    // TODO: Save canvas as current
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
}

export default EditorController;
