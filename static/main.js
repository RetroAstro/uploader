

// 图片上传
var upload_btn = document.querySelector('.button');
var file_input = document.querySelector('input[type="file"]');

upload_btn.addEventListener('click', dispatchFilesBox);
upload_btn.addEventListener('dragover', preventDefault);
upload_btn.addEventListener('drop', dragCommit);
file_input.addEventListener('change', clickCommit);

function preventDefault(e) {
    e.stopPropagation();
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
}

function dragCommit(e) {
    e.stopPropagation();
    e.preventDefault();
    var files = e.dataTransfer.files;
    fileReaderEvent(files);
}

function clickCommit(e) {
    var files = e.target.files;
    fileReaderEvent(files);
}

function dispatchFilesBox() {
    var evt = new MouseEvent('click', {
        bubbles: false,
        cancelable: true,
        view: window
    })
    file_input.dispatchEvent(evt);
}

function Warning(text) {
    var warning = document.querySelector('.warning');
    warning.textContent = text || 'Please upload files with image type!';
    warning.classList.add('active');
    setTimeout(() => { warning.classList.remove('active') }, 5000);
}

function fileReaderEvent(files) {

    var boxes = document.querySelectorAll('footer .wrap');
    var len = boxes.length || 0;
    
    if ( len + files.length > 9 ) {
        Warning('9 pictures, tops!');
        return;
    }

    for ( var i = 0, f; f = files[i]; i++ ) {

        var max = 2 * 1024 * 1024;

        if ( f.size > max ) {
            Warning('max 2MB for single photo');
            return;
        }

        if ( !f.type.match('image.*') ) {
            Warning();
            continue;
        }

        Upload(f);

    }

    let progressBar = document.querySelector('.progress');

    progressBar.style.width = '0%';

    function Upload(f) {
            
        var xhr = new XMLHttpRequest();

        xhr.open('POST', '/upload', true);

        var start;

        var formdata = new FormData();

        formdata.append('file', f);

        var taking;
        
        var percentComplete;

        xhr.upload.addEventListener('progress', (evt) => {

            if ( evt.lengthComputable ) {

                var present = new Date().getTime();
                taking = present - start;
                var x = ( evt.loaded ) / 1024;
                var y = taking / 1000;
                var uploadSpeed = x / y;
                var formatSpeed;

                if ( uploadSpeed > 1024 ) {
                    formatSpeed = ( uploadSpeed / 1024 ).toFixed(2) + 'MB / s';
                } else {
                    formatSpeed = uploadSpeed.toFixed(2) + " kb / s";
                }

                percentComplete = Math.round( evt.loaded * 100 / evt.total );

                progressBar.style.width = `${percentComplete}%`;

            }

        })
        
        start = new Date().getTime();

        xhr.send(formdata);

        xhr.onreadystatechange = function() {

            if ( xhr.readyState == 4 && xhr.status == 200 && xhr.responseText !== '' ) {
                var imgURL = 'save.' + xhr.responseText;
                if ( percentComplete == undefined ) { progressBar.style.cssText = 'transition:width .3s;width:100%;' }
                showInfo(imgURL);
            }

        }

    }

    function showInfo(url) {
        var html = `<div class="wrap"><img src="${url}"></div>`;
        document.querySelector('footer').insertAdjacentHTML('beforeEnd', html);
    }

}


// 终端设备判断
function userAgent() {
    var ua = navigator.userAgent.toLowerCase();
    var isIos = (ua.indexOf('iphone') != -1) || (ua.indexOf('ipad') != -1);
    if (isIos) {
        document.querySelector('input[type="file"]').getAttribute('name').value = 'cover';
    }
}
userAgent();


// 图片预览放大
function scale() {

    var parent = document.querySelector('footer');

    parent.addEventListener('click', (e) => {

        var bg = document.querySelector('.bg-grey');

        if ( e.target.nodeName == 'IMG' ) {
            e.target.classList.toggle('center');
            setTimeout(() => { e.target.classList.toggle('scale') }, 0);
            bg.classList.toggle('grey');
        }

    })

}
scale();



// 确定相册名的动画
var melon = document.querySelector('.one i');
var box = document.querySelector('.username');
var span = document.querySelector('.one span');
var main = document.querySelector('main');

melon.addEventListener('touchstart', (e) => {
    melon.style.cssText = 'transform:rotate(360deg);-webkit-transform:rotate(360deg);';
    setTimeout(() => {
        melon.style.cssText = 'transform:rotate(0deg);-webkit-transform:rotate(0deg);';
    }, 1600)
})

melon.addEventListener('transitionend', () => {
    if ( box.value == '' ) {
        if ( !box.classList.contains('red') ) {
            span.classList.add('red');
            setTimeout(() => {
                span.classList.remove('red');
            }, 5000)
        }
    } else {

        var user = document.querySelector('section');

        main.style.marginLeft = '-100%';
        user.textContent = box.value;
        box.value = '';

        user.classList.add('show');
        document.querySelector('.vital aside').classList.add('show');
        document.querySelector('header span').classList.add('show');

        setTimeout(() => { melon.style = 'display:none' }, 1000);

    }
})


// designer页切换
var SPA = document.querySelector('.container .SPA');
var aside = document.querySelector('.vital aside');
var back_btn = document.querySelector('.square-wrap b');

aside.addEventListener('touchstart', () => {
    if ( aside.classList.contains('show') ) {
        SPA.classList.add('goto-designer');
        document.querySelector('.hint').classList.add('show');
    }
})

SPA.addEventListener('touchmove', (e) => {
    if ( SPA.classList.contains('goto-designer') ) {
        e.preventDefault();
    } else {
        e.returnValue = true;
    }
})

back_btn.addEventListener('touchstart', () => {
    SPA.classList.remove('goto-designer');
    document.querySelector('.hint').classList.remove('show');
})





