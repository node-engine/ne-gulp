var React = require("react");
var Router = require('react-router');

var RouteHandler = Router.RouteHandler;

var handler = React.createClass({

    render: function() {

        var css;
        if (this.props.meta && this.props.meta.css){
            css = this.props.meta.css.map(function(sheet, index){
                return <link rel="stylesheet" type="text/css" href={sheet}/>
            });
        }
        else {
            css = null
        }

        return (
            <html id="react-mount">
                <head>
                    <title>{`${this.props.meta.title} - ${this.props.meta.appname}`}</title>
                    <meta name="description" content={this.props.meta.description}/>
                    <link rel="stylesheet" type="text/css" href="/neGulpNormalize.css"/>
                    <link rel='stylesheet' href='/style.css' />
                    {css}
                    <meta charSet="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <script src="/neGulpHTML5Shiv.js"></script>
                </head>

                <RouteHandler {...this.props}  />

                <div>
                    <script src="/vendors.js"></script>
                    <script src="/bundle.js"></script>
                </div>
            </html>
        )
    }
});

module.exports = handler;