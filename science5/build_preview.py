# يجمع كل حاجة في ملف واحد (للمعاينة بالرابط). النسخة الأساسية هي المجلد.
import base64,re
h=open('index.html',encoding='utf-8').read()
css=open('css/style.css',encoding='utf-8').read();js=open('js/app.js',encoding='utf-8').read()
emb={}
for f in ['lessons/ch1-l1.html','lessons/ch1-l2.html']:
    emb[f]=base64.b64encode(open(f,'rb').read()).decode()
e='window.EMBED={'+','.join('"%s":"%s"'%(k,v) for k,v in emb.items())+'};'
h=h.replace('<link rel="stylesheet" href="css/style.css">','<style>'+css+'</style>').replace('<script src="js/app.js"></script>','<script>'+e+'\n'+js+'</script>')
open('preview-single-file.html','w',encoding='utf-8').write(h)
