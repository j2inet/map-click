    function FindPosition(oElementArg) {
        if (oElementArg == undefined)
            return [0, 0];
        var oElement = oElementArg;
        if (typeof (oElement.offsetParent) != "undefined") {
            for (var posX = 0, posY = 0; oElement; oElement = (oElement.offsetParent)) {
                posX += oElement.offsetLeft;
                posY += oElement.offsetTop;
            }
            return [posX, posY];
        }
        return [0.0];
    }

    function getStateForColor(red, green, blue) {
        const rs = red.toString(16).padStart(2, '0');
        const gs = green.toString(16).padStart(2, '0');
        const bs = blue.toString(16).padStart(2, '0');
        const colorString = rs + gs + bs;
        console.log(colorString);

        return colorToProduct[colorString];

        switch (colorString) {
            case 'b200ff': return 'go-pro-4';
            case '267f00': return 'go-pro-screw';
            case 'ff00dc': return 'go-pro-5';
            case '7f6a00': return 'go-pro-usb';
            case '5b7f00': return 'go-pro-dual-mount';
            case '4cff00': return 'gear-360';
            case 'ff0000': return 'sigma-70-300';
            case 'ff6a00': return 'canon-24-105';
            case 'b6ff00': return 'rokinon-85';
            case 'ffd800': return 'rokinon-10';
            case '0026ff': return 'gopro-tripple-battery-charger';
            case '00ffff': return 'gopro-external-battery';
            case '0094ff': return 'pointgrey';
            case '5b7f00': return 'generic-lens';
            case 'ff006e': return 'memory-card-reader';
            case '00ffff': return 'gopro-external-battery';
            case '808080': return 'canon-135';
            case '4800ff': return 'canon-16-35';
            case '7f0000': return 'ttartisan-35mm';
            case '7f3300': return 'tamron-f-teleconverter';
            default: return '';
        }
    }

    var targetImage;
    var areaMapContext = null;;
    var productData;
    var colorToProduct = {};

function prepareMap(width, height) {
    var imageMap = document.getElementById('target-map');
    var canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    var canvasContext = canvas.getContext('2d');
    canvasContext.drawImage(imageMap, 0, 0, imageMap.width, imageMap.height);    
    areaMapContext = canvasContext;
}

function showProduct(productData) {
    if(productData) {   
        document.getElementById('product-title').innerText = productData.title;
        document.getElementById('product-description').innerText = productData.description;
        document.getElementById('product-image').src = productData.image;
        document.getElementById('product-link').href=productData.link;
    }
}

function mapClick(e) {
    var PosX = e.pageX;
    var PosY = e.pageY;    
    var position = FindPosition(targetImage);
    var readX = PosX - position[0];
    var readY = PosY - position[1];

    if(!areaMapContext) {
        prepareMap(targetImage.width, targetImage.height);
    }   
    var pixelData = areaMapContext.getImageData(readX, readY, 1, 1).data;
    //console.log(readX, readY, pixelData);
    var newState = getStateForColor(pixelData[0], pixelData[1], pixelData[2]);
    var selectedProduct = productData[newState];
    showProduct(selectedProduct);
    console.log(selectedProduct);
    console.log(newState);
}


function main() { 
    targetImage = document.getElementById('target-image');
    targetImage.addEventListener('click', mapClick);

    fetch('./data/color-to-item.json')
    .then(resp=>resp.json())
    .then(jsonResponse=>{
        colorToProduct = jsonResponse;
    })
 
    fetch('./data/tag-to-product.json')
    .then(resp=>resp.json())
    .then(jsonResponse=>{
        productData = jsonResponse
    })

    var areaImage 
}