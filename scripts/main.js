
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

    getStateForColor(red, green, blue) {
        const rs = red.toString(16).padStart(2, '0');
        const gs = green.toString(16).padStart(2, '0');
        const bs = blue.toString(16).padStart(2, '0');
        const colorString = rs + gs + bs;
        console.log(colorString);
        switch (colorString) {
            case 'ff0000': return 'courtyard-zone-01';
            case 'ff6a00': return 'barrel-room';
            case 'ffd800': return 'copper-bar-zone-03';
            case '00ffff': return 'tahona-wheel-zone02';
            case 'b6ff00': return 'tasting';
            case 'b200ff': return 'agave-zone-02';
            case 'ecaaff': return 'distilation-zone-01';
            case '0094ff': return 'bottling';
            default: return '';
        }
    }

    mapClick(e) {
        var areaMap = $('.area-click-map')[0];
        var PosX = e.pageX;
        var PosY = e.pageY;
        ;
        var position = FindPosition(areaMap);
        var readX = PosX - position[0];
        var readY = PosY - position[1];
        var canvas = document.createElement('canvas');
        canvas.width = areaMap.width;
        canvas.height = areaMap.height;
        var canvasContext = canvas.getContext('2d');
        canvasContext.drawImage(areaMap, 0, 0, areaMap.width, areaMap.height);
        var pixelData = canvasContext.getImageData(readX, readY, 1, 1).data;
        console.log(readX, readY, pixelData);
        var newState = this.getStateForColor(pixelData[0], pixelData[1], pixelData[2]);
        console.log(newState);
    }


