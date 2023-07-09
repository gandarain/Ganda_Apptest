# CRUD Contact
This is an application for CRUD request.
For more information about the documentation please refer this link https://contact.herokuapp.com/documentation
### How to run
Before run this project, please make sure you are using the correct version, react-native version `"0.68.1"`, node version `v14.17.0`, and npm version `6.14.5`
- `yarn install`
- `cd ios && pod install`
- create a new file for `.env`
- copy `.env.example` to `.env`
- `yarn start`
- `yarn ios`
### Notes
#### Error `android gradle plugin requires java 11 to run`
Currently, I am used jdk 1.8 and jdk 11. So to fix this error, please type this command in your terminal `/usr/libexec/java_home -v 11` to find out where is the path of jdk 11, after that navigate to `/gradle.properties`, and then change this value `org.gradle.java.home`
#### Delete Request is error
FYI, the delete request is error, hopefully this screenshot will help.
