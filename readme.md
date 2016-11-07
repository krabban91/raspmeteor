
# Rasphemsidan 
med tillhörande försäljningsrapportering

## För att deploya som node projekt
Först i '/' av projektet för att skapa en *.tar.gz-fil
* $ npm install --production
* $ meteor build .. --architecture os.linux.x86_64

Skicka över filen till servern och ssh:a in (lösenordet finns i kontinuiteten)
* scp -r rasp.tar.gz  rasp@felicia.tfcs.chalmers.se:
* ssh rasp@felicia.tfcs.chalmers.se


Gör diverse installationer och uppdateringar
* $ mv bundle node
* $ cd node
* $ (cd programs/server && npm install && cd ../..)


Starta en screen (tmux) och sätt igång servern
* $ tmux new-session -s rasp
* $ MONGO_URL=mongodb://localhost:27017/rasp ROOT_URL=http://rasp.chalmers.se PORT=3000 node main.js

