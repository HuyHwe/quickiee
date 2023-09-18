let inp = document.getElementById('files');
let uploadList = document.getElementById('item-list');
let uploadForm = document.getElementById("upload-form");
let submit = document.getElementById("share-file");
let titleSection = document.getElementById("info3-6");
inp.onchange = () => {
    let filesString = "";
    if (inp.files.length > 0) {
        submit.style.display = "";
        titleSection.style.paddingBottom = 0;
    } else {
        submit.style.display = "none";
        titleSection.style.paddingBottom = "6rem";
    }
    for (let i = 0; i < inp.files.length; i++) {
        filesString += `<div class="item features-image сol-12 col-md-6 col-lg-4">
        <div class="item-wrapper">
            <div class="item-img">
                <img src="assets/images/product5.jpg" alt="Mobirise Website Builder" title="">
            </div>
            <div class="item-content">
                
                
                <p class="mbr-text mbr-fonts-style mt-3 display-7">${inp.files.item(i).name}</p>
            </div>
            <div class="mbr-section-btn item-footer mt-2"><a href="" class="btn item-btn btn-secondary display-7" target="_blank"><span class="mbri-trash mbr-iconfont mbr-iconfont-btn"></span>Delete</a></div>
        </div>
    </div>` + "\n";
    }

    uploadList.innerHTML = filesString;

}

function createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();
  
    // Change this to div.childNodes to support multiple top-level nodes.
    return div.firstChild;
  }