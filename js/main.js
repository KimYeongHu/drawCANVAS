      const canvas = document.querySelector('.canvas');
      const context = canvas.getContext('2d');

      const dock = document.querySelector('.dock-bar');
      const colorSubmit = document.querySelector('.colorSubmit');
      const colorCode = document.querySelector('.colorCode');
      const canvasReset = document.querySelector('#canvasReset');
      const inputRange = document.querySelector('.brushSize');
      const inputRange2 = document.querySelector('.e-brushSize');
      const imgElem = new Image();
      const saveBtn = document.querySelector('#saveButton');

      const prev = document.querySelector('#prev');
      const nextv = document.querySelector('#nextv');
       
     
      

      let drawingMod = false;
      let setColor;
      let setBrushType = 'color';
      let brushSize = 10;
      let e_brushSize = 10;

      let rangeValue = document.querySelector('#rangeValue');
      let rangeValue2 = document.querySelector('#rangeValue2');

      let clickCount = 0;
      let clickArray = new Array(100);
      
      
      rangeValue.innerHTML = inputRange.value;
      
      inputRange.oninput= function range()
      {
        rangeValue.innerHTML = inputRange.value;
        brushSize = inputRange.value;
      }


      rangeValue2.innerHTML = inputRange2.value;
      
      inputRange2.oninput= function range()
      {
        rangeValue2.innerHTML = inputRange2.value;
        e_brushSize = inputRange2.value;
      }



      function movement(e)
      {
        
        context.fillStyle = setColor;
        if(!drawingMod) return;
        console.log("도구의 타입은"+setBrushType,e);
        switch(setBrushType)
        {
          case 'color' : 
                        
                        
                        context.beginPath();
                        context.arc(e.layerX,e.layerY,brushSize,0,Math.PI*2,true);
                        context.fill();
                        break;
          case 'e-brush' : 
                        context.beginPath();
                        context.clearRect(e.layerX,e.layerY,e_brushSize,e_brushSize);
                        break;

          case 'image' :  imgElem.src = 'images/ori.png';
                          context.beginPath();
                          context.drawImage(imgElem,e.layerX,e.layerY,brushSize*2,brushSize*2);
        
        }

        

      }

      function movement_m(e)
      {
        
        context.fillStyle = setColor;
        if(!drawingMod) return;
        console.log("도구의 타입은"+setBrushType,e);
        switch(setBrushType)
        {
          case 'color' : 
                        
                        
                        context.beginPath();
                        context.arc(e.changedTouches[0].pageX-8,e.changedTouches[0].pageY-86,brushSize,0,Math.PI*2,true);
                        context.fill();
                        break;
          case 'e-brush' : 
                        context.beginPath();
                        context.clearRect(e.changedTouches[0].pageX-8,e.changedTouches[0].pageY-86,e_brushSize,e_brushSize);
                        break;

          case 'image' :  imgElem.src = 'images/ori.png';
                          context.beginPath();
                          context.drawImage(imgElem,e.changedTouches[0].pageX-8,e.changedTouches[0].pageY-100,brushSize*2,brushSize*2);
        
        }

        

      }

      
      
      
      //캔버스에 그릴때마다 배열에 그림 저장
      canvas.addEventListener('click',()=>{
        
        clickCount ++;
        if(setBrushType)
        {
        clickArray[clickCount] = canvas.toDataURL('image/png');
        }

        console.log("clickArray["+clickCount+"]");

      });


      function mousedown()
      {
        drawingMod = true;
       
        
      }

      function mouseup()
      {
        drawingMod = false;
       
        
      }

      function dockbar(e)
      {
        setColor=e.target.getAttribute('color-data');
        setBrushType=e.target.getAttribute('type-data');
        console.log(setColor,setBrushType);
        
      }
     
      colorCode.oninput = function colorCoder()
      {
        
        context.fillStyle = '#'+colorCode.value;
        
      }
      
      function canvasResetfx()
      {
        context.beginPath();
        context.clearRect(0,0,600,400);
        
      }
      function saveCanvas()
      {
        const url = canvas.toDataURL('image/png');
        const imgElem2 = new Image();
        const saveImages = document.querySelector('.saveImages');
        imgElem2.src = url;
        saveImages.appendChild(imgElem2);
        
        // console.log(url);
      }

      function prevfx()//현재 배열의 전단계의 저장된 그림을 불러옴
      {
        canvasResetfx();
        const imgElem3 = new Image();
        imgElem3.src = clickArray[clickCount-1];
        imgElem3.addEventListener('load',()=>{
          
        context.beginPath();
        context.drawImage(imgElem3,0,0);
        console.log("clickArray["+ imgElem3.src+"]");
          
        });
        clickCount--;
       
      }

      function nextfx()
      {
        canvasResetfx();
        const imgElem3 = new Image();
        imgElem3.src = clickArray[clickCount+1];
        imgElem3.addEventListener('load',()=>{
          
          context.beginPath();
        context.drawImage(imgElem3,0,0);
        console.log("clickArray["+ imgElem3.src+"]");
          
        });
        clickCount++;
       
      }

      canvas.addEventListener('mousemove',movement);
      canvas.addEventListener('mousedown',mousedown);
      canvas.addEventListener('mouseup',mouseup);

      canvas.addEventListener('touchmove',movement_m);
      canvas.addEventListener('touchstart',mousedown);
      canvas.addEventListener('touchend',mouseup);

      dock.addEventListener('click',dockbar);
     canvasReset.addEventListener('click',canvasResetfx);
     saveBtn.addEventListener('click',saveCanvas);
      
     prev.addEventListener('click',prevfx);
    nextv.addEventListener('click',nextfx);
     

