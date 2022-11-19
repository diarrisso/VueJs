// max size, 100KB, width and height
const MAX_SIZE = 5000000;
const MAX_WIDTH = 576;
const MIN_WIDTH = 330;
const MAX_HEIGHT = 768;
const MIN_HEIGHT = 450;
const app = new Vue({
    el: '#app',
    data: {
        image:{
            size:'',
            height:'',
            width:''
        },
        imageError:''
    },

    methods: {
        selectedFile() {
            this.imageError = '';
            this.image.size= '';
            this.image.width= '';
            this.image.height = '';

            let file = this.$refs.file.files[0];
            console.log(file);

            if (!file || file.type.indexOf('image/') !== 0) return;
            this.image.size = file.size;
            if (this.image.size > MAX_SIZE) {
                console.log(this.image.size);
                this.imageError = ` 1The image size (${this.image.size}) is too much (max is ${MAX_SIZE}).`;
                return;
            }

            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = evt => {
                let img = new Image();
                img.onload = () => {
                    this.image.width = img.width;
                    this.image.height = img.height;
                    console.log(this.image);
                    if (this.image.width > MAX_WIDTH ||  this.image.height > MAX_HEIGHT)  {
                        this.imageError = `Soit la largeur de image est trop grand  (${this.image.width}) ou la hauteur  (max is ${MAX_HEIGHT}).`;
                        return;
                    }
                    if (this.image.height < MIN_HEIGHT || this.image.width < MIN_WIDTH) {
                        this.imageError = ` image doit minum a ( MIN ${MIN_WIDTH}) ET LA HAUTEUR  (MIN is ${MIN_HEIGHT}).`;
                        return;
                    }


                }
                img.src = evt.target.result;
            }

            reader.onerror = evt => {
                console.error(evt);
            }

        }
    }

});