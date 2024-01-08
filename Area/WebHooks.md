# Attention

Pour le developpement, Smee.io est obligatoire (permet de redirigé les webhooks sur les localhost)

# Explications

Les Webhooks sont des requêtes internes aux services. A ne pas confondre avec API.
Pour le dev:
+ Renseigner l'adresse de smee.io obtenue lors de la création d'un projet.
+ Installer smee-client avec:
```shell
sudo npm install -g smee-client
(-g pour --global)
```
+ Recuperer l'adresse de smee.io obtenue lors de la création du projet.
```shell
smee -u https://smee.io/<url> --path (127.0.0.1 par default)/webhooks/<service visé> --port 8080
```

Celà envoie une requête POST sur l'adresse renseignée au dessus.
Pour la production:
+ Renseigner l'url du vps sur le site du service (sous forme complète: https://adresse.du.vps:8080/webhooks/service-visé).