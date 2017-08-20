#Banger Alert
##Song suggestion app
### installation and setup

To run the code,

* visit the project 0 github repository.
* Hit 'clone or download'.
* Using your terminal, run the Yarn command to install the dependencies needed.
* Run Gulp to compile the Source Code.
* Note- You will need to have 'gulp -cli' installed globally. 

### The app

A song suggestion app for ‘YouTube DJs’. Once the user inputs a song the app will return a suggestion which is not only from a related artist but also rhythmically matched to the input. The app can then stack the songs in video players via the YouTube API, allowing users to create video playlists. Built with Node.js and Express, I wanted to create something that went beyond the requirements of the brief and was both fun and genuinely useful. The most challenging part of the project was imple- menting heavy usage of the Spotify API and Youtube APIs, but I wanted to challenge myself to implement an an external appli- cation with functionality which really added to the experience.

To use the app, type the name of a song into the input field and click any one of the three buttons. 'Add to set' Pushes the text in the input box to the 'Set list' which can be found on the left of the screen. 'Suggest a banger' will contact the Spotify API and return a suggestion of what song to play next. 'Play' will contact the Youtube API and return a video of the song. 

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
One of the challenges faced while producing this project was the process of requesting information from the Spotify API. Due to the nature of the API and the information needed, several requests had to be made for every song suggestion requested.

As the Spotify API is designed only to make calls for specific information about Songs, Artists and related Artists, I had to build out a set of API calls with logic to aquire the information I wanted. Put simply, the Back End tracks controller must-

* Make a call to request an access token
* Request a search return from a query string given by the input
* Request the audio feautures of the track which is returned by the query
* Request the returned Artist's related artist list, then select one at random
* Request the new Artist's top 5 tracks
* Request the audio features of those tracks
* Compare each of the returned track's audio feature's 'Danceability' rating
* Return the song with the rating which most closely matches the original's
* Finally, request the track's information using it's Id to get it's Artist and Track names

### Improvements
I am proud of the functionality of the site, I do however feel that the styling has a long way to go. I would also like to work on some functionality to see if I could get the videos to 'auto-play' in sequence once they have been saved to the video playlist. 

A major drawback of the functionality is also due to the Front End build. If a user adds the song to the setlist to save for later, the page is refreshed, loosing any suggestions or videos which are lined up, amounting to a poor user experience. To solve this problem, I may have to rebuild the Front End as an Angular App, which allows for the DB and view to be updated without refreshing the page. Though this would involve alot of work, I think the benefit's of the improved UX would be worth while.
