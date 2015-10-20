var neAuto;
if (process.env.NE_AUTO) {
    neAuto = process.env.NE_AUTO
}
else {
    neAuto = "ne-auto-off"
}

var React = require(neAuto).react || require('react');

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