if (process.env.NE_AUTO) {
    var React = require(process.env.NE_AUTO).react
}
else {
    var React = require("react")
}

var meta = {
    path: "/negulphandlertest",
    title: "negulphandlertest",
    description: "negulphandlertest"
};

var handler = React.createClass({

    render: function() {
        var self = this;

        return (
            <body>
                <h1 id="main-title">negulphandlertest</h1>
            </body>
        )
    }
});

exports.handler = handler;
exports.meta = meta;