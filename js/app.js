
const MAX_SIZE = 5000000;
const MAX_WIDTH = 576;
const MIN_WIDTH = 330;
const MAX_HEIGHT = 768;
const MIN_HEIGHT = 450;
const app = new Vue({
    el: '#app',
    data: {
        allowableTypes: ['jpeg', 'png'],
        maximumSize: 5000000,
        selectedImage: null,
        image: null,
        options: {
            url: 'http://localhost:63342/FormVue/Backend/ajax_file.php',
            type: "POST",
            processData: false,
            contentType: false,
        }
            /*image: {
                size: '',
                height: '',
                width: ''
            },*/
           /* imgsrc: null,
            imageError: ''*/
    },

        methods: {
            /*selectedFile(e) {
                this.imageError = '';
                /!* this.image.size= '';
              this.image.width= '';
              this.image.height = '';*!/
                const files = e.target.files[0];
                this.imgsrc = URL.createObjectURL(files)
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
                        if (this.image.width > MAX_WIDTH || this.image.height > MAX_HEIGHT) {
                            this.imageError = `Soit la largeur de image est trop grand  (${this.image.width}) ou la hauteur  (max is ${MAX_HEIGHT}).`;
                            return;
                        }
                        if (this.image.height < MIN_HEIGHT || this.image.width < MIN_WIDTH) {
                            return this.imageError = ` image doit minum a ( MIN ${MIN_WIDTH}) ET LA HAUTEUR  (MIN is ${MIN_HEIGHT}).`;
                        }


                    }
                    img.src = evt.target.result;
                }

                reader.onerror = evt => {
                    console.error(evt);
                }

            },*/
            uploadFile: function (event) {
                this.selectedImage = event.target.files[0]
                //validate the image
                if (!this.validate(this.selectedImage))
                    return
                // create a form
                const form = new FormData();
                form.append('file', this.selectedImage);
                // submit the image
                $.ajax(Object.assign({}, this.options, {data: form}))
                    .then(this.createImage)
                    .catch(this.onImageError);



            },
            validate(image) {
                if (!this.allowableTypes.includes(image.name.split(".").pop().toLowerCase())) {
                    alert(`Sorry you can only upload ${this.allowableTypes.join("|").toUpperCase()} files.`)
                    return false
                }

                if (image.size > this.maximumSize){
                    alert("Sorry File size exceeding from 5 Mb")
                    return false
                }

                return true
            },
            onImageError(err){
                console.log(err, 'erreur lors du transfere');
            },
            changeImage(event) {
                this.selectedImage = event.target.files[0]
                //validate the image
                if (!this.validate(this.selectedImage))
                    return
                // create a form
                const form = new FormData();
                form.append('file', this.selectedImage);
                // submit the image
                $.ajax(Object.assign({}, this.options, {data: form}))
                    .then(this.createImage)
                    .catch(this.onImageError);
            },
            createImage() {
                const image = new Image()
                const reader = new FileReader()
                reader.onload = (e) => {
                    this.image = e.target.result
                };
                reader.readAsDataURL(this.selectedImage)
            },
        },
    });