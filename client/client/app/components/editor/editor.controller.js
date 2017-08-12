class EditorController {
  constructor(User) {
    'ngInject';
    console.log(User);
  }

  $onInit() {
    this.name = 'editor';
    this.objectsList = [];
    this.canvas = new fabric.Canvas('canvas');
    this.canvas.on('object:added', (event) => {
      // this.objectsList = JSON.parse(JSON.stringify(event.target.canvas.toJSON().objects));
      this.objectsList.push({type:'vijay'});
    });

    this.canvas.on('object:modified',(event) => {
      this.objectsList = JSON.parse(JSON.stringify(event.target.canvas.toJSON().objects));
    });

    this.fetchCanvasFromBackend();
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

  selectObject(index) {
    this.canvas.setActiveObject(this.canvas.item(index));
  }

  fetchCanvasFromBackend() {
    // TODO: Fetch selected canvas from backend
    // this.canvas.loadFromJSON(json, this.canvas.renderAll.bind(this.canvas), (o, object) => {
    //
    // });
    //
    fabric.Image.fromURL('https://s-media-cache-ak0.pinimg.com/736x/ee/fd/4d/eefd4d45c0cd9dd7f3d86b4b49e7fc72--cute-minions-minion-stuff.jpg', (img) => {
      img.width = 200;
      img.height = 200;
      this.canvas.add(img);
    });
  }

  saveCanvasToBackend() {
    // TODO: Save canvas as current
  }
}

export default EditorController;
