# ne-gulp changelog

## Change Tags

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

