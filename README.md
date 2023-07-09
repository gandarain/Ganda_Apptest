# CRUD Contact
This is an application for CRUD request.
For more information about the documentation please refer this link https://contact.herokuapp.com/documentation

### How to run
Before run this project, please make sure you are using the correct version, react-native version `"0.68.1"`, node version `v18.16.0`, and npm version `9.6.4`
- `yarn install`
- `cd ios && pod install`
- create a new file for `.env`
- copy `.env.example` to `.env`
- `yarn start`
- `yarn ios`

### Result
#### APK
https://drive.google.com/file/d/1AGjXTtw1fRYYdtyfHxS0mKPBfzsDl93F/view?usp=sharing

#### Unit test
<img width="634" alt="Screen Shot 2023-07-09 at 20 07 32" src="https://github.com/gandarain/Ganda_Apptest/assets/27923352/25424be3-1f71-4dde-bc19-9f26ee09d4f5">

#### Lint
<img width="637" alt="Screen Shot 2023-07-09 at 20 06 24" src="https://github.com/gandarain/Ganda_Apptest/assets/27923352/fa5e5d68-07e0-49dd-8567-c9af6ece297a">

### Notes
#### Error `android gradle plugin requires java 11 to run`
Currently, I am used jdk 1.8 and jdk 11. So to fix this error, please type this command in your terminal `/usr/libexec/java_home -v 11` to find out where is the path of jdk 11, after that navigate to `/gradle.properties`, and then change this value `org.gradle.java.home`

#### Delete Request is error
FYI, the delete request is error, hopefully this screenshot will help.
<img width="948" alt="Screen Shot 2023-07-09 at 16 44 16" src="https://github.com/gandarain/Ganda_Apptest/assets/27923352/3a238fd0-5e32-4932-914c-a56450ba3d93">

