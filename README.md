#Banger Alert
##Song suggestion app
### installation and setup

To run the code,

* visit the project 1 github repository.
* Hit 'clone or download'.
* Using your terminal, run the Yarn install command to install the dependencies needed.
* Run Gulp to compile the  Source Code.
* Note- You will need to have 'gulp -cli' installed globally. 

### The app

Banger alert is a song suggestion app for 'Youtube DJs'. The user puts in a song, and the app will return a suggested song to play next, not only based on a related artist but also on the input's 'danceability'. The 'danceability' rating is a number between 0 and 1 which Spotify assigns to each track based on consistency of rhythm and strength of beat. This information is extracted from the Spotify API and then compared to the user's input. 

The app also allows users to save their 'sets' and share them with other users. Through the use of the Youtube API, users can also line up youtube videos based on the suggested tracks and quickly build up a video playlist. 

To use the app, type a song into the input field near the middle of the screen and click either of the three buttons. 'Add to set' Pushes the text in the input to the 'Set list' which can be found on the left of the screen- this is also editable via the delete buttons. 'Suggest a banger' will contact the Spotify API and return a suggestion of what song to play next. 'Play' will contact the Youtube API an d return a video of the song in the input field, if the video exists. 



### Technologies Used 

Software used-

* HTML 5
* SCSS
* Javascript ES6
* Jquery 3.10
* Gulp
* NODE.js
* Yarn
* Git & Git Hub


### Challenges faced
One of the challenges faced while producing this project was the process of requesting information from the Spotify API. Due to the nature of the API and the information needed, several requests had to be made for every song suggestion requested. The problem was overcome by Sudo coding out  each detail and planning the route each request would have to take. 

### Improvements
I am proud of the functionality of the site, I do however feel that the styling has a long way to go before this is included in my portfolio. I would also like to see if I could get the videos to 'auto play' in sequence once they have been saved to the video playlist. 
