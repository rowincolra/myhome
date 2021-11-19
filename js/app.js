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
            },
            values: {
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
            },
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
            },
            values: {
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
                container:document.querySelector('#scroll-section-4')
            },
        }
    ];

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
            case 1:
                // 노말타입이라 동작을 안하므로 지워도 되지만 미관상 놔둔다
                break;
            case 2:
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
    window.addEventListener('load', setLayout);
    //DOMContentLoaded 도 많이사용 (이미지가 로딩안되도 로딩시키는 매서드) 하지만 여기서는 이미지가 중요하기 때문에 로드를 사용한다
    window.addEventListener('resize',setLayout);

})();