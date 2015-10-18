var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var handler = React.createClass({

    render: function() {

        console.log('');
        console.log('');
        console.log('aaRoot: this.props');
        console.log(this.props);
        console.log('');
        console.log('');

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
                    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/3.0.3/normalize.min.css"/>
                    <link rel='stylesheet' href='/style.css' />
                    {css}
                    <meta charSet="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
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