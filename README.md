
#Webshop deployed on https://jkluxery.herokuapp.com/



# Hausarbeit Web Shop

## Applikation lokal starten

	node index.js	

## Initiales Git Repository erstellen

	git init
	git add .
	git commit -m "initial commit"
	
## Initiales Deployment auf Heroku

	heroku login
	heroku create
	git push heroku master

## Deployment einer neuen Version

	git push heroku master

## Logdateien anschauen

	heroku logs --tail

## Applikation im Browser öffnen

	heroku open
