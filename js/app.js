
const MAX_SIZE = 1000000;
const MAX_WIDTH = 576;
const MIN_WIDTH = 330;
const MAX_HEIGHT = 768;
const MIN_HEIGHT = 450;
const app = new Vue({
    el: '#app',
    data: {
        allowableTypes: ['jpeg','png'],
        maximumSize: 5000000,
        foldersList: [],
        decodedStr:'',
        options: {
            url: 'http://localhost:63342/FormVue/Backend/ajax_file.php',
            method: 'POST',
           processData: false,
            contentType: false,
            success: function (data) {

                const obj = JSON.parse(data);

                console.log(obj.data.file.file);
                self.foldersList = data;
                this.foldersList = `data:image/jpeg;base64,${obj.data.file.file}`;
                console.log(this.foldersList)
                console.log(this.foldersList[0])


            },
        },
        image: {
            size: '',
            height: '',
            width: ''
        },
        imgsrc: null,
        imageError: ''
    },
    created () {
        this.buildFolders()
    },

    methods: {

        buildFolders: function () {
            this.decodedStr = atob(this.foldersList);

        },


            selectedFile: function () {
            this.imageError = '';
            this.image.size = '';
            this.image.width = '';
            this.image.height = '';
            const files = this.$refs.file.files[0];
            this.imgsrc = URL.createObjectURL(files)
            let file = this.$refs.file.files[0];
            console.log(file);
            if (!file || file.type.indexOf('image/') !== 0) return;
            this.image.size = file.size;
            if (!this.allowableTypes.includes(files.name.split(".").pop().toLowerCase())) {
                this.imageError = `Sorry you can only upload ${this.allowableTypes.join("|").toUpperCase()} files.`;
                console.log('validation');
                return false
            }
            /*if (this.image.size > MAX_SIZE) {
                console.log(this.image.size);
                this.imageError = ` 1The image size (${this.image.size}) is too much (max is ${MAX_SIZE}).`;
                return false;
            }*/
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = evt => {
                let img = new Image();
                img.onload = () => {
                    this.image.width = img.width;
                    this.image.height = img.height;
                    console.log(this.image.height)
                    console.log(this.image.width)
                    console.log(this.image);
                   /* if (this.image.width > MAX_WIDTH || this.image.height > MAX_HEIGHT) {
                        this.imageError = `Soit la largeur de image est trop grand  (${this.image.width}) ou la hauteur  (max is ${MAX_HEIGHT}).`;
                        return false;
                    }*/
                    if (this.image.height < MIN_HEIGHT || this.image.width < MIN_WIDTH) {
                        this.imageError = ` image doit minum a ( MIN ${MIN_WIDTH}) ET LA HAUTEUR  (MIN is ${MIN_HEIGHT}).`;
                        return false;
                    }
                }
                img.src = evt.target.result;
            }

            reader.onerror = evt => {
                console.error(evt);
            }
        },
        onImageError(err) {
            console.log(err, 'erreur lors du transfere');
        },
        uploadFile: function () {
            const files = this.$refs.file.files[0];
            console.log(files);
            //validate the image
            if (this.imageError.length > 0 ) {
                return;
            }
            // create a form
            const form = new FormData();
            form.append('file', files);
            // submit the image
            $.ajax(Object.assign({}, this.options, {data: form})).then(this.createImage).catch(this.onImageError);
            console.log('passt');
        }
    }
});