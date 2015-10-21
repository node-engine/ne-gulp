# ne-gulp changelog

## Change Tags

Feature
- NF New feature: Added a new feature

Bug
- BF Bug fix: Fixed a bug

Optimisation
- OO Optimisation: The internal workings of the module is improved 
- OR Refactor: The internal code is refactored

Change
- CI Input change: What is required as input for the module is changed
- CO Output change: What is output by the module is changed

Dependencies
- DN New Dependency: A new dependency is added to the package
- DR Remove Dependency: A  dependency is removed from the package
- DU Update Dependency: A dependency is updated in the package


## 1.5.6

Release date: 20151021

[DN]
webpack


## 1.5.5

Release date: 20151021

Fixed 1.5.2
- After 1.5.2 it still was not working right
- Now the user has the option to use neGulp.autoWebpack() to compile the webpack with or without minification of the files 

Fixed the require paths for
- compileMeta, compileRoutesFile, compileDataRef


## 1.5.4

Release date: 20151021

Cancel 1.5.0 and 1.5.2, caused too many bugs


## 1.5.3

Release date: 20151021

[BF][DN]
Fixes bugs caused by 1.5.0


## 1.5.2

Release date: 20151020

neGulp.autoWebpack() (NF)
- Added autoWeback function to use in the gulpfile
- the webpack config file is now also part of neGulp and does not need to be in the root.


## 1.5.1

Release date: 20151020

All require statements (BF)
- Fixed some bugs caused by 1.5.0


## 1.5.0

Release date: 20151020

All require statements (BF DN)
- When using ne-auto the require statements did not find the module
- Are now conditional to be compatible with ne-auto
- If there is a process.env.NE_AUTO then the require statements use the ne-auto if not then they require from root
- Now this module will work with ne-auto and without ne-auto
- DN tag because this is connected to dependencies 


## 1.4.1

Release date: 20151020

compileData (DN)
- Fixed bug with ne-auto. The ne-data test file now requires from ne-auto.
- If ne auto is not installed the modules will not be found and there will be errors.

## 1.4.0

Release date: 20151019

compileCSS (CO)
- ne-css now builds to the root of the /app/css/ folder with the filename of the file as the output filename. 
- Example in there is a file in the ne-css folder named negulpstyle.styl it will build to /app/css/negulpstyle.css

