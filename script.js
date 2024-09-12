//let json=JSON.parse(votacao);
let seu_voto_para=document.querySelector('.d-1-1 span');
let cargo=document.querySelector('.d-1-2 span');
let num=document.querySelector('.d-1-3');
let descricao=document.querySelector('.d-1-4');
let aviso = document.querySelector('.d-2');
let fotos= document.querySelector('.d-1-right');
//VARIÁVEIS DE CONTROLE DE AMBIENTE!!!
let etapaAtual=0;
let numero='';
let vbranco=false;
let votacao=[];
function iniciarEtapa(){
    console.log('inicio');
    let etapa =etapas[etapaAtual];
    numero='';
    vbranco=false;
    let numeroHTML='';

    for(let i=0;i<etapa.numeros;i++){
        if(i === 0){
            numeroHTML += '<div class="numero pisca"></div>';
        }else{
            numeroHTML += '<div class="numero"></div>';
        }
        
    }
    cargo.innerHTML=etapa.titulo;
    descricao.innerHTML='';
    seu_voto_para.style.display='none';
    fotos.innerHTML='';
    num.innerHTML=numeroHTML;
    aviso.style.display='none';
}
function atualizaInterface(){
    console.log('ENTROU');
    let etapa=etapas[etapaAtual];
    let candidato=etapa.candidatos.filter((item)=>{
        if(item.numero===numero){
            return true;
        }else{
            return false;
        }
    });
    //filter retorna um array, por isso colocamos que candidato=candidato[0]
    if(candidato.length >0){
        candidato=candidato[0];
        descricao.innerHTML=`Nome:${candidato.nome}<br/>
        Partido: ${candidato.partido}<br/>`;
        seu_voto_para.style.display='block';
        let fotosHTML=''
        for(let i of candidato.fotos){
            if(i.small){
                fotosHTML +=`<div class="d-1-image small"><img src="images/${i.url}" alt="">${i.legenda}</div>`

            }else{
                fotosHTML +=`<div class="d-1-image"><img src="images/${i.url}" alt="">${i.legenda}</div>`
            }
        }
        fotos.innerHTML=fotosHTML;
        aviso.style.display='block';
    }else{
        seu_voto_para.style.display='block';
        aviso.style.display='block';
        descricao.innerHTML=`<div class="aviso--grande pisca">VOTO NULO</div>`
    }


}
function clicou(n){
    let numer = document.querySelector('.numero.pisca');

    if(numer != null){
        numer.innerHTML = n;
        numero=`${numero}${n}`;
    }
    numer.classList.remove('pisca');
    //ACHA O ELEMENTO DO LADO
    if(numer.nextElementSibling !== null){
        numer.nextElementSibling.classList.add('pisca');
    }else{
        atualizaInterface();
    }
}
function branco(){
        numero='';
        vbranco=true;
        seu_voto_para.style.display='block';
        aviso.style.display='block';
        num.innerHTML='';
        fotos.innerHTML='';
        descricao.innerHTML=`<div class="aviso--grande pisca">VOTO EM BRANCO</div>`
}
function corrige(){
    iniciarEtapa();
    
}
function confirma (){
    let etapa=etapas[etapaAtual];
    if(vbranco===true || numero.length===etapa.numeros){
        votacao.push({
            etapa:etapas[etapaAtual].titulo,
            voto: (numero.length===etapa.numeros) ?numero:'branco',
        });
        etapaAtual++;   
    }
    if(etapas[etapaAtual] !== undefined){
        iniciarEtapa();
    }else{
        document.querySelector('.tela').innerHTML=`<div class="aviso--conclu pisca">FIM</div>`;
        console.log(votacao);

    }
    
}
iniciarEtapa();