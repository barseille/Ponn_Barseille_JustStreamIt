
# Just stream it

Cette application web de streaming de films appelée JustStreamIt vous permet de regarder vos films préférés en ligne.




## Importation de l'API :

- 1ère solution : cloner le projet

```
https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR.git
```

- 2ème solution : télécharger le projet en fichier zip

```
https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR/archive/refs/heads/master.zip

```

## Créer l'environnement virtuel et activer le serveur : 
*(exemple ci-dessous sur fichier zip)*


- Allez sur votre dossier "OCMovies-API-EN-FR" et faite "clique droit "ouvrir dans le Terminal"

- Déplacez-vous sur le dossier "OCMovies-API-EN-FR"

```
cd OCMovies-API-EN-FR-master
```

- Créer un environnement virtuel :

    ```
    python -m venv env
    ```

- Activer l'environnement virtuel avec Powershell :

    ```
    env/Scripts/Activate.ps1
    ```

- Activer l'environnement virtuel avec Bash :

    ```
    source env/Scripts/activate
    ```

- Installer les paquets Python répertoriés dans le fichier requirements.txt :

    ```
    pip install -r requirements.txt
    ```
- Mise à jour Pip si besoin :

    ```
    python -m pip install --upgrade pip
    ```

- Créer et remplir la base de données du projet :

    ```
    python manage.py create_db
    ```

- Démarrez le serveur :

    ```
    python manage.py runserver
    ```
    
## Lancer le programme
Vous pouvez tester si l'API est bien connecté en local : 

```
 http://localhost:8000/api/v1/titles/
```

Pour plus de renseignement, voici le lien Github : 

```
https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR
```
