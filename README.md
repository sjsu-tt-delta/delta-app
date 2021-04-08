# Theta Tau Delta Pledge Class Technical Project App

## Quick Links
[Gantt Chart and Consolidated Sheet](https://docs.google.com/spreadsheets/d/1VhCbg1d47hBmEg20Uc_-arUAMw05hEPBOkWhSjltqOU/edit#gid=574701751)<br/>
[Software Committee Resources](https://docs.google.com/document/d/1AEHoXo0-nwg2GfUm3lj_bZPsCf9YJ_akLvOFAsaAjLQ/edit#)<br/>
[react-native-ble-plx 2.0.2 Documentation](https://polidea.github.io/react-native-ble-plx/)<br/>
[react-native-ble-plx GitHub](https://github.com/Polidea/react-native-ble-plx)<br/>

## Getting Started with Git & GitHub
### Installing Git and Planning Your Environment
1. Start by forking the repo (top right of the page). This will create a copy of the main repository on your GitHub account. 
You can find this respository by navigating to your own GitHub page. This forked repo will be your main repo for you to develop on this project. 
To merge your updates into the main branch, simply create a pull request via your forked repo. This will allow the project managers to review your submitted code before it merges into the main project repository.
2. Install the desktop git client if you do not have it already ([Git Download](https://git-scm.com/downloads) or `sudo apt install git` on Ubuntu). You can see if your git is working properly by simply typing `git` in your terminal (Git bash/MinGW on Windows)
3. Choose the folder/directory where you would like to work in (where your local repo will be stored). You can do this by typing `cd YOUR_PREFERRED_DIRECTORY` in your terminal
4. Now that you are in your preferred working directory, clone your forked repo by running `git clone https://github.com/YOUR_GITHUB_USERNAME/delta-app` in your terminal.

### Fetching the Latest Main Repo Updates
To be able to pull the latest updates from the main project repository into your local directory, run `git remote add upstream https://github.com/sjsu-tt-delta/delta-app.git`. <br/>
**Every time you want to pull the latest updates from the main project repository, run `git pull upstream main`.**

## OS-specific Development Environment Installation
### Windows
1. Open your terminal (such as cmd or Powershell). Verify that you are in the root directory of your local project repository of delta-app. Use `cd YOUR_DELTA_APP_DIRECTORY` if you are not.
2. Download [Node.js](https://nodejs.org/en/download/). Check your installation by typing `node -v` and `npm -v` in your terminal.
3. Install the base npm package in the root directory of your local delta-app repository by running `npm install` in your terminal.
4. Install React Navigation with the command `npm install @react-navigation/native`
5. Install the react-native-ble-plx Bluetooth Low Energy library with the command `npm install react-native-ble-plx`
6. Install the react-native-base64 library with the command `npm install react-native-base64`
7. Download [Android Studio](https://developer.android.com/studio). Here is an [example tutorial](https://www.youtube.com/watch?v=7KdGmg4mTpI).

### macOS
1. Open your terminal. Verify that you are in the root directory of your local project repository of delta-app. Use `cd YOUR_DELTA_APP_DIRECTORY` if you are not.
2. Download [Node.js](https://nodejs.org/en/download/). Check your installation by typing `node -v` and `npm -v` in your terminal.
3. Install the base npm package in the root directory of your local delta-app repository by running `npm install` in your terminal.
4. Install React Navigation with the command `npm install @react-navigation/native`
5. Install the react-native-ble-plx Bluetooth Low Energy library with the command `npm install react-native-ble-plx`
6. Install the react-native-base64 library with the command `npm install react-native-base64`
7. Download [Android Studio](https://developer.android.com/studio). Here is an [example tutorial](https://www.youtube.com/watch?v=7KdGmg4mTpI).

### Ubuntu, Ubuntu-based distros, or WSL-Ubuntu
1. Open your terminal.
2. Download Node.js and npm by typing `sudo apt install nodejs`. Check your installation by typing `node -v` and `npm -v`. *If npm cannot be recognized*, try `sudo apt install npm` and then try again.
3. *If your Node.js version is less than 10*, you may need nvm to update your version. To install nvm, try `sudo apt update` then `sudo apt install build-essential checkinstall libssl-dev` then 
`curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash`. Restart your terminal, then run `nvm install` which will install the latest Node.js version.
4. Verify that you are in the root directory of your local project repository of delta-app. Use `cd YOUR_DELTA_APP_DIRECTORY` if you are not.
5. Install the base npm package in the root directory of your local delta-app repository by running `npm install` in your terminal.
6. Install React Navigation with the command `npm install @react-navigation/native`
7. Install the react-native-ble-plx Bluetooth Low Energy library with the command `npm install react-native-ble-plx`
8. Install the react-native-base64 library with the command `npm install react-native-base64`
9. Download [Android Studio](https://developer.android.com/studio). Here is an [example tutorial](https://www.youtube.com/watch?v=7KdGmg4mTpI).

## iOS & Android Testing
Expo can be used with Expo Go, if a separate project is setup and only the front-end features are being tested.<br/>
Otherwise, Xcode or Android Studio will need to be used for BLE compatibility.