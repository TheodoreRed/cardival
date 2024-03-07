export default {
    "presets": [
        "@babel/preset-env", // Compiles ES6+ down to ES5
        "@babel/preset-react", // Transforms React JSX into JavaScript
        [
            "@babel/preset-typescript",
            {
                "isTSX": true, // Allows parsing of TSX
                "allExtensions": true // Allows parsing of all files extensions
            }
        ]
    ],
    "plugins": [
        "@babel/plugin-transform-runtime", // Enables the re-use of Babel's injected helper code to save on codesize.
        "@babel/plugin-proposal-class-properties", // Enables class properties (if you're using class components in React)
        "@babel/plugin-proposal-object-rest-spread" // Enables the use of the rest/spread properties
    ]
}
