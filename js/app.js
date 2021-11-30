(() => {
    let yOffset = 0; //window.pageYOffset 대신 사용할 변수
    let prevScrollHeight = 0; //현재 스크롤위치(yoffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이의 합
    let currentScene = 0; //현재활성화된 씬((지금 보고있는 스크린)(=scroll-section)
    let enterNewScene = false; //새로운 씬이 시작되는 순간 True (씬이 바뀔때 생기는 오류 방지변수)
     
    const sceneInfo = [
        // 배열 객체는 4개를 만든다(섹션이 4개이기 때문)
        {//1
            type:'sticky',
            //브라우저 높이의 5배로 scrollHeight 세팅
            heightNum:5,
            // 스크롤높이
            scrollHeight:0, 
            objs: {
                container: document.querySelector('#scroll-section-1'),
                messageA: document.querySelector('#scroll-section-1 .main-message.a'),
                messageB: document.querySelector('#scroll-section-1 .main-message.b'),
                messageC: document.querySelector('#scroll-section-1 .main-message.c'),
                messageD: document.querySelector('#scroll-section-1 .main-message.d'),
                canvas: document.querySelector('#video-canvas-0'),
                context: document.querySelector('#video-canvas-0').getContext('2d'),
                videoImages: []
            },
            values: {
                videoImageCount: 313,
                imageSequence:[0, 312],
                canvasOpacity:[1,0,{start:0.9, end:1}],

                messageA_opacity_in:[0, 1, {start: 0.1, end: 0.2}],
                messageA_translateY_in:[20, 0, {start: 0.1, end: 0.2}],
                messageA_opacity_out:[1, 0, {start: 0.25, end: 0.3}],
                messageA_translateY_out:[0, -20, {start: 0.25, end: 0.3}],

                messageB_opacity_in:[0, 1, {start: 0.3, end: 0.4}],
                messageB_translateY_in:[20, 0, {start: 0.3, end: 0.4}],
                messageB_opacity_out:[1, 0, {start: 0.45, end: 0.5}],
                messageB_translateY_out:[0, -20, {start: 0.45, end: 0.5}],

                messageC_opacity_in:[0, 1, {start: 0.5, end: 0.6}],
                messageC_translateY_in:[20, 0, {start: 0.5, end: 0.6}],
                messageC_opacity_out:[1, 0, {start: 0.65, end: 0.7}],
                messageC_translateY_out:[0, -20, {start: 0.65, end: 0.7}],

                messageD_opacity_in:[0, 1, {start: 0.7, end: 0.8}],
                messageD_translateY_in:[20, 0, {start: 0.7, end: 0.8}],
                messageD_opacity_out:[1, 0, {start: 0.85, end: 0.95}],
                messageD_translateY_out:[0, -20, {start: 0.85, end: 0.95}],
            }
        },
        {//2
            type:'nomal',
            // heightNum:5 노말에서는 필요없음
            scrollHeight:0, 
            objs: {
                container:document.querySelector('#scroll-section-2')
            }
        },
        {//3
            type:'sticky',
            heightNum:5,
            scrollHeight:0, 
            objs: {
                container: document.querySelector('#scroll-section-3'),
                messageA: document.querySelector('#scroll-section-3 .a'),
                messageB: document.querySelector('#scroll-section-3 .b'),
                messageC: document.querySelector('#scroll-section-3 .c'),
                pinB: document.querySelector('#scroll-section-3 .b .pin'),
                pinC: document.querySelector('#scroll-section-3 .c .pin'),
                canvas: document.querySelector('#video-canvas-2'),
                context: document.querySelector('#video-canvas-2').getContext('2d'),
                videoImages: []
            },
            values: {
                videoImageCount: 292,
                imageSequence:[0, 291],
                canvasOpacity_in:[0,1,{start:0, end:0.1}],
                canvasOpacity_out:[1,0,{start:0.9, end:1}],

                messageA_opacity_in: [0, 1, { start: 0.15, end: 0.2 }],
                messageA_translateY_in: [20, 0, { start: 0.15, end: 0.2 }],
                messageA_opacity_out: [1, 0, { start: 0.3, end: 0.35 }],
                messageA_translateY_out: [0, -20, { start: 0.3, end: 0.35 }],

                messageB_opacity_in: [0, 1, { start: 0.5, end: 0.55 }],
                messageB_translateY_in: [50, 30, { start: 0.5, end: 0.55 }],
                messageB_opacity_out: [1, 0, { start: 0.58, end: 0.63 }],
                messageB_translateY_out: [30, 0, { start: 0.58, end: 0.63 }],                
				
                messageC_opacity_in: [0, 1, { start: 0.72, end: 0.77 }],
				messageC_translateY_in: [50, 30, { start: 0.72, end: 0.77 }],
                messageC_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
                messageC_translateY_out: [30, 0, { start: 0.85, end: 0.9 }],

                pinB_scaleY: [0.5, 1, { start: 0.5, end: 0.55 }],
				pinC_scaleY: [0.5, 1, { start: 0.72, end: 0.77 }],
                pinB_opacity_in: [0, 1, { start: 0.5, end: 0.55 }],
				pinC_opacity_in: [0, 1, { start: 0.72, end: 0.77 }],				
                pinB_opacity_out: [1, 0, { start: 0.58, end: 0.63 }],
				pinC_opacity_out: [1, 0, { start: 0.85, end: 0.9 }]
            }
        },
        {//4
            type:'sticky',
            heightNum:5,
            scrollHeight:0, 
            objs: {
                container:document.querySelector('#scroll-section-4'),
                canvasCaption: document.querySelector('.canvas-caption'),
                canvas: document.querySelector('.image-blend-canvas'),
                context: document.querySelector('.image-blend-canvas').getContext('2d'),
                imagePath: [
                    './images/mecolro.PNG',
                    './images/IMG_1667.JPG'
                ],
                images: [],
            },
            values: {
                rect1X: [0, 0, {start:0, end: 0}],
                rect2X: [0, 0, {start:0, end: 0}],
                rectStartY: 0,
            }
        }
    ];

    function setCanvasImage(){
        let imgElem;
        for (let i = 0; i < sceneInfo[0].values.videoImageCount; i++){
            imgElem = new Image();  
            imgElem.src = `/video/myhome_30frame_4k/frame_${1 + i}.jpg`;
            sceneInfo[0].objs.videoImages.push(imgElem);
        };

        let imgElem2;
        for (let i = 0; i < sceneInfo[2].values.videoImageCount; i++){
            imgElem2 = new Image();  
            imgElem2.src = `/video/logo_30frame/frame_${1 + i}.jpg`;
            sceneInfo[2].objs.videoImages.push(imgElem2);
        };

        let imgElem3;
        for (let i = 0; i < sceneInfo[3].objs.imagePath.length; i++){
            imgElem3 = new Image();  
            imgElem3.src = sceneInfo[3].objs.imagePath[i];
            sceneInfo[3].objs.images.push(imgElem3);
        };
    };
    setCanvasImage();


    function setLayout(){ 
        //각 스크롤 섹션의 높이 세팅
        for (let i = 0; i < sceneInfo.length; i++){
            if(sceneInfo[i].type == 'sticky'){
                sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
            } else if(sceneInfo[i].type == 'nomal'){
                sceneInfo[i].scrollHeight = sceneInfo[i].objs.container.offsetHeight;
            }
            sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
        }

        yOffset = window.pageYOffset //변수범위가달라서 통일감을 주기위해 똑같은 변수 새로 삽입

        let totalscrollHeight = 0;
        for (let i =0; i < sceneInfo.length; i++){
            totalscrollHeight += sceneInfo[i].scrollHeight;
            if(totalscrollHeight >= yOffset){
                currentScene = i;
                break;
            }

        }
        document.body.setAttribute('id', `show-scene-${currentScene}`);
        // console.log(sceneInfo);    
        
        let heightRatio = sceneInfo[currentScene].scrollHeight / 2160 / 3;
        // if(heightRatio > 0.7){heightRatio = 0.7;};

        sceneInfo[0].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
        sceneInfo[2].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;

        // console.log(currentScene);
        console.log(heightRatio); 
    };

    function calcValues(values, currentYOffset){
        let rv;
        const scrollHeight = sceneInfo[currentScene].scrollHeight;
        const scrollRatio = currentYOffset / scrollHeight;
 
        //star와 end의 애니메이션 실행
        if(values.length == 3){ 
            const partScrollStart = values[2].start * scrollHeight;
            const partScrollEnd = values[2].end * scrollHeight;
            const partScrollHeight = partScrollEnd - partScrollStart;

            if(currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd){
                rv = (currentYOffset - partScrollStart) / partScrollHeight *  (values[1] - values[0]) + values[0];            
            } else if (currentYOffset < partScrollStart){
                rv = values[0];
            } else if (currentYOffset > partScrollEnd){
                rv = values [1];
            }
        } else {
            rv = scrollRatio * (values[1] - values[0]) + values[0];
        }

        return rv;
    }

    function playAnimation(){
        const objs = sceneInfo[currentScene].objs;
        const values = sceneInfo[currentScene].values;
        const currentYOffset = yOffset - prevScrollHeight;
        const scrollHeight = sceneInfo[currentScene].scrollHeight;
        const scrollRatio = currentYOffset / scrollHeight;

        switch (currentScene){
            case 0:   
                let sequence = Math.round(calcValues(values.imageSequence, currentYOffset));
                objs.context.drawImage(objs.videoImages[sequence],0 ,0);
                objs.canvas.style.opacity = calcValues(values.canvasOpacity, currentYOffset);

                if(scrollRatio <= 0.22){
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
                    objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`;
                } else{
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
                    objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_out, currentYOffset)}%, 0)`;
                }
                if(scrollRatio <= 0.42){
                    objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
                    objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
                } else{
                    objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
                    objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`;
                }
                if(scrollRatio <= 0.62){
                    objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
                    objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
                } else{
                    objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
                    objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
                }
                if(scrollRatio <= 0.82){
                    objs.messageD.style.opacity = calcValues(values.messageD_opacity_in, currentYOffset);
                    objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_in, currentYOffset)}%, 0)`;
                } else{
                    objs.messageD.style.opacity = calcValues(values.messageD_opacity_out, currentYOffset);
                    objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_out, currentYOffset)}%, 0)`;
                }
                break;
            case 1:
                // 노말타입이라 동작을 안하므로 지워도 되지만 미관상 놔둔다
                break;
            case 2:
                let sequence2 = Math.round(calcValues(values.imageSequence, currentYOffset));
                objs.context.drawImage(objs.videoImages[sequence2],0 ,0);
                if(scrollRatio <= 0.5){
                    objs.canvas.style.opacity = calcValues(values.canvasOpacity_in, currentYOffset);
                } else{
                    objs.canvas.style.opacity = calcValues(values.canvasOpacity_out, currentYOffset);
                }

                if(scrollRatio <= 0.22){
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
                    objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`;
                } else{
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
                    objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_out, currentYOffset)}%, 0)`;
                }
                if(scrollRatio <= 0.57){
                    objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
                    objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
                    objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`;
                } else{
                    objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
                    objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`;
                    objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`;
                }
                if(scrollRatio <= 0.83){
                    objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
                    objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
                    objs.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currentYOffset)})`;
                } else{
                    objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
                    objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
                    objs.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currentYOffset)})`;
                }
                break;
            case 3:
                // 가로세로 모두 꽉차게 하기 위해 여기에 세팅 (계산 필요)
                const widthRatio = window.innerWidth / objs.canvas.width;
                const heightRatio = window.innerHeight / objs.canvas.height;
                let canvasScaleRatio;

                if(widthRatio <= heightRatio){
                    canvasScaleRatio = heightRatio;
                    // 캔버스보다 브라우저창이 홀쭉한 경우
                } else {canvasScaleRatio = widthRatio;}
                    // 캔버스보더 브라우저창이 납작한 경우

                objs.canvas.style.transform = `scale(${canvasScaleRatio})`;
                objs.context.fillStyle = 'white';
                objs.context.drawImage(objs.images[0],0 ,0);

                // 캔버스 사이즈에 맞춰 가정한 innerwidth와 innerheight
                const canvasCalcWidth = document.body.offsetWidth / canvasScaleRatio;

                if(!values.rectStartY){                   
                    values.rectStartY = 
                    objs.canvas.offsetTop + (objs.canvas.height - objs.canvas.height * canvasScaleRatio)/2;
                    // console.log(values.rectStartY);

                    values.rect1X[2].start = (window.innerHeight /2) / scrollHeight;
                    values.rect2X[2].start = (window.innerHeight /2) / scrollHeight;
                    values.rect1X[2].end = values.rectStartY / scrollHeight;
                    values.rect2X[2].end = values.rectStartY / scrollHeight;
                }

                // console.log(canvasCalcWidth);
                // console.log(canvasScaleRatio);
                
                // console.log(currentYOffset);

                // 캔버스 폭 넓이 조절
                const whiteRectWidth = canvasCalcWidth * 0.2;

                values.rect1X[0] = (objs.canvas.width - canvasCalcWidth) / 2;
                values.rect1X[1] = values.rect1X[0] - whiteRectWidth;
                values.rect2X[0] = values.rect1X[0] + canvasCalcWidth - whiteRectWidth;
                values.rect2X[1] = values.rect2X[0] + whiteRectWidth; 

                objs.context.fillRect(
                    parseInt(calcValues(values.rect1X, currentYOffset)), 
                    0, 
                    parseInt(whiteRectWidth), 
                    objs.canvas.height
                );
                objs.context.fillRect(
                    parseInt(calcValues(values.rect2X, currentYOffset)),
                    0, 
                    parseInt(whiteRectWidth), 
                    objs.canvas.height
                );


                console.log(values.rect1X[0]);
                console.log(values.rect1X[1]);
                console.log(values.rect2X[0]);
                console.log(values.rect2X[1]);
                
                console.log(parseInt(calcValues(values.rect1X, currentYOffset)));
                console.log(parseInt(calcValues(values.rect2X, currentYOffset)));

                break;
        }
    }

    function scrollLoop(){
        enterNewScene = false;
        prevScrollHeight = 0;
        for (let i = 0; i < currentScene; i++){
            prevScrollHeight += sceneInfo[i].scrollHeight;
        }

        if(yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight){
            enterNewScene = true;
            currentScene++; 
            document.body.setAttribute('id', `show-scene-${currentScene}`);
        }

        if(yOffset < prevScrollHeight){
            enterNewScene = true;
            if(currentScene == 0) return;
            currentScene--;
            document.body.setAttribute('id', `show-scene-${currentScene}`);
        }
        if(enterNewScene) return;
        
        playAnimation();
    }
 
    window.addEventListener('scroll',() => {
        yOffset = window.pageYOffset;
        scrollLoop();
    });   
    window.addEventListener('load', () => {
        setLayout();
        sceneInfo[0].objs.context.drawImage(sceneInfo[0].objs.videoImages[0],0 ,0);

    });
    //DOMContentLoaded 도 많이사용 (이미지가 로딩안되도 로딩시키는 매서드) 하지만 여기서는 이미지가 중요하기 때문에 로드를 사용한다
    window.addEventListener('resize',setLayout);

})();