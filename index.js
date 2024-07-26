/* 
Here I've started by creating a class Song and using the constructor keyword the take two arguments for each instance, name and length. Then I've used the this keyword to define the properties of each object that the Song class will stamp out.
*/
class Song {
    constructor(name, length) {
        this.name = name;
        this.length = length;
    }

    describe() {
        return `The song ${this.name} is ${this.length} long.`;
    }
    /* Right here I've created a method, that I actually don't ever call called describe that describes the song! I modeled this menu after the one in the materials video and they added describe methods to the player and team classes so thats what happened here. */
}

/* Here I've created a class called Album that takes three arguments, name, genre, and year. Then using the this keyword, done the same as I did above with the song class. This time however I've created a blank array in the this.songs property so that songs can be added to each album object that gets stamped out. */
class Album {
    constructor(name, genre, year) {
        this.name = name;
        this.genre = genre;
        this.year = year;
        this.songs = [];
    }
/* Here I've made a method within the Album class called addSong that if the parameter being passed in is an instanceof the class Song, then it gets added to the array in this.songs.*/
    addSong(song) {
        if (song instanceof Song) {
            this.songs.push(song);
        } else {
            throw new Error(`You can only add an instance of Song. Argument is not a song: ${song}`)
        }
    }
/*Similar to above, I've also created a describe method that never gets called! Oopsies. */
    describe() {
        return `The album by ${this.selectedArtist} is in the genre ${this.genre}, released in the year ${this.year}.`
    }
}
/* now I've created a class called Artist, and used the constructor keyword to take one argument, name. Then I've set this name to name, created an empty array in this.albums. */
class Artist {
    constructor(name) {
        this.name = name;
        this.albums = []
    }

/* This is a method called addAlbum that takes one parameter, album. Then it runs the code where it determines if the parameter passed through the method when run is an instance of the class Album, it gets added to the previously empty array this.albums. Else it throws an error message about how you can only added instances of Album! */
    addAlbum(album) {
        if (album instanceof Album) {
            this.albums.push(album);
        } else {
            throw new Error(`You can only add an instance of Album. Argument is not an album: ${album}`)
        }
    }

/*I believe one last time I've created a method that describes the album, but it never gets called! */
    describe() {
        return `${this.name} has ${this.songs.length} songs and ${this.albums.length} albums.`
    }
}
/* This is where the menu starts! I create a class called Menu and then constructor with no arguments, and then inside of each object it stamps out, set this.artists to an empty array, and set this.selectedArtists to null. */
class Menu {
    constructor() {
        this.artists = [];
        this.selectedArtist = null;
    }

/* Now I've created a method called start that we'll call to run the menu at the bottom of the code! The first bit of code it runs is create a variable called selection and set it to the method showMainMenuOptions. This runs showMainMenuOptions and waits for a response. */
    start() {
        let selection = this.showMainMenuOptions();

        while (selection != 0) {
            switch (selection) {
                case '1':
                    this.createArtist();
                    break;
                case '2':
                    this.viewArtist();
                    break;
                case '3':
                    this.deleteArtist();
                    break;
                case '4':
                    this.displayArtists();
                    break
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }

        alert(`Goodbye!`);
    }
    /* This is the showMainMenuOptions method I mentioned above that selection is set to and runs right away at the begin of the start method! Under that code is where depending on what you enter here will be returned and will select one of the cases, which will run either the method createArtist, the method viewArtist, the method deleteArtist, or the method displayArtists.  */

    showMainMenuOptions() {
        return prompt(`
            0) exit
            1) create new artist
            2) view artist
            3) delete artist
            4) display all artists
            `)
    }
    /* Similar to the code right above for showMainMenuOptions, this is the code for showArtistMenuOptions, and pops up when you select view artists from the above menu. It takes in one parameter and prints it below, which is just the name of the band.  */

    showArtistMenuOptions(artistInfo) {
        return prompt(`
            0) back
            1) create album
            2) view albums
            3) delete album
            ---------------------
            ${artistInfo}`
        )
    }
    /* This is the method that runs when you select case 4 on the main menu! It creates an empty string called artistString, and then using a for loop iterates through the array and adds each artists name from the array this.artists to the empty string, and then using an alert, prints the artistString! */
    displayArtists() {
        let artistString = '';
        for (let i = 0; i < this.artists.length; i++)  {
            artistString += `${i} ${this.artists[i].name}
            `
        }
        alert(artistString)
    }
    /* This is the createArtist method that runs when you select case 1 on the main menu!  It creates a variable "name" that is set to whatever the user enters after the given prompt, and then using that variable name, creates a new object from the Artist class using the new keyword, and pushes it to the array this.artists! */
    createArtist() {
        let name = prompt(`Enter name for new artist:`)
        this.artists.push(new Artist (name))
    }
    /* This is the method that runs when you select case 2 on the main menu above! It creates a variable called index that is set to whatever the user inputs into the given prompt, and then, if that number is a proper entry, sets this.selectedArtist to whatever the index of the this.artists array you selected was. Then it runs the this.showArtistMenuOptionsLoop method! */
    viewArtist() {
        let index = prompt(`Enter index of the Artist you wish to view:`);
        if (index > -1 && index < this.artists.length) {
            this.selectedArtist = this.artists[index];
            this.showArtistMenuOptionsLoop();
        }
    }
    /* Here I've made the last method for modifying artists, and this one deletes them! It does that by taking a prompt for the new variable index, and then using an if statement to validate the user input, uses this.artists.splice to move to whatever value the user entered, and then deleted 1 value from that array!*/
    
    deleteArtist() {
        let index = prompt(`Enter index of the Artist you wish to delete:`);
        if (index > -1 && index < this.artists.length) {
            this.artists.splice(index, 1);
        }
    }

    /* The reason I created this method as well as the showArtistMenuOptions method was because I didn't want to exit out to the main menu after creating an creating an album within an artist, and I also wanted the description of the artist to update every time you added an album to it. First I create a variable called selection and set it to this.showArtistMenuOptions, which is the menu that displays your options of what you can do for an artist. It also passes through the generateArtistDescription method as the parameter (artistInfo). Then using a similar while loop to the showMainMenuOptions code, waits for input from the showArtistMenuOptions method before runing one of the 3 album Methods! If after you exit the switch, selection still doesn't equal 0, it sets selection back to what it was at the top of the method and the code starts over! In this way you can easily add multiple albums to an artist without having to exit back to the main menu. */
    showArtistMenuOptionsLoop() {
        let selection = this.showArtistMenuOptions(this.generateArtistDescription());
        while (selection != '0') {
            switch (selection) {
                case '1':
                    this.createAlbum();
                    break;
                case '2':
                    this.viewAlbums();
                    break;
                case '3':
                    this.deleteAlbum();
                    break;
                default:
                    selection = '0';
            }
            if (selection != '0') {     
                selection = this.showArtistMenuOptions(this.generateArtistDescription());
            }
        }
    }

    /*This method was created so that way everytime you loop back into showArtistMenuOptions, the artistInfo parameter has an accurate and up to date description of the artists albums. Without this method running, the description only updated after you exited the view artist menu and then reopened it. I've done this by creating a variable called description, and using tempelate literals, set it to say the artists name, the numbers of albums, and then, using a for loop, adding a list of every album, that albums, genre, and release year. Then returning description for use in the showArtistMenuOptions method! */
    generateArtistDescription() {
        let description = `Artist Name: ${this.selectedArtist.name}\nNumber of Albums: ${this.selectedArtist.albums.length}\n`;
        for (let i = 0; i < this.selectedArtist.albums.length; i++) {
            description += `${i}) ${this.selectedArtist.albums[i].name} - ${this.selectedArtist.albums[i].genre} (${this.selectedArtist.albums[i].year})\n`;
        }
        return description;
    }
    /* Here I've made the create album method that takes prompts for all the new variables name genre and year, and then using the new keyword on the Album object and the addAlbum method, adding the album that you've just entered as prompts to the selected artist array!*/
    createAlbum() {
        let name = prompt(`Enter the name of the new album:`);
        let genre = prompt(`Enter the genre of the new album:`);
        let year = prompt(`Enter the year of the new album:`);
        this.selectedArtist.addAlbum(new Album(name, genre, year));
    }
    /* Here I've made the viewAlbums method that takes a prompt for albumIndex and then using an if statement to determine if the entered index is valid, sets the variable selecteAlbum to the index number that was entered from the selectedArtists.albmums array! Then it boots into the showAlbumMenuOptionsLoop using the selectedAlbum variable.*/
    viewAlbums() {
        let albumIndex = prompt(`Enter the index of the album you wish to view:`);
        if (albumIndex > -1 && albumIndex < this.selectedArtist.albums.length) {
            let selectedAlbum = this.selectedArtist.albums[albumIndex];
            this.showAlbumMenuOptionsLoop(selectedAlbum);
        }
    }
    deleteAlbum() {
        let index = prompt(`Enter index of album you wish to delet:`);
        if (index > -1 && index < this.selectedArtist.albums.length) {
            this.selectedArtist.albums.splice(index, 1);
        }
    }
    /* This is the the showAlbumMenuOptionsLoop method that takes one parameter, album. It loops the showAlbumMenuOptions method that lets the user select whether they want to add a song to the album, delete a from the album, or return to the top menu. We achieve this using the same type of code as above on the showArtistMenuOptionsLoop!*/
    showAlbumMenuOptionsLoop(album) {
        let selection = this.showAlbumMenuOptions(this.generateAlbumDescription(album));
        while (selection != '0') {
            switch (selection) {
                case '1':
                    this.createSong(album);
                    break;
                case '2':
                    this.deleteSong(album);
                    break;
                default:
                    selection = '0';
            }
            if (selection != '0') { // Show the menu again if not exiting
                selection = this.showAlbumMenuOptions(this.generateAlbumDescription(album));
            }
        }
    }
/* This code is very similar to the generateArtistDescription method that we wrote above. This is set up so that when running the showAlbumMenuOptionsLoop is running, everytime it takes you back to the menu, the description of the album updates whether you have added or deleted a song! It works in exactly the same way as the above generateArtistDescription method does.*/
    generateAlbumDescription(album) {
        let description = `Album Name: ${album.name}\nGenre: ${album.genre}\nYear: ${album.year}\nSongs:\n`;
        for (let i = 0; i < album.songs.length; i++) {
            description += `${i}) ${album.songs[i].name} - ${album.songs[i].length}\n`;
        }
        return description;
    }
/* This is the method for showAlbumMenuOptions, it simply returns a value after given a menu prompt, and in combination with the loop version of this method, stays on this menu until a user decides to exit by entering 0!*/
    showAlbumMenuOptions(albumInfo) {
        return prompt(`
            0) back
            1) create song
            2) delete song
            ---------------------
            ${albumInfo}`
        )
    }
/* This is the createSong method that takes one parameter and using two prompts the user inputs for name and length, puts those values into a new object with the Class song, using the addSong method! */
    createSong(album) {
        let name = prompt(`Enter the name of the new song:`);
        let length = prompt(`Enter the length of the new song:`);
        album.addSong(new Song(name, length));
    }
/* This is the last method of the entire code! It works similarry as the code above for deleting an album or artist, where it takes a prompt, validates the user input, and then using that input splices one element out of the array album.songs.*/
    deleteSong(album) {
        let index = prompt(`Enter the index of the song you want to delete:`);
        if (index > -1 && index < album.songs.length) {
            album.songs.splice(index, 1);
        } else {
            alert(`That's not a valid index!`)
        }
    }
}
/* This is our last bit of code! It creates a new variable called menu, and sets it to a new object with the Menu class. Then we run the start method on that variable menu! That will begin our code when we run the html file that has this file linked as the script!*/
let menu = new Menu();
menu.start();