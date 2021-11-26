class Main{

    constructor(){
        this.initialize();
    }

    initialize(){
        new SimpleBar(document.querySelector('.scrollable-grid'));
        this.eventListeners();
        this.time();
        setInterval(()=>{
            this.time();
        }, 1000);

        this.initializeDarkMode()
    }

    initializeDarkMode(){
        if(localStorage.getItem("MODE") && localStorage.getItem("MODE") == "dark"){
                document.querySelector('body').classList.add('dark');
                document.querySelector('meta[name="theme-color"]').setAttribute("content", "#111111");
                this.clicked = true;
        }else{
            document.querySelector('body').classList.remove('dark');
            document.querySelector('meta[name="theme-color"]').setAttribute("content", "#FFF");
            this.clicked = false;
        }
    }

    eventListeners(){

        document.querySelector('.dark').addEventListener('click', () => {
        
            if (this.clicked == false) {
                document.querySelector('body').classList.add('dark');
                this.clicked = true;
                document.querySelector('meta[name="theme-color"]').setAttribute("content", "#111111");
                localStorage.setItem("MODE","dark");
            } else {
                document.querySelector('body').classList.remove('dark');
                this.clicked = false;
                document.querySelector('meta[name="theme-color"]').setAttribute("content", "#FFF");
                localStorage.setItem("MODE","light");
            }
        });
        //For Image

        document.querySelectorAll('.add-img').forEach((e)=>{
            e.addEventListener('click',()=>{
                document.querySelector('input[type="file"]').click();
            });
        })
        //Image Selected

        document.querySelector('input[type="file"]').addEventListener('change',(e)=>{
            var file = e.target.files[0];
            const mimes = ['image/png', 'image/jpg','image/jpeg']
                if (mimes.indexOf(file.type) == -1) {
                    alert("File type not supported");
                }else{
                    document.querySelector('input[type="submit"]').click(); // Submit The Form
                    console.log("Success",file)
                }
        });

        document.querySelectorAll('.insta-overlay').forEach(e=>{
            e.addEventListener('click',(e)=>{
                let image = e.target.getAttribute('data-name');
                this.overlay(image);
            })
        })
        
        document.querySelector('.options-overlay-bg').addEventListener('click',()=>{
            document.querySelector('.options-overlay').style.display = "none";
        });
        document.querySelector('.delete').addEventListener('click',this.delete.bind());
        document.querySelector('.anchor').addEventListener('click',this.view.bind());

    }

    overlay(image){
        var isMobile = (/iPhone|iPod|iPad|Android|BlackBerry/).test(navigator.userAgent);
        if(isMobile){
            navigator.vibrate(50);
        }
        document.querySelector('.options-overlay').style.display = "flex";
        document.querySelector('.options-overlay .delete').setAttribute('data-name',image);
        document.querySelector('.options-overlay .anchor').setAttribute('data-name',image);
    }
    delete(){

        let img = document.querySelector('.options-overlay .delete').getAttribute('data-name');

        window.location.href = "delete.php?file="+img;
    }
    view(){
        let img = document.querySelector('.options-overlay .anchor').getAttribute('data-name');

        window.location.href = img;
    }

    time() {
        this.d = new Date();
        //let h = d.getHours() % 12 || 12; // => 9
        this.d.getMinutes(); // =>  30
        let h = ('0' + this.d.getHours() % 12 || 12).slice(-2);
        let m = ('0' + this.d.getMinutes()).slice(-2);
        document.querySelector('.time p').innerHTML = `${h}:${m}`;
    }

}




let oop = new Main();

//  var el = document.querySelector('.scrollable-grid');
//   SimpleScrollbar.initEl(el);