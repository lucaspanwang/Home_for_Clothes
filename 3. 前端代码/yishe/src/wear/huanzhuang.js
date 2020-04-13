export function huanzhuang(x,src){
    switch(x){
        case 'kuzi':
            document.getElementById('mote6').style.display = 'none';
            document.getElementById('mote_5').style.display = 'none';
            document.getElementById('mote_4').style.display = 'none';
            document.getElementById('mote2').src=src
            document.getElementById('mote2').style.display = 'block';
            break;
        case 'qun':
            document.getElementById('mote6').style.display = 'none'
            document.getElementById('mote_5').style.display = 'none';
            document.getElementById('mote_4').style.display='none'
            document.getElementById('mote_5').style.display='none'
            document.getElementById('mote2').src=src;
            document.getElementById('mote2').style.display = 'block';  
            break;
    }
}
