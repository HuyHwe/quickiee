let inp = document.getElementById('upload-file');
let uploadList = document.getElementById('item-list');
inp.onchange = () => {
    let filename = inp.files.item(inp.files.length-1).name;
    let newItem = createElementFromHTML(`
        <div class="item features-image сol-12 col-md-6 col-lg-4">
            <div class="item-wrapper">
                <div class="item-img">
                    <img src="assets/images/product5.jpg" alt="Mobirise Website Builder" title="">
                </div>
                <div class="item-content">
                    
                    
                    <p class="mbr-text mbr-fonts-style mt-3 display-7">${filename}</p>
                </div>
                <div class="mbr-section-btn item-footer mt-2"><a href="" class="btn item-btn btn-secondary display-7" target="_blank"><span class="mbri-trash mbr-iconfont mbr-iconfont-btn"></span>Delete</a></div>
            </div>
        </div>`);
    uploadList.appendChild(newItem);
}

function createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();
  
    // Change this to div.childNodes to support multiple top-level nodes.
    return div.firstChild;
  }